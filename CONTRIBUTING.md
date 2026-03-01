# Contributing to Website Pondok Pesantren Modern Darul Mukhlisin

Terima kasih atas minat Anda untuk berkontribusi pada proyek ini! 🎉

## 📋 Cara Berkontribusi

### 1. Fork Repository

Fork repository ini ke akun GitHub Anda.

### 2. Clone Repository

```bash
git clone https://github.com/your-username/webskolahdmu.git
cd webskolahdmu
```

### 3. Buat Branch Baru

```bash
git checkout -b feature/nama-fitur-anda
```

Gunakan naming convention:
- `feature/` untuk fitur baru
- `fix/` untuk bug fix
- `docs/` untuk dokumentasi
- `refactor/` untuk refactoring code

### 4. Setup Development Environment

#### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env sesuai konfigurasi lokal Anda
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local sesuai konfigurasi lokal Anda
npm run dev
```

### 5. Lakukan Perubahan

- Tulis code yang clean dan mudah dibaca
- Follow coding standards yang ada
- Tambahkan komentar jika diperlukan
- Test perubahan Anda secara menyeluruh

### 6. Commit Changes

```bash
git add .
git commit -m "feat: menambahkan fitur X"
```

Gunakan conventional commits:
- `feat:` untuk fitur baru
- `fix:` untuk bug fix
- `docs:` untuk perubahan dokumentasi
- `style:` untuk formatting, missing semicolons, etc
- `refactor:` untuk refactoring code
- `test:` untuk menambahkan test
- `chore:` untuk maintenance tasks

### 7. Push ke GitHub

```bash
git push origin feature/nama-fitur-anda
```

### 8. Buat Pull Request

- Buka repository di GitHub
- Klik "New Pull Request"
- Pilih branch Anda
- Isi deskripsi PR dengan detail:
  - Apa yang diubah
  - Mengapa perubahan diperlukan
  - Screenshot jika ada perubahan UI
  - Testing yang sudah dilakukan

## 🎯 Coding Standards

### JavaScript/Node.js

- Gunakan ES6+ syntax
- Gunakan `const` dan `let`, hindari `var`
- Gunakan arrow functions untuk callbacks
- Gunakan async/await untuk asynchronous code
- Gunakan meaningful variable names
- Tambahkan JSDoc comments untuk functions yang kompleks

### React/Next.js

- Gunakan functional components dengan hooks
- Gunakan proper component naming (PascalCase)
- Extract reusable logic ke custom hooks
- Keep components small and focused
- Use proper prop types validation

### CSS/Tailwind

- Gunakan Tailwind utility classes
- Hindari inline styles kecuali diperlukan
- Gunakan responsive design
- Follow mobile-first approach

## 🧪 Testing

Sebelum submit PR, pastikan:

- [ ] Code berjalan tanpa error
- [ ] Tidak ada console.log yang tertinggal
- [ ] Fitur baru sudah ditest secara manual
- [ ] Tidak ada breaking changes pada fitur existing
- [ ] Code sudah di-format dengan baik

## 📝 Pull Request Guidelines

### PR Title

Gunakan format: `[Type] Brief description`

Contoh:
- `[Feature] Add user profile page`
- `[Fix] Resolve login authentication issue`
- `[Docs] Update installation guide`

### PR Description

Include:
1. **What**: Apa yang diubah
2. **Why**: Mengapa perubahan diperlukan
3. **How**: Bagaimana implementasinya
4. **Testing**: Bagaimana cara test perubahan
5. **Screenshots**: Jika ada perubahan UI

### PR Checklist

- [ ] Code follows project coding standards
- [ ] Self-review of code completed
- [ ] Comments added for complex logic
- [ ] Documentation updated if needed
- [ ] No console errors or warnings
- [ ] Tested on different screen sizes (if UI changes)
- [ ] Branch is up to date with main

## 🐛 Reporting Bugs

Jika menemukan bug, buat issue dengan informasi:

1. **Deskripsi bug**: Jelaskan bug secara detail
2. **Steps to reproduce**: Langkah-langkah untuk reproduce bug
3. **Expected behavior**: Behavior yang diharapkan
4. **Actual behavior**: Behavior yang terjadi
5. **Screenshots**: Jika memungkinkan
6. **Environment**: Browser, OS, dll

## 💡 Suggesting Features

Untuk suggest fitur baru:

1. Cek apakah fitur sudah ada di issues
2. Buat issue baru dengan label "enhancement"
3. Jelaskan fitur yang diinginkan
4. Jelaskan use case dan benefit
5. Tambahkan mockup jika ada

## 📞 Komunikasi

- Gunakan GitHub Issues untuk bug reports dan feature requests
- Gunakan GitHub Discussions untuk pertanyaan umum
- Be respectful dan professional dalam komunikasi

## 🙏 Code of Conduct

- Be respectful to all contributors
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Respect different viewpoints and experiences

## 📄 License

Dengan berkontribusi, Anda setuju bahwa kontribusi Anda akan dilisensikan di bawah MIT License.

---

Terima kasih telah berkontribusi! 🎉
