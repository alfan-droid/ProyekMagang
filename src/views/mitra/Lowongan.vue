<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Manajemen Lowongan</h1>
        <p class="text-sm text-slate-500 mt-1">Kelola posisi magang yang ditawarkan oleh perusahaan Anda.</p>
      </div>
      <button class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-medium rounded-lg shadow-sm transition-colors text-sm">
        <PlusIcon class="w-4 h-4" />
        Tambah Lowongan
      </button>
    </div>

    <!-- Metrik Ringkasan (3 Kolom) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-fuchsia-50 flex items-center justify-center text-fuchsia-600 shrink-0">
          <BriefcaseIcon class="w-6 h-6" />
        </div>
        <div>
          <p class="text-sm font-medium text-slate-500">Total Posisi</p>
          <p class="text-2xl font-bold text-slate-800">{{ daftarLowongan.length }}</p>
        </div>
      </div>
      
      <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
          <CheckCircleIcon class="w-6 h-6" />
        </div>
        <div>
          <p class="text-sm font-medium text-slate-500">Posisi Aktif</p>
          <p class="text-2xl font-bold text-slate-800">{{ daftarLowongan.filter(l => l.IsActive).length }}</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
          <UsersIcon class="w-6 h-6" />
        </div>
        <div>
          <p class="text-sm font-medium text-slate-500">Total Pelamar</p>
          <p class="text-2xl font-bold text-slate-800">{{ totalPelamar }}</p>
        </div>
      </div>
    </div>

    <!-- Tabel Daftar Lowongan -->
    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div class="p-5 border-b border-slate-100">
        <h2 class="text-lg font-bold text-slate-800">Daftar Lowongan Tersedia</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <th class="px-6 py-4 font-bold border-b border-slate-200">Posisi Magang</th>
              <th class="px-6 py-4 font-bold border-b border-slate-200">Kuota</th>
              <th class="px-6 py-4 font-bold border-b border-slate-200">Pelamar</th>
              <th class="px-6 py-4 font-bold border-b border-slate-200">Tgl Dibuat</th>
              <th class="px-6 py-4 font-bold border-b border-slate-200">Status Prodi</th>
              <th class="px-6 py-4 font-bold border-b border-slate-200 text-center">Status Aktif</th>
              <th class="px-6 py-4 font-bold border-b border-slate-200 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="(lowongan, index) in daftarLowongan" :key="index" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4">
                <p class="font-bold text-slate-800">{{ lowongan.Posisi }}</p>
              </td>
              <td class="px-6 py-4">
                <span class="text-sm text-slate-600 font-medium">{{ lowongan.Kuota }} Orang</span>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700">
                  <UsersIcon class="w-3.5 h-3.5" />
                  {{ lowongan.Pelamar }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-slate-500">
                {{ lowongan.Tanggal }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <span class="inline-flex px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider" :class="getStatusClass(lowongan.StatusProdi)">
                    {{ lowongan.StatusProdi }}
                  </span>
                  <!-- Tooltip Info untuk Ditolak -->
                  <div v-if="lowongan.StatusProdi === 'ditolak'" class="relative group cursor-help">
                    <InfoIcon class="w-4 h-4 text-red-500" />
                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 text-center">
                      {{ lowongan.AlasanTolak }}
                      <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-center">
                <!-- Toggle Switch -->
                <button 
                  @click="toggleActive(index)"
                  :disabled="lowongan.StatusProdi !== 'disetujui'"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  :class="lowongan.IsActive ? 'bg-fuchsia-600' : 'bg-slate-200'"
                >
                  <span 
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                    :class="lowongan.IsActive ? 'translate-x-6' : 'translate-x-1'"
                  ></span>
                </button>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button class="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Lowongan">
                    <Edit3Icon class="w-4 h-4" />
                  </button>
                  <button class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus Lowongan">
                    <Trash2Icon class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- Empty State Fallback (Opsional, tapi praktik baik) -->
        <div v-if="daftarLowongan.length === 0" class="p-10 text-center">
          <AlertTriangleIcon class="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p class="text-slate-500 font-medium">Belum ada data lowongan magang.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { PlusIcon, BriefcaseIcon, UsersIcon, CheckCircleIcon, AlertTriangleIcon, Edit3Icon, Trash2Icon, InfoIcon } from '@lucide/vue'

// Mock Data Lowongan
const daftarLowongan = reactive([
  {
    Posisi: "Frontend Developer Intern",
    Kuota: 5,
    Pelamar: 3,
    Tanggal: "12 Juni 2026",
    StatusProdi: "disetujui",
    IsActive: true
  },
  {
    Posisi: "UI/UX Designer Intern",
    Kuota: 2,
    Pelamar: 0,
    Tanggal: "15 Juni 2026",
    StatusProdi: "menunggu",
    IsActive: false
  },
  {
    Posisi: "Data Analyst Intern",
    Kuota: 3,
    Pelamar: 4,
    Tanggal: "10 Juni 2026",
    StatusProdi: "ditolak",
    IsActive: false,
    AlasanTolak: "Kualifikasi IPK terlalu tinggi, minimal standar kampus adalah 3.00."
  }
])

const totalPelamar = computed(() => {
  return daftarLowongan.reduce((sum, item) => sum + item.Pelamar, 0)
})

const getStatusClass = (status) => {
  if (status === 'disetujui') return 'bg-emerald-100 text-emerald-700'
  if (status === 'ditolak') return 'bg-red-100 text-red-700'
  return 'bg-amber-100 text-amber-700' // menunggu
}

const toggleActive = (index) => {
  // Hanya bisa diaktifkan jika status dari prodi sudah disetujui
  if (daftarLowongan[index].StatusProdi === 'disetujui') {
    daftarLowongan[index].IsActive = !daftarLowongan[index].IsActive
  }
}
</script>
