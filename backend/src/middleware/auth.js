import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class AuthMiddleware {
  static async verifyToken(req, res, next) {
    try {
      const token = AuthMiddleware.extractToken(req);
      if (!token) return res.status(401).json({ success: false, message: 'Token tidak ditemukan' });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user || user.status !== 'active') return res.status(401).json({ success: false, message: 'User tidak valid atau tidak aktif' });

      req.user = user;
      next();
    } catch {
      return res.status(401).json({ success: false, message: 'Token tidak valid' });
    }
  }

  static extractToken(req) {
    const headerToken = req.headers.authorization?.split(' ')[1];
    if (headerToken) return headerToken;
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) return null;
    const cookieName = process.env.JWT_COOKIE_NAME || 'token';
    const cookies = Object.fromEntries(cookieHeader.split(';').map(part => part.trim()).filter(Boolean).map(part => {
      const eqIndex = part.indexOf('=');
      if (eqIndex === -1) return [part, ''];
      return [part.slice(0, eqIndex), decodeURIComponent(part.slice(eqIndex + 1))];
    }));
    return cookies[cookieName] || null;
  }

  static checkRole(...roles) {
    return (req, res, next) => {
      if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' });
      if (!roles.includes(req.user.role)) return res.status(403).json({ success: false, message: 'Akses ditolak. Role tidak sesuai.' });
      next();
    };
  }

  static isAdminOrAbove(req, res, next) { return AuthMiddleware.checkRole('superadmin', 'admin')(req, res, next); }
  static isSuperAdmin(req, res, next) { return AuthMiddleware.checkRole('superadmin')(req, res, next); }
}

export default AuthMiddleware;
