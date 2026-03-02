import { body, validationResult } from 'express-validator';

class ValidationMiddleware {
  // Handle validation errors
  static handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validasi gagal',
        errors: errors.array()
      });
    }
    next();
  }

  // Login validation
  static loginValidation = [
    body('username')
      .trim()
      .notEmpty().withMessage('Username harus diisi')
      .isLength({ min: 3 }).withMessage('Username minimal 3 karakter'),
    body('password')
      .notEmpty().withMessage('Password harus diisi')
      .isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
    ValidationMiddleware.handleValidationErrors
  ];

  // Register validation
  static registerValidation = [
    body('username')
      .trim()
      .notEmpty().withMessage('Username harus diisi')
      .isLength({ min: 3 }).withMessage('Username minimal 3 karakter')
      .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username hanya boleh huruf, angka, dan underscore'),
    body('password')
      .notEmpty().withMessage('Password harus diisi')
      .isLength({ min: 6 }).withMessage('Password minimal 6 karakter')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password harus mengandung huruf besar, kecil, dan angka'),
    body('fullName')
      .trim()
      .notEmpty().withMessage('Nama lengkap harus diisi')
      .isLength({ min: 3 }).withMessage('Nama lengkap minimal 3 karakter'),
    body('email')
      .trim()
      .notEmpty().withMessage('Email harus diisi')
      .isEmail().withMessage('Format email tidak valid')
      .normalizeEmail(),
    body('role')
      .optional()
      .isIn(['superadmin', 'admin', 'staff']).withMessage('Role tidak valid'),
    ValidationMiddleware.handleValidationErrors
  ];

  // Berita validation
  static beritaValidation = [
    body('judul')
      .trim()
      .notEmpty().withMessage('Judul harus diisi')
      .isLength({ min: 5, max: 200 }).withMessage('Judul harus 5-200 karakter'),
    body('kategori')
      .notEmpty().withMessage('Kategori harus diisi')
      .isIn(['Akademik', 'Prestasi', 'Kegiatan', 'Pengumuman', 'Info', 'Beasiswa']).withMessage('Kategori tidak valid'),
    body('konten')
      .custom((value) => {
        const plain = String(value || '')
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        if (!plain) {
          throw new Error('Konten harus diisi');
        }
        if (plain.length < 10) {
          throw new Error('Konten minimal 10 karakter');
        }
        return true;
      }),
    body('status')
      .optional()
      .isIn(['published', 'draft']).withMessage('Status tidak valid'),
    body('excerpt')
      .optional()
      .trim()
      .isLength({ max: 300 }).withMessage('Excerpt maksimal 300 karakter'),
    ValidationMiddleware.handleValidationErrors
  ];

  // Guru validation
  static guruValidation = [
    body('nama')
      .trim()
      .notEmpty().withMessage('Nama harus diisi')
      .isLength({ min: 3 }).withMessage('Nama minimal 3 karakter'),
    body('nip')
      .trim()
      .notEmpty().withMessage('NIP harus diisi')
      .isLength({ min: 5 }).withMessage('NIP minimal 5 karakter'),
    body('mapel')
      .trim()
      .notEmpty().withMessage('Mata pelajaran harus diisi'),
    body('status')
      .optional()
      .isIn(['aktif', 'nonaktif']).withMessage('Status tidak valid'),
    ValidationMiddleware.handleValidationErrors
  ];

  // Pesan validation
  static pesanValidation = [
    body('nama')
      .trim()
      .notEmpty().withMessage('Nama harus diisi')
      .isLength({ min: 3 }).withMessage('Nama minimal 3 karakter'),
    body('subjek')
      .trim()
      .notEmpty().withMessage('Subjek harus diisi')
      .isLength({ min: 5 }).withMessage('Subjek minimal 5 karakter'),
    body('pesan')
      .trim()
      .notEmpty().withMessage('Pesan harus diisi')
      .isLength({ min: 10 }).withMessage('Pesan minimal 10 karakter'),
    ValidationMiddleware.handleValidationErrors
  ];

  // Pendaftaran validation
  static pendaftaranValidation = [
    body('nama')
      .trim()
      .notEmpty().withMessage('Nama harus diisi')
      .isLength({ min: 3 }).withMessage('Nama minimal 3 karakter'),
    body('nisn')
      .trim()
      .notEmpty().withMessage('NISN harus diisi')
      .isLength({ min: 10, max: 10 }).withMessage('NISN harus 10 digit')
      .isNumeric().withMessage('NISN harus berupa angka'),
    body('tempat_lahir')
      .trim()
      .notEmpty().withMessage('Tempat lahir harus diisi'),
    body('tanggal_lahir')
      .notEmpty().withMessage('Tanggal lahir harus diisi')
      .isISO8601().withMessage('Format tanggal tidak valid'),
    body('jenis_kelamin')
      .notEmpty().withMessage('Jenis kelamin harus diisi')
      .isIn(['Laki-laki', 'Perempuan']).withMessage('Jenis kelamin tidak valid'),
    body('asal_sekolah')
      .trim()
      .notEmpty().withMessage('Asal sekolah harus diisi'),
    body('alamat')
      .trim()
      .notEmpty().withMessage('Alamat harus diisi')
      .isLength({ min: 10 }).withMessage('Alamat minimal 10 karakter'),
    body('nama_ortu')
      .trim()
      .notEmpty().withMessage('Nama orang tua harus diisi'),
    body('telepon')
      .trim()
      .notEmpty().withMessage('Telepon harus diisi')
      .matches(/^[0-9+\-\s()]+$/).withMessage('Format telepon tidak valid'),
    body('email')
      .optional()
      .trim()
      .isEmail().withMessage('Format email tidak valid')
      .normalizeEmail(),
    ValidationMiddleware.handleValidationErrors
  ];

  // Galeri validation
  static galeriValidation = [
    body('judul')
      .trim()
      .notEmpty().withMessage('Judul harus diisi')
      .isLength({ min: 3 }).withMessage('Judul minimal 3 karakter'),
    body('url')
      .trim()
      .notEmpty().withMessage('URL gambar harus diisi'),
    body('kategori')
      .optional()
      .trim(),
    ValidationMiddleware.handleValidationErrors
  ];
}

export default ValidationMiddleware;
