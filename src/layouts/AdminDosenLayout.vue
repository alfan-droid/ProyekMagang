<template>
  <div class="min-h-screen bg-slate-50 flex">
    <!-- Sidebar (Desktop) -->
    <aside class="hidden md:flex flex-col w-64 bg-slate-900 text-white fixed h-full z-20">
      <div class="p-6 flex items-center gap-3">
        <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white">S</div>
        <span class="font-bold text-xl tracking-tight">SIMAGANG</span>
      </div>
      <div class="px-6 pb-4">
        <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Menu Utama</div>
      </div>
      <nav class="flex-1 px-3 space-y-1 overflow-y-auto">
        <router-link v-for="item in navItems" :key="item.path" :to="item.path"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          active-class="bg-blue-600 text-white hover:bg-blue-700">
          <component :is="item.icon" class="w-5 h-5" />
          <span class="font-medium text-sm">{{ item.label }}</span>
        </router-link>
      </nav>
      <div class="mt-auto border-t border-slate-800 p-4 flex items-center justify-between bg-slate-950">
        <!-- Sisi Kiri: Informasi Profil Dosen -->
        <div class="flex items-center gap-3">
          <div class="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
            {{ route.path.startsWith('/admin') ? 'AP' : 'AS' }}
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-medium text-white truncate max-w-[110px]">{{ route.path.startsWith('/admin') ? 'Admin Prodi' : 'Andi, S.Kom' }}</span>
            <span class="text-xs text-slate-400 truncate max-w-[110px]">{{ route.path.startsWith('/admin') ? 'Administrator' : 'Dosen Pembimbing' }}</span>
          </div>
        </div>

        <!-- Sisi Kanan: Tombol Logout Reaktif -->
        <button 
          @click="handleLogout"
          class="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
          title="Keluar dari Sistem"
        >
          <LogOutIcon class="h-5 w-5"/>
        </button>
      </div>
    </aside>

    <!-- Main Wrapper -->
    <div class="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
      <!-- Topbar -->
      <header class="bg-white shadow-sm h-16 flex items-center justify-between px-4 sticky top-0 z-10">
        <div class="flex items-center gap-4">
          <button class="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
            <MenuIcon class="w-6 h-6" />
          </button>
          <div class="relative hidden sm:block">
            <SearchIcon class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Cari data..." 
              class="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 bg-slate-50">
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button class="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
            <BellIcon class="w-5 h-5" />
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
import { 
  LayoutDashboardIcon, 
  UsersIcon, 
  FileCheckIcon, 
  SettingsIcon, 
  MenuIcon, 
  BellIcon, 
  SearchIcon,
  UserIcon,
  BriefcaseIcon,
  LogOutIcon
} from '@lucide/vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const handleLogout = () => {
  // Redirect ke halaman login
  router.push('/login')
}

// Simplification: showing both admin and dosen links for mockup
const navItems = computed(() => {
  if (route.path.startsWith('/admin')) {
    return [
      { path: '/admin/dashboard', label: 'Dashboard Utama', icon: LayoutDashboardIcon },
      { path: '/admin/pengguna', label: 'Kelola Pengguna', icon: UsersIcon },
      { path: '/admin/lowongan', label: 'Approval Lowongan', icon: BriefcaseIcon },
      { path: '/admin/alokasi', label: 'Alokasi Bimbingan', icon: FileCheckIcon },
      { path: '/admin/pengaturan', label: 'Pengaturan Prodi', icon: SettingsIcon },
    ]
  } else {
    return [
      { path: '/dosen/dashboard', label: 'Daftar Bimbingan', icon: UsersIcon },
      { path: '/dosen/review', label: 'Review Laporan', icon: FileCheckIcon },
    ]
  }
})
</script>
