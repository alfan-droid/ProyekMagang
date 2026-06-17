Berikut adalah pembaruan dokumen **PRD (Product Requirement Document)** yang telah disesuaikan secara khusus untuk arsitektur modern **Opsi A (Laravel + Vue.js + Tailwind CSS + Inertia.js)** dengan database **MySQL**.

Beberapa poin teknis seperti arsitektur API terpisah, JWT, dan penyimpanan state lokal telah disesuaikan menjadi *Session-based Auth* yang lebih aman, struktur folder terintegrasi, serta logika semester yang lebih dinamis.

---

# PRODUCT REQUIREMENT DOCUMENT (PRD)

## SISTEM INFORMASI MANAJEMEN MAGANG (SIMAGANG)

## 1. Overview

### 1.1 Latar Belakang

Sistem administrasi akademik saat ini dituntut untuk berjalan secara digital, terintegrasi, dan efisien. Program Studi saat ini masih mengelola program magang mahasiswa menggunakan Google Script dan Spreadsheet sebagai basis data utama.

Sistem semi-manual ini memicu berbagai kendala operasional, seperti kesulitan pembaruan data, keterbatasan kontrol akses, tidak adanya monitoring progress secara real-time, serta keterlambatan komunikasi antara mahasiswa, dosen pembimbing, dan mitra perusahaan. Selain itu, mahasiswa kesulitan mendapatkan info lowongan yang terkurasi, prodi kesulitan mengelola data yang dinamis setiap semester, dan pelaporan via email membuat data tidak terstruktur serta rawan hilang.

Untuk mengatasi masalah tersebut, diperlukan Sistem Informasi Manajemen Magang berbasis web yang mendukung *multi-user*, *Role-Based Access Control* (RBAC), *workflow approval* yang jelas, dan *monitoring real-time* menggunakan ekosistem terintegrasi.

### 1.2 Tujuan Pengembangan Sistem

* **Digitalisasi Total:** Menggantikan proses manual berbasis spreadsheet dengan sistem berbasis web yang terintegrasi agar data lebih efisien dan akurat.
* **Akses Berbasis Peran:** Menyediakan platform *Multi-Role* (RBAC) bagi Mahasiswa, Dosen Pembimbing, Admin Prodi, dan Mitra Perusahaan.
* **Otomatisasi Alur Kerja:** Mengotomatiskan *workflow approval* berjenjang mulai dari pengajuan lowongan hingga persetujuan laporan.
* **Monitoring Real-Time:** Menyediakan *dashboard* terpusat untuk memantau kemajuan magang mahasiswa.
* **Penguatan Rekognisi Akademik:** Mendukung proses konversi mata kuliah dan pencapaian CPMK (Capaian Pembelajaran Mata Kuliah) secara sistematis.
* **Responsivitas Gadget:** Menghadirkan antarmuka *mobile-first design* agar nyaman diakses dari berbagai perangkat.

---

## 2. Requirement

### 2.1 Non-Functional Requirements (NFR)

Sistem harus memenuhi kriteria kualitas dan batasan performa sebagai berikut:

| No | Kategori | Deskripsi Kebutuhan & Kriteria Penerimaan |
| --- | --- | --- |
| 1 | **Performance** | *Response time* $\le3$ detik untuk operasi standar. Unggah dokumen (CV, laporan) hingga 10 MB selesai dalam $\le10$ detik. |
| 2 | **Availability** | *Uptime* minimal 99% dalam sebulan (maksimal *downtime* terencana 7 jam/bulan). Sistem aktif 24/7. |
| 3 | **Security** | Otentikasi berbasis **Session & Cookie bawaan Laravel**, enkripsi data sensitif (password menggunakan `bcrypt`), dan proteksi penuh dari serangan XSS/CSRF via middleware Laravel. |
| 4 | **Scalability** | Mampu menangani minimal 500 pengguna aktif bersamaan (*concurrent users*) tanpa penurunan performa memanfaatkan optimasi query Eloquent dan caching. |
| 5 | **Usability** | Antarmuka bersifat *mobile-first* dan responsif (resolusi 360px - 1920px) menggunakan Tailwind CSS. Skor SUS (System Usability Scale) $\ge70$. |
| 6 | **Maintainability** | Cakupan *unit test coverage* $\ge70\%$ menggunakan Pest atau PHPUnit. Pembaruan dikirimkan via CI/CD (GitHub Actions) ke server VPS/Cloud. |
| 7 | **Compatibility** | Fungsional penuh pada browser modern: Chrome 110+, Firefox 110+, Safari 16+, dan Edge 110+. |
| 8 | **Portabilitas & Regulasi** | Aplikasi bersifat *monolith-portable* (Laravel + Vue terpadu), dapat di-deploy di VPS Linux (Ubuntu) maupun Cloud provider tanpa dependensi API eksternal yang mengikat. Mematuhi regulasi perlindungan data pribadi di Indonesia. |

