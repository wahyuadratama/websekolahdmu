import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Logger {
  constructor() {
    this.logsDir = path.join(__dirname, '../../logs');
    this.ensureLogsDir();
  }

  ensureLogsDir() {
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }
  }

  getLogFilePath(type = 'app') {
    const date = new Date().toISOString().split('T')[0];
    return path.join(this.logsDir, `${type}-${date}.log`);
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}\n`;
  }

  writeLog(level, message, meta = {}) {
    const logMessage = this.formatMessage(level, message, meta);
    const logFile = this.getLogFilePath('app');

    // Write to file
    fs.appendFileSync(logFile, logMessage);

    // Also log to console in development
    if (process.env.NODE_ENV !== 'production') {
      const colors = {
        info: '\x1b[36m',    // Cyan
        warn: '\x1b[33m',    // Yellow
        error: '\x1b[31m',   // Red
        success: '\x1b[32m', // Green
        reset: '\x1b[0m'
      };

      const color = colors[level] || colors.reset;
      console.log(`${color}${logMessage.trim()}${colors.reset}`);
    }
  }

  info(message, meta = {}) {
    this.writeLog('info', message, meta);
  }

  warn(message, meta = {}) {
    this.writeLog('warn', message, meta);
  }

  error(message, meta = {}) {
    this.writeLog('error', message, meta);
    
    // Write errors to separate error log
    const errorLog = this.getLogFilePath('error');
    fs.appendFileSync(errorLog, this.formatMessage('error', message, meta));
  }

  success(message, meta = {}) {
    this.writeLog('success', message, meta);
  }

  // Log HTTP requests
  request(req, res, duration) {
    const message = `${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`;
    const meta = {
      ip: req.ip,
      userAgent: req.get('user-agent'),
      user: req.user?.username || 'anonymous'
    };

    if (res.statusCode >= 400) {
      this.error(message, meta);
    } else {
      this.info(message, meta);
    }
  }

  // Cleanup old logs (keep last 30 days)
  cleanup(daysToKeep = 30) {
    try {
      const files = fs.readdirSync(this.logsDir);
      const now = Date.now();
      const maxAge = daysToKeep * 24 * 60 * 60 * 1000;

      let deletedCount = 0;

      for (const file of files) {
        const filePath = path.join(this.logsDir, file);
        const stats = fs.statSync(filePath);

        if (now - stats.mtimeMs > maxAge) {
          fs.unlinkSync(filePath);
          deletedCount++;
        }
      }

      if (deletedCount > 0) {
        this.info(`Cleaned up ${deletedCount} old log file(s)`);
      }
    } catch (error) {
      this.error('Log cleanup failed', { error: error.message });
    }
  }
}

export default new Logger();
