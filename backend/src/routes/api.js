import express from 'express';
import BeritaController from '../controllers/BeritaController.js';
import { galeriController, guruController, pesanController, pendaftaranController, settingsController, testimoniController, programController, prestasiController, pimpinanController, fasilitasController, komentarBeritaController, unduhanController, faqController } from '../controllers/index.js';
import UploadController, { upload, dokumenUpload } from '../controllers/UploadController.js';
import AuthMiddleware from '../middleware/auth.js';
import ValidationMiddleware from '../middleware/validation.js';
import SanitizeMiddleware from '../middleware/sanitize.js';
import rateLimiter from '../middleware/rateLimiter.js';

const router = express.Router();

// Upload Route with rate limiting
router.post('/upload', AuthMiddleware.verifyToken, rateLimiter.uploadLimiter(), upload.single('image'), UploadController.uploadImage.bind(UploadController));

// Upload dokumen (brosur, formulir, dll) — hanya admin
router.post('/upload/dokumen', AuthMiddleware.verifyToken, rateLimiter.uploadLimiter(), dokumenUpload.single('file'), UploadController.uploadDokumen.bind(UploadController));

// Berita Routes
router.get('/berita', BeritaController.getAll);
router.get('/berita/slug/:slug', BeritaController.getBySlug);
router.get('/berita/:id', BeritaController.getById);
router.get('/berita/:slug/suka', BeritaController.getSukaCount);
router.post('/berita/:slug/suka', rateLimiter.limit({ windowMs: 15 * 60 * 1000, max: 30, message: 'Terlalu banyak permintaan, coba lagi nanti.' }), BeritaController.toggleSuka);
router.get('/berita/:slug/komentar', komentarBeritaController.getBySlug.bind(komentarBeritaController));
router.post('/berita/:slug/komentar', rateLimiter.limit({ windowMs: 15 * 60 * 1000, max: 20, message: 'Terlalu banyak pengiriman komentar, coba lagi nanti.' }), SanitizeMiddleware.sanitizeBody, ValidationMiddleware.komentarBeritaValidation, komentarBeritaController.submit.bind(komentarBeritaController));
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
router.post('/pesan', rateLimiter.limit({ windowMs: 10 * 60 * 1000, max: 8, message: 'Terlalu banyak kirim pesan, coba lagi beberapa menit.' }), SanitizeMiddleware.sanitizeBody, ValidationMiddleware.pesanValidation, pesanController.create.bind(pesanController));
router.put('/pesan/:id/read', AuthMiddleware.verifyToken, pesanController.markAsRead.bind(pesanController));
router.delete('/pesan/:id', AuthMiddleware.verifyToken, pesanController.delete.bind(pesanController));

// Pendaftaran Routes
router.get('/pendaftaran', AuthMiddleware.verifyToken, pendaftaranController.getAll.bind(pendaftaranController));
router.post('/pendaftaran', rateLimiter.limit({ windowMs: 15 * 60 * 1000, max: 5, message: 'Terlalu banyak percobaan pendaftaran. Silakan coba lagi nanti.' }), ValidationMiddleware.pendaftaranValidation, pendaftaranController.create.bind(pendaftaranController));
router.get('/pendaftaran/count', pendaftaranController.getCount.bind(pendaftaranController));

// Settings Routes
router.get('/settings/stats', settingsController.getStats.bind(settingsController));
router.put('/settings/stats', AuthMiddleware.verifyToken, settingsController.updateStats.bind(settingsController));
router.get('/settings/ppsb', settingsController.getPpsb.bind(settingsController));
router.put('/settings/ppsb', AuthMiddleware.verifyToken, settingsController.updatePpsb.bind(settingsController));
router.get('/settings/site', settingsController.getSite.bind(settingsController));
router.put('/settings/site', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, SanitizeMiddleware.sanitizeBody, settingsController.updateSite.bind(settingsController));

// Testimoni Routes
router.get('/testimoni', testimoniController.getAll.bind(testimoniController));
router.post('/testimoni/submit', rateLimiter.limit({ windowMs: 15 * 60 * 1000, max: 20, message: 'Terlalu banyak pengiriman testimoni, coba lagi nanti.' }), SanitizeMiddleware.sanitizeBody, testimoniController.submit.bind(testimoniController));
router.put('/testimoni', AuthMiddleware.verifyToken, SanitizeMiddleware.sanitizeBody, testimoniController.saveAll.bind(testimoniController));
router.patch('/testimoni/:id/moderate', AuthMiddleware.verifyToken, SanitizeMiddleware.sanitizeBody, testimoniController.moderate.bind(testimoniController));

