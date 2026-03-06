import axios from 'axios';

const normalizeApiOrigin = (value = '') =>
  value
    .trim()
    .replace(/\/$/, '')
    .replace(/\/api$/, '');

const API_URL = normalizeApiOrigin(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000');

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: `${API_URL}/api`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // Request interceptor untuk menambahkan token
    this.client.interceptors.request.use(
      (config) => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor untuk handle error
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            if (!window.location.pathname.includes('/login')) {
              window.location.href = '/login';
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth
  async login(username, password) {
    const response = await this.client.post('/auth/login', { username, password });
    if (response.data.success && response.data.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    }
    return response.data;
  }

  async logout() {
    try {
      await this.client.post('/auth/logout');
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }

  async getCurrentUser() {
    const response = await this.client.get('/auth/me');
    return response.data;
  }

  async getAllUsers() {
    const response = await this.client.get('/auth/users');
    return response.data;
  }

  async registerUser(userData) {
    const response = await this.client.post('/auth/register', userData);
    return response.data;
  }

  async deleteUser(id) {
    const response = await this.client.delete(`/auth/users/${id}`);
    return response.data;
  }

  // Berita
  async getBerita(status = null) {
    const params = status ? { status } : {};
    const response = await this.client.get('/berita', { params });
    return response.data;
  }

  async getBeritaById(id) {
    const response = await this.client.get(`/berita/${id}`);
    return response.data;
  }

  async getBeritaBySlug(slug) {
    const response = await this.client.get(`/berita/slug/${slug}`);
    return response.data;
  }

  async createBerita(data) {
    const response = await this.client.post('/berita', data);
    return response.data;
  }

  async updateBerita(id, data) {
    const response = await this.client.put(`/berita/${id}`, data);
    return response.data;
  }

  async deleteBerita(id) {
    const response = await this.client.delete(`/berita/${id}`);
    return response.data;
  }

  // Galeri
  async getGaleri() {
    const response = await this.client.get('/galeri');
    return response.data;
  }

  async createGaleri(data) {
    const response = await this.client.post('/galeri', data);
    return response.data;
  }

  async updateGaleri(id, data) {
    const response = await this.client.put(`/galeri/${id}`, data);
    return response.data;
  }

  async deleteGaleri(id) {
    const response = await this.client.delete(`/galeri/${id}`);
    return response.data;
  }

  // Guru
  async getGuru() {
    const response = await this.client.get('/guru');
    return response.data;
  }

  async createGuru(data) {
    const response = await this.client.post('/guru', data);
    return response.data;
  }

  async updateGuru(id, data) {
    const response = await this.client.put(`/guru/${id}`, data);
    return response.data;
  }

  async deleteGuru(id) {
    const response = await this.client.delete(`/guru/${id}`);
    return response.data;
  }

  // Pesan
  async getPesan() {
    const response = await this.client.get('/pesan');
    return response.data;
  }

  async createPesan(data) {
    const response = await this.client.post('/pesan', data);
    return response.data;
  }

  async markPesanAsRead(id) {
    const response = await this.client.put(`/pesan/${id}/read`);
    return response.data;
  }

  async deletePesan(id) {
    const response = await this.client.delete(`/pesan/${id}`);
    return response.data;
  }

  // Pendaftaran
  async getPendaftaran() {
    const response = await this.client.get('/pendaftaran');
    return response.data;
  }

  async createPendaftaran(data) {
    const response = await this.client.post('/pendaftaran', data);
    return response.data;
  }

  async getPendaftaranCount() {
    const response = await this.client.get('/pendaftaran/count');
    return response.data;
  }

  // Settings
  async getStats() {
    const response = await this.client.get('/settings/stats');
    return response.data;
  }

  async updateStats(data) {
    const response = await this.client.put('/settings/stats', data);
    return response.data;
  }
}

const apiClient = new ApiClient();

export default apiClient;
