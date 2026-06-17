<template>
  <div class="min-h-screen bg-slate-50 pb-16 md:pb-0">
    <!-- Header (Mobile) -->
    <header class="bg-white shadow-sm sticky top-0 z-30 md:hidden">
      <div class="w-full px-4 h-14 flex items-center justify-between">
        <span class="font-bold text-primary-600">SIMAGANG</span>
        <div class="flex items-center gap-2">
          <button class="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <BellIcon class="w-5 h-5" />
          </button>
          <button @click="handleLogout" class="p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors" title="Keluar">
            <LogOutIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>

    <!-- Header (Desktop) -->
    <nav class="hidden md:block sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <span class="font-bold text-primary-600 text-xl">SIMAGANG</span>
        <div class="flex items-center gap-6">
          <router-link v-for="item in navItems" :key="item.path" :to="item.path"
            class="text-slate-600 hover:text-primary-600 font-medium transition-colors"
            active-class="text-primary-600">
            {{ item.label }}
          </router-link>
        </div>
        <div class="flex items-center gap-4">
          <button class="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <BellIcon class="w-5 h-5" />
          </button>
          <div class="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
            M
          </div>
          <div class="w-px h-6 bg-slate-200 mx-1"></div>
          <button @click="handleLogout" class="p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors" title="Keluar">
            <LogOutIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)] w-full">
      <slot></slot>
    </main>

    <!-- Bottom Navigation (Mobile) -->
    <nav class="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 flex justify-around items-center h-16 z-40 pb-safe">
      <router-link v-for="item in navItems" :key="item.path" :to="item.path"
        class="flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-primary-600 transition-colors"
        active-class="text-primary-600 font-medium">
        <component :is="item.icon" class="w-6 h-6 mb-1" />
        <span class="text-[10px]">{{ item.label }}</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { HomeIcon, BriefcaseIcon, FileTextIcon, UserIcon, BellIcon, LogOutIcon } from '@lucide/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  localStorage.clear()
  router.push('/login')
}

const navItems = [
  { path: '/mahasiswa/dashboard', label: 'Beranda', icon: HomeIcon },
  { path: '/mahasiswa/lowongan', label: 'Lowongan', icon: BriefcaseIcon },
  { path: '/mahasiswa/laporan', label: 'Laporan', icon: FileTextIcon },
  { path: '/mahasiswa/profil', label: 'Profil', icon: UserIcon },
]
</script>

<style scoped>
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
