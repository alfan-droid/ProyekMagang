<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Dashboard Prodi</h1>
        <p class="text-sm text-slate-500">Monitoring global program magang MBKM/Mandiri.</p>
      </div>
      <button class="flex items-center gap-2 px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition-colors shadow-sm text-sm">
        <DownloadIcon class="w-4 h-4" />
        Ekspor Rekap
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="(stat, idx) in stats" :key="idx" class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
        <div :class="['w-12 h-12 rounded-xl flex items-center justify-center', stat.bgColor, stat.textColor]">
          <component :is="stat.icon" class="w-6 h-6" />
        </div>
        <div>
          <p class="text-sm font-medium text-slate-500">{{ stat.label }}</p>
          <p class="text-2xl font-bold text-slate-800">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 class="font-bold text-lg text-slate-800 mb-4">Persetujuan Lowongan Baru</h3>
        <div class="space-y-3">
          <div v-for="i in 2" :key="i" class="flex items-center justify-between p-3 border border-slate-100 bg-slate-50 rounded-xl">
            <div>
              <p class="font-medium text-slate-800 text-sm">Backend Developer</p>
              <p class="text-xs text-slate-500">PT. Startup Inovasi</p>
            </div>
            <div class="flex gap-2">
              <button class="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"><XIcon class="w-4 h-4"/></button>
              <button class="p-1.5 text-green-600 hover:bg-green-100 rounded-lg transition-colors"><CheckIcon class="w-4 h-4"/></button>
            </div>
          </div>
        </div>
        <router-link to="/admin/lowongan" class="mt-4 inline-block text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
          Lihat Semua Antrean &rarr;
        </router-link>
      </div>

      <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 class="font-bold text-lg text-slate-800 mb-4">Alokasi Pembimbing Tertunda</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 border border-slate-100 bg-slate-50 rounded-xl">
            <div>
              <p class="font-medium text-slate-800 text-sm">Budi Santoso (23.11.5438)</p>
              <p class="text-xs text-slate-500">Diterima di PT Teknologi Cendana</p>
            </div>
            <router-link to="/admin/alokasi" class="text-xs font-medium bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors">
              Pilih Dosen
            </router-link>
          </div>
        </div>
        <router-link to="/admin/alokasi" class="mt-4 inline-block text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
          Lihat Semua Antrean &rarr;
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UsersIcon, Building2Icon, BriefcaseIcon, FileCheckIcon, DownloadIcon, CheckIcon, XIcon } from '@lucide/vue'

const stats = [
  { label: 'Mahasiswa Magang', value: '145', icon: UsersIcon, bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
  { label: 'Mitra Aktif', value: '32', icon: Building2Icon, bgColor: 'bg-fuchsia-50', textColor: 'text-fuchsia-600' },
  { label: 'Lowongan Tersedia', value: '89', icon: BriefcaseIcon, bgColor: 'bg-green-50', textColor: 'text-green-600' },
  { label: 'Laporan Selesai', value: '412', icon: FileCheckIcon, bgColor: 'bg-amber-50', textColor: 'text-amber-600' },
]
</script>
