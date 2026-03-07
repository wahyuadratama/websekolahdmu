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
      const clientIp = req.ip || req.connection.remoteAddress;
      const key = req.user?.id ? `user:${req.user.id}` : `ip:${clientIp}`;
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
      max: 3000, // 3000 requests per 5 minutes per client
      message: 'Terlalu banyak request, silakan coba lagi nanti'
    });
  }

  // Balanced rate limit for upload endpoints (school/admin friendly)
  uploadLimiter() {
    return this.limit({
      windowMs: 10 * 60 * 1000, // 10 minutes
      max: 60, // 60 uploads per 10 minutes per admin user
      message: 'Upload terlalu sering. Tunggu sebentar lalu coba lagi.'
    });
  }
}

export default new RateLimiter();