---

## 3. Core Feature

### 3.1 Modul Mahasiswa (Role: Mahasiswa)

* **Otentikasi Mandiri:** Login masuk ke sistem menggunakan akun yang telah diverifikasi.
* **Eksplorasi Lowongan:** Melihat daftar lowongan magang aktif yang telah disetujui admin, dilengkapi fitur pencarian kata kunci dan filter (bidang usaha, lokasi).
* **Pendaftaran Magang:** Melamar pada lowongan pilihan dengan mengunggah berkas CV dan surat lamaran langsung melalui formulir Vue.js ke sistem penyimpanan.
* **Pelacakan Status:** Memantau status seleksi pendaftaran secara *real-time* di *dashboard* utama.
* **Pelaporan Bulanan:** Mengisi formulir berkala dan mengirimkan laporan progres aktivitas magang setiap bulan.
* **Riwayat & Hasil:** Melihat lembar catatan revisi dari dosen pembimbing serta melihat nilai akhir magang jika seluruh proses evaluasi selesai.

### 3.2 Modul Mitra Perusahaan (Role: Mitra Perusahaan)

* **Manajemen Profil:** Registrasi/login perusahaan serta mengelola informasi profil, bidang usaha, kontak, dan alamat badan usaha.
* **Manajemen Lowongan:** Menginputkan draf lowongan magang baru (judul posisi, lokasi, kuota, deskripsi, kualifikasi, tenggat waktu).
* **Pusat Seleksi Pendaftar:** Meninjau berkas lamaran mahasiswa (CV & Surat Lamaran) dan memberikan keputusan hasil seleksi (Diterima/Ditolak).
* **Evaluasi Berkala:** Memeriksa laporan bulanan mahasiswa magang yang ditugaskan di perusahaannya serta menginput nilai akhir performa industri mahasiswa.

### 3.3 Modul Dosen Pembimbing (Role: Dosen Pembimbing)

* **Akses Khusus:** Login khusus ke portal dosen bimbingan akademik.
* **Manajemen Bimbingan:** Menampilkan daftar mahasiswa bimbingan aktif yang sedang menjalani masa magang di berbagai mitra.
* **Review & Monitoring Akademik:** Memantau grafik kemajuan mahasiswa, membaca dan memberikan *approval* laporan bulanan (setelah disetujui mitra), memberikan catatan revisi, serta menginput nilai akhir bimbingan dari sisi akademis.

### 3.4 Modul Admin Program Studi (Role: Admin Prodi)

* **Manajemen Pengguna:** Akses penuh untuk pengelolaan akun (CRUD) Mahasiswa, Dosen, dan Perusahaan Mitra (RBAC).
* **Kurasi Lowongan & Laporan:** Melakukan proses persetujuan (*approval*) atau penolakan terhadap draf lowongan magang baru dari mitra agar bisa tayang di sisi mahasiswa.
* **Alokasi Pembimbing:** Menugaskan Dosen Pembimbing kepada mahasiswa yang telah berstatus 'Diterima' magang di perusahaan.
* **Monitoring Global & Ekspor:** *Dashboard* terpusat untuk memantau kemajuan seluruh mahasiswa secara makro, serta fitur ekspor rekap data magang ke format PDF/Excel secara *native* melalui backend Laravel.
* **Rekognisi Akademik:** Mengelola data konversi nilai SKS mata kuliah prodi dan pemetaan target pencapaian CPMK mahasiswa.

---

## 4. User Flow

### 4.1 Fase Pendaftaran & Seleksi Kelayakan Otomatis

1. Mahasiswa mengunggah berkas pendaftaran pada lowongan aktif melalui komponen Vue.js.
2. **Aturan Server (Laravel Background Validation):** Sistem otomatis memeriksa data profil akademik mahasiswa di basis data saat tombol daftar ditekan.
* *Syarat Mutlak:* Sistem menghitung semester berjalan secara dinamis berdasarkan kolom `angkatan` mahasiswa dan tanggal saat ini. Mahasiswa wajib berada pada Semester $\ge5$ DAN memiliki IPK $>3.0$.
* Jika tidak memenuhi syarat, Laravel Controller langsung menolak *request* dan mengubah status pendaftaran menjadi `"Ditolak Sistem"` tanpa melalui antrean Admin Prodi.


