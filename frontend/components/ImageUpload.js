'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { API_URL } from '@/lib/config';

export default function ImageUpload({ value, onChange, label = "Upload Gambar" }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  // Handle both full URL and path
  const getPreviewUrl = (val) => {
    if (!val) return '';
    if (val.startsWith('http')) return val;
    return `${API_URL}${val}`;
  };
  
  const [preview, setPreview] = useState(getPreviewUrl(value));

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await res.json();

      if (data.success) {
        // Only save the path, not full URL
        setPreview(`${API_URL}${data.path}`);
        onChange(data.path); // Save only path to database
      } else {
        alert('Gagal upload: ' + data.message);
      }
    } catch (error) {
      alert('Error upload: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-gray-700 font-semibold">{label}</label>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className={`inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition ${
            uploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <i className="fas fa-upload mr-2"></i>
          {uploading ? 'Uploading...' : 'Pilih Gambar'}
        </label>
        
        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <i className="fas fa-trash mr-2"></i>Hapus
          </button>
        )}
      </div>

      {preview && (
        <div className="relative w-full max-w-md">
          <Image
            src={preview}
            alt="Preview"
            width={400}
            height={300}
            className="rounded-lg border border-gray-200 w-full h-auto"
          />
        </div>
      )}

      <p className="text-sm text-gray-500">
        Format: JPG, PNG, GIF. Maksimal 5MB
      </p>
    </div>
  );
}
