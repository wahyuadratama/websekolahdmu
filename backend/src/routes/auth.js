import express from 'express';
import AuthController from '../controllers/AuthController.js';
import AuthMiddleware from '../middleware/auth.js';
import ValidationMiddleware from '../middleware/validation.js';
import rateLimiter from '../middleware/rateLimiter.js';

const router = express.Router();

// Public routes with rate limiting
router.post('/login', rateLimiter.authLimiter(), ValidationMiddleware.loginValidation, AuthController.login);
router.post('/logout', AuthController.logout);

// Protected routes
router.get('/me', AuthMiddleware.verifyToken, AuthController.getCurrentUser);
router.get('/users', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, AuthController.getAllUsers);
router.post('/register', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, ValidationMiddleware.registerValidation, AuthController.register);
router.delete('/users/:id', AuthMiddleware.verifyToken, AuthMiddleware.isSuperAdmin, AuthController.deleteUser);

export default router;
