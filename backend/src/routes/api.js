import express from 'express';
import BeritaController from '../controllers/BeritaController.js';
import { galeriController, guruController, pesanController, pendaftaranController, settingsController, testimoniController } from '../controllers/index.js';
import UploadController, { upload } from '../controllers/UploadController.js';
import AuthMiddleware from '../middleware/auth.js';
import ValidationMiddleware from '../middleware/validation.js';
import SanitizeMiddleware from '../middleware/sanitize.js';
import rateLimiter from '../middleware/rateLimiter.js';

const router = express.Router();

// Upload Route with rate limiting
router.post('/upload', AuthMiddleware.verifyToken, rateLimiter.uploadLimiter(), upload.single('image'), UploadController.uploadImage.bind(UploadController));

// Berita Routes
router.get('/berita', BeritaController.getAll);
router.get('/berita/slug/:slug', BeritaController.getBySlug);
router.get('/berita/:id', BeritaController.getById);
router.post('/berita', AuthMiddleware.verifyToken, SanitizeMiddleware.sanitizeBody, ValidationMiddleware.beritaValidation, BeritaController.create);
router.put('/berita/:id', AuthMiddleware.verifyToken, SanitizeMiddleware.sanitizeBody, ValidationMiddleware.beritaValidation, BeritaController.update);
router.delete('/berita/:id', AuthMiddleware.verifyToken, BeritaController.delete);

// Galeri Routes
router.get('/galeri', galeriController.getAll.bind(galeriController));
router.post('/galeri', AuthMiddleware.verifyToken, SanitizeMiddleware.sanitizeBody, ValidationMiddleware.galeriValidation, galeriController.create.bind(galeriController));
router.put('/galeri/:id', AuthMiddleware.verifyToken, SanitizeMiddleware.sanitizeBody, ValidationMiddleware.galeriValidation, galeriController.update.bind(galeriController));
router.delete('/galeri/:id', AuthMiddleware.verifyToken, galeriController.delete.bind(galeriController));

// Guru Routes
router.get('/guru', guruController.getAll.bind(guruController));
router.post('/guru', AuthMiddleware.verifyToken, ValidationMiddleware.guruValidation, guruController.create.bind(guruController));
router.put('/guru/:id', AuthMiddleware.verifyToken, ValidationMiddleware.guruValidation, guruController.update.bind(guruController));
router.delete('/guru/:id', AuthMiddleware.verifyToken, guruController.delete.bind(guruController));

// Pesan Routes
router.get('/pesan', AuthMiddleware.verifyToken, pesanController.getAll.bind(pesanController));
router.post('/pesan', SanitizeMiddleware.sanitizeBody, ValidationMiddleware.pesanValidation, pesanController.create.bind(pesanController));
router.put('/pesan/:id/read', AuthMiddleware.verifyToken, pesanController.markAsRead.bind(pesanController));
router.delete('/pesan/:id', AuthMiddleware.verifyToken, pesanController.delete.bind(pesanController));

// Pendaftaran Routes
router.get('/pendaftaran', AuthMiddleware.verifyToken, pendaftaranController.getAll.bind(pendaftaranController));
router.post('/pendaftaran', ValidationMiddleware.pendaftaranValidation, pendaftaranController.create.bind(pendaftaranController));
router.get('/pendaftaran/count', pendaftaranController.getCount.bind(pendaftaranController));

// Settings Routes
router.get('/settings/stats', settingsController.getStats.bind(settingsController));
router.put('/settings/stats', AuthMiddleware.verifyToken, settingsController.updateStats.bind(settingsController));

// Testimoni Routes
router.get('/testimoni', testimoniController.getAll.bind(testimoniController));
router.post('/testimoni/submit', rateLimiter.limit({ windowMs: 15 * 60 * 1000, max: 5, message: 'Terlalu banyak pengiriman testimoni, coba lagi nanti.' }), SanitizeMiddleware.sanitizeBody, testimoniController.submit.bind(testimoniController));
router.put('/testimoni', AuthMiddleware.verifyToken, SanitizeMiddleware.sanitizeBody, testimoniController.saveAll.bind(testimoniController));
router.patch('/testimoni/:id/moderate', AuthMiddleware.verifyToken, SanitizeMiddleware.sanitizeBody, testimoniController.moderate.bind(testimoniController));

export default router;
