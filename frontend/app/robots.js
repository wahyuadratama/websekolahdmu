export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://darulmukhlisin.ponpes.id/sitemap.xml',
    host: 'https://darulmukhlisin.ponpes.id',
  };
}
