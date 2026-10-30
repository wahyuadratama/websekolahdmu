// Helper format tanggal Indonesia yang konsisten: "29 Oktober 2026"
export function formatTanggalID(value) {
  if (!value) return '';
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

// "29 Oktober 2026, 10.30" — untuk kebutuhan tanggal + jam
export function formatTanggalJamID(value) {
  if (!value) return '';
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(' pukul ', ', ');
}
