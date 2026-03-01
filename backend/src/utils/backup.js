import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });
const execAsync = promisify(exec);

class DatabaseBackup {
  constructor() {
    this.backupDir = path.join(__dirname, '../../backups');
    this.db = {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || '3306',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      name: process.env.DB_NAME || 'dmu_pesantren'
    };
  }

  async createBackupDir() {
    if (!fs.existsSync(this.backupDir)) fs.mkdirSync(this.backupDir, { recursive: true });
  }

  async backup() {
    await this.createBackupDir();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const file = path.join(this.backupDir, `backup-${timestamp}.sql`);
    const cmd = `mysqldump -h ${this.db.host} -P ${this.db.port} -u ${this.db.user} ${this.db.password ? `-p${this.db.password}` : ''} ${this.db.name} > "${file}"`;
    await execAsync(cmd);
    console.log(`✅ Backup: ${file}`);
  }

  async restore(filePath) {
    if (!fs.existsSync(filePath)) throw new Error('Backup file not found');
    const cmd = `mysql -h ${this.db.host} -P ${this.db.port} -u ${this.db.user} ${this.db.password ? `-p${this.db.password}` : ''} ${this.db.name} < "${filePath}"`;
    await execAsync(cmd);
    console.log('✅ Restore selesai');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const backup = new DatabaseBackup();
  const command = process.argv[2];
  const arg = process.argv[3];
  if (command === 'backup') backup.backup().then(() => process.exit(0)).catch(() => process.exit(1));
  else if (command === 'restore' && arg) backup.restore(arg).then(() => process.exit(0)).catch(() => process.exit(1));
  else {
    console.log('Usage: node backup.js backup | restore <path>');
    process.exit(1);
  }
}

export default DatabaseBackup;
