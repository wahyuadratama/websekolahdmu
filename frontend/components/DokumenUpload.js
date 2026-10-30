'use client';

import { useState, useRef } from 'react';
import { API_URL } from '@/lib/config';

const ALLOWED_EXT = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export default function DokumenUpload({ value, onChange, label = 'Upload Dokumen' }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const fileName = value ? value.split('/').pop() : '';

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_EXT.includes(ext)) {
      alert('File harus berupa dokumen (pdf, doc, docx, xls, xlsx, ppt, pptx)');
      e.target.value = '';
      return;
    }

    if (file.size > MAX_SIZE) {
      alert('Ukuran file maksimal 10MB');
      e.target.value = '';
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${API_URL}/api/upload/dokumen`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await res.json();

      if (data.success) {
        onChange(data.path); // simpan path saja ke database
      } else {
        alert('Gagal upload: ' + data.message);
      }
    } catch (error) {
      alert('Error upload: ' + error.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div>
      <label className="block text-gray-700 mb-2 font-semibold">{label} <span className="text-red-500">*</span></label>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-50"
        >
          <i className="fas fa-upload mr-2"></i>{uploading ? 'Mengupload...' : 'Pilih File'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
          onChange={handleFileChange}
          className="hidden"
        />
        {fileName ? (
          <span className="text-sm text-slate-700 truncate">
            <i className="fas fa-file-alt text-slate-400 mr-2"></i>{fileName}
          </span>
        ) : (
          <span className="text-sm text-slate-400">Belum ada file dipilih (maks 10MB)</span>
        )}
      </div>
    </div>
  );
}
