class RateLimiter {
  constructor() {
    this.requests = new Map();
  }

  // Simple in-memory rate limiter
  limit(options = {}) {
    const {
      windowMs = 15 * 60 * 1000, // 15 minutes
      max = 100, // limit each key to 100 requests per windowMs
      message = 'Terlalu banyak request, silakan coba lagi nanti',
      keyGenerator = null
    } = options;

    return (req, res, next) => {
      const clientIp = req.ip || req.connection.remoteAddress;
      const defaultKey = req.user?.id ? `user:${req.user.id}` : `ip:${clientIp}`;
      const key = typeof keyGenerator === 'function' ? keyGenerator(req, defaultKey) : defaultKey;
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

  // Balanced rate limit for auth endpoints (per IP + username)
  authLimiter() {
    return this.limit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 20, // 20 requests per 15 minutes per (IP + username)
      message: 'Terlalu banyak percobaan login, silakan coba lagi dalam 15 menit',
      keyGenerator: (req, defaultKey) => {
        const username = String(req.body?.username || '').trim().toLowerCase();
        return username ? `${defaultKey}:login:${username}` : `${defaultKey}:login:unknown`;
      }
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