// Komentar Berita Routes (admin)
router.get('/komentar-berita/admin', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, komentarBeritaController.getAllAdmin.bind(komentarBeritaController));
router.put('/komentar-berita/:id', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, SanitizeMiddleware.sanitizeBody, komentarBeritaController.moderate.bind(komentarBeritaController));
router.delete('/komentar-berita/:id', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, komentarBeritaController.delete.bind(komentarBeritaController));

// Program Routes (publik: hanya yang published)
router.get('/program', programController.getAll.bind(programController));
router.get('/program/admin', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, programController.getAllAdmin.bind(programController));
router.post('/program', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, SanitizeMiddleware.sanitizeBody, ValidationMiddleware.programValidation, programController.create.bind(programController));
router.put('/program/:id', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, SanitizeMiddleware.sanitizeBody, ValidationMiddleware.programValidation, programController.update.bind(programController));
router.delete('/program/:id', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, programController.delete.bind(programController));

// Prestasi Routes (publik: hanya yang published, dukung filter ?tahun= & ?tingkat=)
router.get('/prestasi', prestasiController.getAll.bind(prestasiController));
router.get('/prestasi/admin', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, prestasiController.getAllAdmin.bind(prestasiController));
router.post('/prestasi', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, SanitizeMiddleware.sanitizeBody, ValidationMiddleware.prestasiValidation, prestasiController.create.bind(prestasiController));
router.put('/prestasi/:id', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, SanitizeMiddleware.sanitizeBody, ValidationMiddleware.prestasiValidation, prestasiController.update.bind(prestasiController));
router.delete('/prestasi/:id', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, prestasiController.delete.bind(prestasiController));

// Pimpinan Routes (publik: hanya yang published)
router.get('/pimpinan', pimpinanController.getAll.bind(pimpinanController));
router.get('/pimpinan/admin', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, pimpinanController.getAllAdmin.bind(pimpinanController));
router.post('/pimpinan', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, SanitizeMiddleware.sanitizeBody, ValidationMiddleware.pimpinanValidation, pimpinanController.create.bind(pimpinanController));
router.put('/pimpinan/:id', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, SanitizeMiddleware.sanitizeBody, ValidationMiddleware.pimpinanValidation, pimpinanController.update.bind(pimpinanController));
router.delete('/pimpinan/:id', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, pimpinanController.delete.bind(pimpinanController));

// Fasilitas Routes (publik: hanya yang published)
router.get('/fasilitas', fasilitasController.getAll.bind(fasilitasController));
router.get('/fasilitas/admin', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, fasilitasController.getAllAdmin.bind(fasilitasController));
router.post('/fasilitas', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, SanitizeMiddleware.sanitizeBody, ValidationMiddleware.fasilitasValidation, fasilitasController.create.bind(fasilitasController));
router.put('/fasilitas/:id', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, SanitizeMiddleware.sanitizeBody, ValidationMiddleware.fasilitasValidation, fasilitasController.update.bind(fasilitasController));
router.delete('/fasilitas/:id', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, fasilitasController.delete.bind(fasilitasController));

// Unduhan Routes (publik: hanya yang published)
router.get('/unduhan', unduhanController.getAll.bind(unduhanController));
router.get('/unduhan/admin', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, unduhanController.getAllAdmin.bind(unduhanController));
router.post('/unduhan', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, SanitizeMiddleware.sanitizeBody, ValidationMiddleware.unduhanValidation, unduhanController.create.bind(unduhanController));
router.put('/unduhan/:id', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, SanitizeMiddleware.sanitizeBody, ValidationMiddleware.unduhanValidation, unduhanController.update.bind(unduhanController));
router.delete('/unduhan/:id', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, unduhanController.delete.bind(unduhanController));

// FAQ Routes (publik: hanya yang published)
router.get('/faq', faqController.getAll.bind(faqController));
router.get('/faq/admin', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, faqController.getAllAdmin.bind(faqController));
router.post('/faq', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, SanitizeMiddleware.sanitizeBody, ValidationMiddleware.faqValidation, faqController.create.bind(faqController));
router.put('/faq/:id', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, SanitizeMiddleware.sanitizeBody, ValidationMiddleware.faqValidation, faqController.update.bind(faqController));
router.delete('/faq/:id', AuthMiddleware.verifyToken, AuthMiddleware.isAdminOrAbove, faqController.delete.bind(faqController));

export default router;
