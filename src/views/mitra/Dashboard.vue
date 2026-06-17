<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Beranda Mitra</h1>
        <p class="text-sm text-slate-500">Ringkasan aktivitas rekrutmen dan magang.</p>
      </div>
      <button class="hidden md:flex items-center gap-2 px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-lg font-medium transition-colors">
        <PlusIcon class="w-4 h-4" />
        Buat Lowongan
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="(stat, idx) in stats" :key="idx" class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm relative overflow-hidden">
        <div class="relative z-10">
          <p class="text-sm font-medium text-slate-500 mb-1">{{ stat.label }}</p>
          <p class="text-2xl font-bold text-slate-800">{{ stat.value }}</p>
        </div>
        <div :class="['absolute right-0 bottom-0 opacity-10 transform translate-x-2 translate-y-2', stat.color]">
          <component :is="stat.icon" class="w-16 h-16" />
        </div>
      </div>
    </div>

    <!-- Applicant Review Queue -->
    <div>
      <h2 class="text-lg font-bold text-slate-800 mb-4">Pendaftar Baru Perlu Diseleksi</h2>
      <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm whitespace-nowrap">
            <thead class="bg-slate-50 border-b border-slate-100 text-slate-600">
              <tr>
                <th class="px-4 py-3 font-medium">Pelamar</th>
                <th class="px-4 py-3 font-medium">Posisi</th>
                <th class="px-4 py-3 font-medium">Tanggal</th>
                <th class="px-4 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="i in 3" :key="i" class="hover:bg-slate-50 transition-colors">
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-fuchsia-100 text-fuchsia-700 flex items-center justify-center font-bold text-xs">
                      B
                    </div>
                    <div>
                      <p class="font-medium text-slate-800">Budi Santoso</p>
                      <p class="text-xs text-slate-500">Universitas AMIKOM Yogyakarta</p>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-slate-600">Frontend Developer Intern</td>
                <td class="px-4 py-3 text-slate-500 text-xs">12 Jun 2026</td>
                <td class="px-4 py-3">
                  <button class="px-3 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-600 hover:text-fuchsia-600 hover:border-fuchsia-200 transition-colors">
                    Detail Lamaran
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PlusIcon, BriefcaseIcon, UsersIcon, CheckCircleIcon, FileTextIcon } from '@lucide/vue'

const stats = [
  { label: 'Lowongan Aktif', value: '4', icon: BriefcaseIcon, color: 'text-blue-500' },
  { label: 'Total Pelamar', value: '42', icon: UsersIcon, color: 'text-fuchsia-500' },
  { label: 'Diterima', value: '12', icon: CheckCircleIcon, color: 'text-green-500' },
  { label: 'Laporan Masuk', value: '8', icon: FileTextIcon, color: 'text-amber-500' },
]
</script>
