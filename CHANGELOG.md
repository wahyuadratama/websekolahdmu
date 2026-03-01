# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-01-XX

### Added
- Input validation middleware using express-validator
- Rate limiting for API endpoints to prevent abuse
- HTML sanitization middleware to prevent XSS attacks
- Comprehensive logging system with file-based logs
- Database backup and restore utilities
- Health check endpoint for monitoring
- Database seeder for testing with dummy data
- README.md with complete documentation
- CONTRIBUTING.md for contribution guidelines
- Environment variable examples (.env.example files)

### Changed
- Improved API client with automatic token management
- Enhanced CORS configuration for production security
- Better error handling with detailed logging
- Improved request logging with duration tracking

### Security
- Added rate limiting on login endpoint (5 attempts per 15 minutes)
- Added rate limiting on upload endpoint (20 uploads per hour)
- Added HTML sanitization for user-generated content
- Improved CORS configuration with origin validation
- Added input validation for all API endpoints

## [1.0.0] - 2025-01-XX

### Added
- Initial release
- Backend API with Express.js and MongoDB
- Frontend with Next.js 14
- User authentication with JWT
- Berita (News) management
- Galeri (Gallery) management
- Guru (Teacher) management
- Pesan (Messages) management
- Pendaftaran (Registration) system
- Settings management
- File upload functionality
- Admin dashboard
- Docker support with multi-stage builds
- Docker Compose configuration

### Features
- User roles: superadmin, admin, staff
- CRUD operations for all entities
- Image upload with validation
- Responsive design with Tailwind CSS
- Rich text editor for content
- Statistics dashboard
- Contact form
- Online registration form

### Security
- Password hashing with bcrypt
- JWT authentication
- httpOnly cookies
- CORS configuration
- File upload restrictions