3. Jika lolos penyaringan otomatis oleh sistem, data diteruskan ke dashboard Admin Prodi untuk persetujuan kelayakan dokumen, kemudian beralih ke dashboard Mitra Perusahaan untuk dilakukan seleksi akhir (*Diterima/Ditolak*).

### 4.2 Alur Persetujuan Laporan Berurutan (Sequential Approval Flow)

Pengondisian alur *approval* dikunci secara terstruktur pada *Backend Controller*:

1. Mahasiswa mengisi deskripsi aktivitas dan mengunggah dokumen laporan bulanan. Status laporan awal diset menjadi `'menunggu_mitra'`.
2. **Langkah 1 (Review Industri):** Supervisor Mitra Perusahaan memeriksa laporan di *dashboard*-nya, memberikan masukan, dan menekan tombol *Approve*. Status data berubah menjadi `'menunggu_dosen'`.
3. **Langkah 2 (Final Approval Akademik):** Komponen tombol *Final Approval* pada halaman Vue.js milik Dosen Pembimbing baru akan aktif dan dapat diklik **hanya jika** status laporan sudah berubah menjadi `'menunggu_dosen'`.
4. Jika salah satu pihak (Mitra atau Dosen) memilih opsi *"Revisi"*, status kembali berubah menjadi `'revisi'` dan form pelaporan di sisi mahasiswa otomatis terbuka kembali untuk diperbaiki.

---

## 5. Architecture

Sistem ini dibangun menggunakan arsitektur **Modern Monolith (Single-Repository)** dengan memisahkan tanggung jawab visual dan logika, namun berada dalam satu ekosistem server yang sama.

