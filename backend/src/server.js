import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import database from './config/database.js';
import authRoutes from './routes/auth.js';
import apiRoutes from './routes/api.js';
import User from './models/User.js';
import Settings from './models/Settings.js';
import rateLimiter from './middleware/rateLimiter.js';
import SecurityMiddleware from './middleware/security.js';
import logger from './utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  initializeMiddlewares() {
    // Security headers
    this.app.use(SecurityMiddleware.setSecurityHeaders);
    this.app.use(SecurityMiddleware.preventParameterPollution);

    // CORS configuration
    const allowedOrigins = process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',') 
      : ['http://localhost:3000', 'http://localhost:5000'];

    this.app.use(cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        
        if (process.env.NODE_ENV === 'development' || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true
    }));

    // Body parser
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Rate limiting
    if (process.env.NODE_ENV === 'production') {
      this.app.use('/api', rateLimiter.apiLimiter());
    }

    // Static files - serve uploads folder
    const uploadsPath = path.join(__dirname, '../uploads');
    this.app.use('/uploads', express.static(uploadsPath));
    console.log('📁 Static files path:', uploadsPath);

    // Request logger
    this.app.use((req, res, next) => {
      const start = Date.now();
      
      res.on('finish', () => {
        const duration = Date.now() - start;
        logger.request(req, res, duration);
      });
      
      next();
    });
  }

  initializeRoutes() {
    // Health check
    this.app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'DMU Backend API',
        version: '1.0.0',
        status: 'running',
        timestamp: new Date().toISOString(),
        endpoints: {
          auth: '/api/auth',
          upload: '/api/upload',
          berita: '/api/berita',
          galeri: '/api/galeri',
          guru: '/api/guru',
          pesan: '/api/pesan',
          pendaftaran: '/api/pendaftaran',
          settings: '/api/settings'
        }
      });
    });

    // Database health check
    this.app.get('/health', async (req, res) => {
      try {
        const dbStatus = database.getConnection() ? 'connected' : 'disconnected';
        res.json({
          success: true,
          status: 'healthy',
          database: dbStatus,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        res.status(503).json({
          success: false,
          status: 'unhealthy',
          error: error.message
        });
      }
    });

    // API Routes
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api', apiRoutes);

    // 404 handler
    this.app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan'
      });
    });

    // Error handler
    this.app.use((err, req, res, next) => {
      logger.error('Server error', { 
        error: err.message, 
        stack: err.stack,
        path: req.path,
        method: req.method
      });
      
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan server',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    });
  }

  async initializeDatabase() {
    try {
      await database.connect();
      
      // Create default superadmin
      await User.createDefaultSuperAdmin();
      
      // Initialize default settings
      await Settings.initializeDefaults();
      
      logger.success('Database initialized');
    } catch (error) {
      logger.error('Database initialization failed', { error: error.message });
      process.exit(1);
    }
  }

  async start() {
    try {
      await this.initializeDatabase();
      
      this.app.listen(this.port, '0.0.0.0', () => {
        logger.success(`Server running on port ${this.port}`);
        logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
        logger.info(`API URL: http://localhost:${this.port}`);
        
        // Cleanup old logs on startup
        logger.cleanup(30);
      });
    } catch (error) {
      logger.error('Failed to start server', { error: error.message });
      process.exit(1);
    }
  }
}

// Start server
const server = new Server();
server.start();

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('Shutting down gracefully...');
  await database.disconnect();
  process.exit(0);
});

export default server;
