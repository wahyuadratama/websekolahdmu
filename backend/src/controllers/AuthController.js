import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) return res.status(400).json({ success: false, message: 'Username dan password harus diisi' });

      const user = await User.findByUsername(username);
      if (!user) return res.status(401).json({ success: false, message: 'Username atau password salah' });
      if (user.status !== 'active') return res.status(401).json({ success: false, message: 'Akun tidak aktif' });

      const isMatch = await User.comparePassword(password, user.password);
      if (!isMatch) return res.status(401).json({ success: false, message: 'Username atau password salah' });

      await User.updateLastLogin(user.id);

      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
      const cookieName = process.env.JWT_COOKIE_NAME || 'token';
      const isProd = process.env.NODE_ENV === 'production';
      res.cookie(cookieName, token, { httpOnly: true, secure: isProd, sameSite: isProd ? 'none' : 'lax', maxAge: 24 * 60 * 60 * 1000, path: '/' });

      res.json({ success: true, message: 'Login berhasil', token, user: { id: user.id, username: user.username, fullName: user.full_name, nama: user.full_name, email: user.email, role: user.role } });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Terjadi kesalahan server', error: error.message });
    }
  }

  async register(req, res) {
    try {
      const { username, password, fullName, email, role } = req.body;
      if (!username || !password || !fullName || !email) return res.status(400).json({ success: false, message: 'Semua field harus diisi' });

      if (await User.findByUsername(username)) return res.status(400).json({ success: false, message: 'Username sudah digunakan' });
      if (await User.findByEmail(email)) return res.status(400).json({ success: false, message: 'Email sudah digunakan' });

      const newUser = await User.create({ username, password, fullName, email, role: role || 'staff', createdBy: req.user.username });

      res.status(201).json({ success: true, message: 'User berhasil didaftarkan', data: { id: newUser.id, username: newUser.username, fullName: newUser.full_name, email: newUser.email, role: newUser.role } });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Terjadi kesalahan server', error: error.message });
    }
  }

  async getCurrentUser(req, res) {
    try {
      res.json({ success: true, data: { id: req.user.id, username: req.user.username, fullName: req.user.full_name, email: req.user.email, role: req.user.role } });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Terjadi kesalahan server', error: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await User.listAllWithoutPassword();
      res.json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Terjadi kesalahan server', error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
      if (user.role === 'superadmin') return res.status(403).json({ success: false, message: 'Tidak dapat menghapus superadmin' });
      await User.deleteById(id);
      res.json({ success: true, message: 'User berhasil dihapus' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Terjadi kesalahan server', error: error.message });
    }
  }

  async logout(req, res) {
    try {
      const cookieName = process.env.JWT_COOKIE_NAME || 'token';
      const isProd = process.env.NODE_ENV === 'production';
      res.cookie(cookieName, '', { httpOnly: true, secure: isProd, sameSite: isProd ? 'none' : 'lax', expires: new Date(0), path: '/' });
      res.json({ success: true, message: 'Logout berhasil' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Terjadi kesalahan server', error: error.message });
    }
  }
}

export default new AuthController();
