import bcrypt from 'bcryptjs';
import database from '../config/database.js';

class User {
  static async findByUsername(username) {
    const rows = await database.query('SELECT * FROM users WHERE username = ? LIMIT 1', [String(username).toLowerCase()]);
    return rows[0] || null;
  }

  static async findByEmail(email) {
    const rows = await database.query('SELECT * FROM users WHERE email = ? LIMIT 1', [String(email).toLowerCase()]);
    return rows[0] || null;
  }

  static async findById(id) {
    const rows = await database.query('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);
    return rows[0] || null;
  }

  static async listAllWithoutPassword() {
    return database.query('SELECT id, username, full_name AS fullName, email, role, status, last_login AS lastLogin, created_by AS createdBy, created_at AS createdAt, updated_at AS updatedAt FROM users ORDER BY created_at DESC');
  }

  static async create(payload) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(payload.password, salt);
    const result = await database.query(
      'INSERT INTO users (username,password,full_name,email,role,status,created_by) VALUES (?,?,?,?,?,?,?)',
      [payload.username.toLowerCase(), hashed, payload.fullName, payload.email.toLowerCase(), payload.role || 'staff', 'active', payload.createdBy || 'system']
    );
    return this.findById(result.insertId);
  }

  static async deleteById(id) {
    const result = await database.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async updateById(id, { fullName, email, status, role }) {
    const fields = [];
    const params = [];
    if (fullName !== undefined) { fields.push('full_name = ?'); params.push(String(fullName).trim()); }
    if (email !== undefined) { fields.push('email = ?'); params.push(String(email).trim().toLowerCase()); }
    if (status !== undefined) { fields.push('status = ?'); params.push(status); }
    if (role !== undefined) { fields.push('role = ?'); params.push(role); }
    if (!fields.length) return this.findById(id);
    params.push(id);
    await database.query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, params);
    return this.findById(id);
  }

  static async updatePassword(id, newPassword) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);
    await database.query('UPDATE users SET password = ? WHERE id = ?', [hashed, id]);
    return true;
  }

  static async updateLastLogin(id) {
    await database.query('UPDATE users SET last_login = NOW() WHERE id = ?', [id]);
  }

  static async comparePassword(candidatePassword, hashedPassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }

  static async createDefaultSuperAdmin() {
    const rows = await database.query("SELECT id FROM users WHERE role='superadmin' LIMIT 1");
    if (rows.length === 0) {
      await this.create({
        username: 'superadmin',
        password: 'Super@dmin123',
        fullName: 'Super Administrator',
        email: 'superadmin@darulmukhlisin.sch.id',
        role: 'superadmin',
        createdBy: 'system'
      });
      console.log('✅ Default Super Admin created');
    }
  }
}

export default User;
