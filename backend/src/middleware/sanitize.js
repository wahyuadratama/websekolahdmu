import DOMPurify from 'isomorphic-dompurify';

class SanitizeMiddleware {
  // Sanitize HTML content
  static sanitizeHTML(dirty) {
    if (!dirty || typeof dirty !== 'string') return dirty;
    
    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre',
        'table', 'thead', 'tbody', 'tr', 'th', 'td'
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel']
    });
  }

  // Sanitize request body
  static sanitizeBody(req, res, next) {
    if (req.body && typeof req.body === 'object') {
      // Fields that should be sanitized for HTML
      const htmlFields = ['konten', 'deskripsi', 'pesan', 'excerpt'];
      
      for (const field of htmlFields) {
        if (req.body[field]) {
          req.body[field] = SanitizeMiddleware.sanitizeHTML(req.body[field]);
        }
      }
    }
    next();
  }

  // Strip all HTML tags
  static stripHTML(dirty) {
    if (!dirty || typeof dirty !== 'string') return dirty;
    return dirty.replace(/<[^>]*>/g, '');
  }
}

export default SanitizeMiddleware;
