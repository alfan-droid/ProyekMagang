import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    meta: { layout: 'AuthLayout' }
  },
  {
    path: '/register/mahasiswa',
    name: 'RegisterMahasiswa',
    component: () => import('@/views/auth/RegisterMahasiswa.vue'),
    meta: { layout: 'AuthLayout' }
  },
  {
    path: '/register/mitra',
    name: 'RegisterMitra',
    component: () => import('@/views/auth/RegisterMitra.vue'),
    meta: { layout: 'AuthLayout' }
  },
  {
    path: '/mahasiswa/dashboard',
    name: 'MahasiswaDashboard',
    component: () => import('@/views/mahasiswa/Dashboard.vue'),
    meta: { layout: 'MahasiswaLayout' }
  },
  {
    path: '/mahasiswa/lowongan',
    name: 'MahasiswaLowongan',
    component: () => import('@/views/mahasiswa/Lowongan.vue'),
    meta: { layout: 'MahasiswaLayout' }
  },
  {
    path: '/mahasiswa/laporan',
    name: 'MahasiswaLaporan',
    component: () => import('@/views/mahasiswa/Laporan.vue'),
    meta: { layout: 'MahasiswaLayout' }
  },
  {
    path: '/mahasiswa/profil',
    name: 'MahasiswaProfil',
    component: () => import('@/views/mahasiswa/Profil.vue'),
    meta: { layout: 'MahasiswaLayout' }
  },
  {
    path: '/mitra/dashboard',
    name: 'MitraDashboard',
    component: () => import('@/views/mitra/Dashboard.vue'),
    meta: { layout: 'MitraLayout' }
  },
  {
    path: '/mitra/lowongan',
    name: 'MitraLowongan',
    component: () => import('@/views/mitra/Lowongan.vue'),
    meta: { layout: 'MitraLayout' }
  },
  {
    path: '/mitra/pelamar',
    name: 'MitraPelamar',
    component: () => import('@/views/mitra/Pelamar.vue'),
    meta: { layout: 'MitraLayout' }
  },
  {
    path: '/mitra/evaluasi',
    name: 'MitraEvaluasi',
    component: () => import('@/views/mitra/Evaluasi.vue'),
    meta: { layout: 'MitraLayout' }
  },
  {
    path: '/dosen/dashboard',
    name: 'DosenDashboard',
    component: () => import('@/views/dosen/Dashboard.vue'),
    meta: { layout: 'AdminDosenLayout' }
  },
  {
    path: '/dosen/review',
    name: 'DosenReview',
    component: () => import('@/views/dosen/Review.vue'),
    meta: { layout: 'AdminDosenLayout' }
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('@/views/admin/Dashboard.vue'),
    meta: { layout: 'AdminDosenLayout' }
  },
  {
    path: '/admin/lowongan',
    name: 'AdminLowongan',
    component: () => import('@/views/admin/Lowongan.vue'),
    meta: { layout: 'AdminDosenLayout' }
  },
  {
    path: '/admin/pengguna',
    name: 'AdminPengguna',
    component: () => import('@/views/admin/Pengguna.vue'),
    meta: { layout: 'AdminDosenLayout' }
  },
  {
    path: '/admin/alokasi',
    name: 'AdminAlokasi',
    component: () => import('@/views/admin/Alokasi.vue'),
    meta: { layout: 'AdminDosenLayout' }
  },
  {
    path: '/admin/pengaturan',
    name: 'AdminPengaturan',
    component: () => import('@/views/admin/Pengaturan.vue'),
    meta: { layout: 'AdminDosenLayout' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
