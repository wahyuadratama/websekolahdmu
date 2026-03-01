import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// Server-side compatible DOMPurify instance
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export function sanitizeHtml(html = '') {
  if (!html || typeof html !== 'string') return '';
  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
}
