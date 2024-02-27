
# Tutorial Deploy Website dengan GitHub Pages

GitHub Pages adalah platform hosting gratis dari GitHub yang memungkinkan Anda untuk men-deploy website statis (HTML, CSS, dan JavaScript) langsung dari repository GitHub Anda. Tutorial ini akan membimbing Anda melalui langkah-langkah untuk deploy website Anda menggunakan GitHub Pages.

## Persyaratan
- Akun GitHub.
- Git terinstal pada komputer Anda.
- Dasar pengetahuan tentang Git (commit, push, branch, dll).
- Website statis yang siap di-deploy (HTML, CSS, JavaScript).

## Langkah-langkah Deploy Website

### 1. Buat Repository di GitHub
- Login ke akun GitHub Anda.
- Klik tombol "New repository" dan beri nama repository (contoh: `username.github.io`, ganti `username` dengan username GitHub Anda).
- Inisialisasi dengan README dan pilih "Create repository".

### 2. Clone Repository
- Clone repository yang baru dibuat ke komputer lokal Anda menggunakan command:
```bash
git clone https://github.com/username/username.github.io.git
```
Ganti `username` dengan username GitHub Anda.

### 3. Tambahkan Website Anda ke Repository
- Salin file website Anda (HTML, CSS, JavaScript) ke dalam folder repository yang telah di-clone.
- Gunakan command berikut untuk menambahkan dan commit perubahan:
```bash
git add .
git commit -m "Initial commit"
```

### 4. Push ke GitHub
- Push perubahan ke GitHub dengan command:
```bash
git push -u origin master
```
- Website Anda sekarang sudah online dan dapat diakses melalui `https://username.github.io`.

## Custom Domain
Jika Anda ingin menggunakan custom domain untuk website Anda, ikuti langkah-langkah berikut:

- Tambahkan file bernama `CNAME` ke root direktori repository Anda dengan isi file adalah nama domain Anda (contoh: `www.example.com`).
- Update DNS setting pada domain registrar Anda untuk menunjuk ke server GitHub Pages.

## Kesimpulan
Dengan mengikuti langkah-langkah di atas, Anda dapat dengan mudah men-deploy website statis Anda menggunakan GitHub Pages. GitHub Pages merupakan solusi hosting yang cepat dan mudah, terutama untuk proyek-proyek open source, portofolio pribadi, atau halaman proyek.