```

1. **Presentation Layer (Front-End Interface):**
* Menggunakan **Vue.js 3** untuk merendah komponen antarmuka yang reaktif dan dinamis berdasarkan hak akses (RBAC).
* *Mobile-First Layout* diterapkan menggunakan Tailwind CSS pada halaman Mahasiswa (untuk mempermudah unggah laporan/cek lowongan via *smartphone*) dan Mitra Perusahaan.
* *Desktop Layout Dashboard* disediakan khusus untuk Admin Prodi dan Dosen Pembimbing guna mempermudah pengelolaan data tabular yang padat.


2. **Application Layer (Back-End Business Logic):**
* Menggunakan **Laravel** sebagai penyedia rute aplikasi, validasi data, sistem keamanan, manajemen sesi (*Session Auth*), dan mesin agregasi grafik dashboard (*Monitoring Engine*).
* **Inertia.js** bertindak sebagai "jembatan" yang mengirimkan data dari Laravel Controller langsung sebagai *Vue Props*, menghilangkan kebutuhan pembuatan routing API (`api.php`) terpisah dan Axios manual.
* *Background Service:* Memanfaatkan fitur **Laravel Task Scheduling & Queue** sebagai mesin otomatis pengirim notifikasi pengingat pelaporan (*Reminder Engine*).


3. **Data Layer (Database & Storage System):**
* **MySQL** digunakan sebagai RDBMS utama untuk menjaga konsistensi relasi transaksi data antar-tabel (user, lowongan, nilai, penugasan bimbingan).
* **Laravel Storage System** dihubungkan ke penyedia *Object Storage* (seperti AWS S3, MinIO, atau Supabase Storage) untuk menampung berkas fisik CV mahasiswa dan dokumen PDF laporan bulanan secara aman terisolasi.



---

## 6. Database Schema

### 6.1 Tabel Utama & Atribut (Dialek MySQL)

* **USERS:** `id_user` (PK, INT, AUTO_INCREMENT), `name` (VARCHAR), `email` (VARCHAR, UNIQUE), `password` (VARCHAR), `role` (ENUM: 'admin', 'mahasiswa', 'dosen', 'mitra'), `no_hp` (VARCHAR), `alamat` (TEXT), `status_akun` (ENUM: 'aktif', 'nonaktif'), `created_at` (TIMESTAMP), `updated_at` (TIMESTAMP).
* **MAHASISWA:** `id_mahasiswa` (PK, INT, AUTO_INCREMENT), `id_user` (FK to USERS, INT), `nim` (VARCHAR, UNIQUE), `prodi` (VARCHAR), `ipk` (DECIMAL(3,2)), `angkatan` (YEAR), `created_at` (TIMESTAMP).
* **DOSEN:** `id_dosen` (PK, INT, AUTO_INCREMENT), `id_user` (FK to USERS, INT), `nidn` (VARCHAR, UNIQUE), `jabatan` (VARCHAR).
* **MITRA_PERUSAHAAN:** `id_mitra` (PK, INT, AUTO_INCREMENT), `id_user` (FK to USERS, INT), `nama_perusahaan` (VARCHAR), `alamat_perusahaan` (TEXT), `bidang_usaha` (VARCHAR), `no_telepon` (VARCHAR).
* **LOWONGAN:** `id_lowongan` (PK, INT, AUTO_INCREMENT), `id_mitra` (FK to MITRA_PERUSAHAAN, INT), `posisi` (VARCHAR), `bidang_kategori` (VARCHAR), `lokasi` (VARCHAR), `deskripsi` (TEXT), `kualifikasi` (TEXT), `kuota` (INT), `deadline` (DATE), `status` (ENUM: 'pending', 'disetujui', 'ditolak').
* **PENDAFTARAN_MAGANG:** `id_pendaftaran` (PK, INT, AUTO_INCREMENT), `id_mahasiswa` (FK to MAHASISWA, INT), `id_lowongan` (FK to LOWONGAN, INT), `tanggal_daftar` (DATETIME), `cv_file` (VARCHAR), `surat_lamaran` (VARCHAR), `status_seleksi` (ENUM: 'menunggu', 'diterima', 'ditolak', 'ditolak_sistem', 'dipertimbangkan').
* **DOSEN_PEMBIMBING:** `id_bimbingan` (PK, INT, AUTO_INCREMENT), `id_mahasiswa` (FK to MAHASISWA, INT), `id_dosen` (FK to DOSEN, INT), `tanggal_penugasan` (DATE).
* **LAPORAN_BULANAN:** `id_laporan` (PK, INT, AUTO_INCREMENT), `id_mahasiswa` (FK to MAHASISWA, INT), `bulan` (INT), `tahun` (YEAR), `file_laporan` (VARCHAR), `isi_laporan` (TEXT), `status_review` (ENUM: 'menunggu_mitra', 'menunggu_dosen', 'disetujui', 'revisi'), `catatan_revisi` (TEXT), `updated_at` (TIMESTAMP).
* **NILAI_MAGANG:** `id_nilai` (PK, INT, AUTO_INCREMENT), `id_mahasiswa` (FK to MAHASISWA, INT), `nilai_dosen` (DECIMAL(5,2)), `nilai_mitra` (DECIMAL(5,2)), `nilai_akhir` (DECIMAL(5,2)), `konversi_sks` (INT).
* **NOTIFIKASI:** `id_notifikasi` (PK, INT, AUTO_INCREMENT), `id_user` (FK to USERS, INT), `judul` (VARCHAR), `pesan` (TEXT), `tanggal` (DATETIME), `status_baca` (ENUM: 'belum_dibaca', 'sudah_dibaca').

---

## 7. Tech Stack Specifications

* **Front-End Layer:**
* **Framework utama:** Vue.js 3 (Menggunakan *Composition API* untuk reaktivitas komponen dashboard yang optimal).
* **CSS Framework:** Tailwind CSS (Untuk kustomisasi kelas UI responsif dan pemisahan layout mobile/desktop).
* **Bridge:** Inertia.js Vue Adapter (Mengatur *state client-side* tanpa halaman memuat ulang/SPA behavior).


* **Back-End Layer:**
* **Framework utama:** Laravel 11.x / Terbaru (Menggunakan PHP 8.x).
* **Autentikasi Keamanan:** Fitur *Session-Based Authentication* bawaan Laravel (Web guard) yang dilengkapi enkripsi password `bcrypt`.
* **Bridge:** Inertia.js Laravel Server Adapter.
* **Automation & Task:** Laravel Scheduler + Queue Driver (Database/Redis) untuk menangani *Cron-job* pengingat laporan bulanan.
* **Reporting Tools:** `Maatwebsite/Laravel-Excel` (Ekspor Excel) & `Barryvdh/Laravel-DomPDF` (Ekspor PDF laporan cetak).


* **Database & File Storage Layer:**
* **Database Engine:** MySQL 8.0+ (Menggunakan InnoDB Storage Engine untuk jaminan integritas *Foreign Key*).
* **File Storage Driver:** Laravel Filesystem S3 Driver (Dihubungkan ke AWS S3, MinIO, atau Supabase Storage melalui pengaturan `.env`).