class RateLimiter {
  constructor() {
    this.requests = new Map();
  }

  // Simple in-memory rate limiter
  limit(options = {}) {
    const {
      windowMs = 15 * 60 * 1000, // 15 minutes
      max = 100, // limit each IP to 100 requests per windowMs
      message = 'Terlalu banyak request, silakan coba lagi nanti'
    } = options;

    return (req, res, next) => {
      const key = req.ip || req.connection.remoteAddress;
      const now = Date.now();
      
      if (!this.requests.has(key)) {
        this.requests.set(key, []);
      }

      const userRequests = this.requests.get(key);
      
      // Remove old requests outside the window
      const validRequests = userRequests.filter(time => now - time < windowMs);
      
      if (validRequests.length >= max) {
        return res.status(429).json({
          success: false,
          message,
          retryAfter: Math.ceil(windowMs / 1000)
        });
      }

      validRequests.push(now);
      this.requests.set(key, validRequests);

      // Cleanup old entries periodically
      if (Math.random() < 0.01) {
        this.cleanup(windowMs);
      }

      next();
    };
  }

  cleanup(windowMs) {
    const now = Date.now();
    for (const [key, requests] of this.requests.entries()) {
      const validRequests = requests.filter(time => now - time < windowMs);
      if (validRequests.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, validRequests);
      }
    }
  }

  // Stricter rate limit for auth endpoints
  authLimiter() {
    return this.limit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5, // 5 requests per 15 minutes
      message: 'Terlalu banyak percobaan login, silakan coba lagi dalam 15 menit'
    });
  }

  // Standard rate limit for API endpoints
  apiLimiter() {
    return this.limit({
      windowMs: 5 * 60 * 1000, // 5 minutes
      max: 600, // 600 requests per 5 minutes (lebih aman untuk dashboard polling)
      message: 'Terlalu banyak request, silakan coba lagi nanti'
    });
  }

  // Stricter rate limit for upload endpoints
  uploadLimiter() {
    return this.limit({
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 20, // 20 uploads per hour
      message: 'Terlalu banyak upload, silakan coba lagi dalam 1 jam'
    });
  }
}

export default new RateLimiter();
