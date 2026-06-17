<template>
  <div class="space-y-6">
    <!-- Welcome Banner -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
      <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      <div class="relative z-10">
        <h1 class="text-2xl font-bold mb-1">Halo, Budi Santoso 👋</h1>
        <p class="text-blue-100 text-sm">Semester 6 • Teknik Informatika</p>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between h-24 relative overflow-hidden">
        <div class="absolute right-0 bottom-0 text-slate-50 opacity-50 transform translate-x-4 translate-y-4">
          <BriefcaseIcon class="w-20 h-20" />
        </div>
        <span class="text-slate-500 text-xs font-medium">Lamaran Terkirim</span>
        <span class="text-3xl font-bold text-slate-800">3</span>
      </div>
      <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between h-24 relative overflow-hidden">
        <div class="absolute right-0 bottom-0 text-amber-50 opacity-50 transform translate-x-4 translate-y-4">
          <ClockIcon class="w-20 h-20 text-amber-100" />
        </div>
        <span class="text-slate-500 text-xs font-medium">Status Saat Ini</span>
        <span class="text-lg font-bold text-amber-500">Menunggu</span>
      </div>
    </div>

    <!-- Active Applications -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold text-slate-800">Lamaran Aktif</h2>
        <a href="#" class="text-sm font-medium text-blue-600">Lihat Semua</a>
      </div>
      <div class="space-y-3">
        <div v-for="i in 2" :key="i" class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex gap-4 items-center">
          <div class="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <Building2Icon class="w-6 h-6 text-slate-400" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-slate-800 truncate">Frontend Developer Intern</h3>
            <p class="text-xs text-slate-500 truncate">PT Teknologi Cendana • Jakarta</p>
          </div>
          <div class="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            Seleksi
          </div>
        </div>
      </div>
    </div>

    <!-- Timeline / Activity -->
    <div>
      <h2 class="text-lg font-bold text-slate-800 mb-4">Aktivitas Terbaru</h2>
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <div class="relative border-l-2 border-slate-100 ml-3 space-y-6">
          <div class="relative pl-6">
            <div class="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
            <p class="text-sm font-medium text-slate-800">Mengirim lamaran</p>
            <p class="text-xs text-slate-500 mt-0.5">Frontend Developer di PT Teknologi Cendana</p>
            <p class="text-xs text-slate-400 mt-1">2 jam yang lalu</p>
          </div>
          <div class="relative pl-6">
            <div class="absolute w-3 h-3 bg-slate-300 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
            <p class="text-sm font-medium text-slate-800">Melengkapi Profil</p>
            <p class="text-xs text-slate-500 mt-0.5">Berhasil mengunggah CV terbaru dan Transkrip Nilai.</p>
            <p class="text-xs text-slate-400 mt-1">1 hari yang lalu</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BriefcaseIcon, ClockIcon, Building2Icon } from '@lucide/vue'
</script>
