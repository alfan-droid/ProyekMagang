<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Laporan Bulanan</h1>
        <p class="text-sm text-slate-500 mt-1">Dokumentasikan progres kegiatan dan bimbingan magang Anda di sini.</p>
      </div>
    </div>

    <!-- Progres Bimbingan Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
        <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
          <UserIcon class="w-5 h-5" />
        </div>
        <div>
          <p class="text-xs font-medium text-slate-500">Dosen Pembimbing</p>
          <p class="font-bold text-slate-800 truncate text-sm">Andi, S.Kom</p>
        </div>
      </div>
      <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
        <div class="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
          <CheckCircle2Icon class="w-5 h-5" />
        </div>
        <div>
          <p class="text-xs font-medium text-slate-500">Laporan Disetujui</p>
          <p class="font-bold text-slate-800 text-sm">2 Bulan</p>
        </div>
      </div>
      <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
        <div class="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
          <FileTextIcon class="w-5 h-5" />
        </div>
        <div>
          <p class="text-xs font-medium text-slate-500">Menunggu Review</p>
          <p class="font-bold text-slate-800 text-sm">1 Bulan</p>
        </div>
      </div>
      <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
        <div class="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
          <AlertCircleIcon class="w-5 h-5" />
        </div>
        <div>
          <p class="text-xs font-medium text-slate-500">Perlu Revisi</p>
          <p class="font-bold text-slate-800 text-sm">0 Bulan</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Month Selector (Sidebar/Top horizontal on mobile) -->
      <div class="lg:col-span-1">
        <div class="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h2 class="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">Pilih Bulan</h2>
          <div class="grid grid-cols-3 lg:grid-cols-1 gap-3">
            <button
              v-for="laporan in laporanBulan"
              :key="laporan.bulan"
              @click="bulanAktif = laporan.bulan"
              :class="[
                'flex flex-col lg:flex-row items-center lg:justify-between p-3 rounded-xl border-2 transition-all duration-200 w-full text-left',
                bulanAktif === laporan.bulan ? 'shadow-md border-blue-500 bg-blue-50/50' : 'border-transparent bg-slate-50 hover:bg-slate-100',
                getStatusBorderColor(laporan.status, bulanAktif === laporan.bulan)
              ]"
            >
              <span class="font-bold text-sm" :class="bulanAktif === laporan.bulan ? 'text-blue-700' : 'text-slate-700'">
                Bulan {{ laporan.bulan }}
              </span>
              <!-- Status Indicator -->
              <span class="mt-2 lg:mt-0 w-3 h-3 rounded-full" :class="getStatusIndicatorClass(laporan.status)"></span>
            </button>
          </div>
        </div>
      </div>

      <!-- Form Area -->
      <div class="lg:col-span-3">
        <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div class="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 class="text-xl font-bold text-slate-800">Laporan Aktivitas Bulan {{ bulanAktif }}</h2>
            <span class="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full" :class="getStatusBadgeClass(laporanAktif.status)">
              {{ formatStatusText(laporanAktif.status) }}
            </span>
          </div>

          <!-- Notification Banner for Locked Form -->
          <div v-if="isLocked" class="bg-blue-50 border-b border-blue-100 p-4 flex items-start gap-3">
            <AlertCircleIcon class="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p class="text-sm text-blue-800">
              Laporan sedang dikunci karena dalam proses review atau telah disetujui. Anda tidak dapat mengubah data pada bulan ini.
            </p>
          </div>
          
          <!-- Revision Note Banner -->
          <div v-if="laporanAktif.status === 'revisi' && laporanAktif.catatan_revisi" class="bg-red-50 border-b border-red-100 p-4 flex items-start gap-3">
            <AlertCircleIcon class="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p class="text-sm font-bold text-red-800 mb-1">Catatan Revisi dari Pembimbing/Mitra:</p>
              <p class="text-sm text-red-700">{{ laporanAktif.catatan_revisi }}</p>
            </div>
          </div>

          <div class="p-6">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- General Error / Success Message -->
              <div v-if="successMsg" class="p-3 bg-green-50 text-green-700 border border-green-100 rounded-lg text-sm flex items-center gap-2">
                <CheckCircle2Icon class="w-4 h-4" /> {{ successMsg }}
              </div>
              <div v-if="errorMsg" class="p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm flex items-center gap-2">
                <AlertCircleIcon class="w-4 h-4" /> {{ errorMsg }}
              </div>

              <!-- Deskripsi Aktivitas -->
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Deskripsi Kegiatan Bulanan</label>
                <textarea 
                  v-model="formData.deskripsi" 
                  :disabled="isLocked"
                  rows="4" 
                  placeholder="Ceritakan progres, tugas yang diselesaikan, dan capaian Anda bulan ini..."
                  class="block w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors disabled:bg-slate-50 disabled:text-slate-500"
                ></textarea>
              </div>

              <!-- Kendala -->
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Kendala yang Dihadapi (Opsional)</label>
                <textarea 
                  v-model="formData.kendala" 
                  :disabled="isLocked"
                  rows="3" 
                  placeholder="Apakah ada kesulitan atau hambatan yang terjadi?"
                  class="block w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors disabled:bg-slate-50 disabled:text-slate-500"
                ></textarea>
              </div>

              <!-- File Upload -->
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Dokumen Pendukung (Logbook / Dokumentasi)</label>
                <div 
                  class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl"
                  :class="isLocked ? 'bg-slate-50 cursor-not-allowed' : 'hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer'"
                >
                  <div class="space-y-1 text-center">
                    <FileTextIcon class="mx-auto h-12 w-12 text-slate-400" />
                    <div class="flex text-sm text-slate-600 justify-center">
                      <label 
                        class="relative rounded-md font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        :class="isLocked ? 'cursor-not-allowed' : 'cursor-pointer hover:text-blue-500'"
                      >
                        <span v-if="formData.file_name">{{ formData.file_name }}</span>
                        <span v-else>Unggah file PDF</span>
                        <input type="file" class="sr-only" :disabled="isLocked" accept=".pdf" @change="handleFileUpload">
                      </label>
                      <p v-if="!formData.file_name" class="pl-1">atau drag and drop</p>
                    </div>
                    <p class="text-xs text-slate-500">PDF, maksimal 5MB</p>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div v-if="!isLocked" class="pt-4 flex justify-end">
                <button 
                  type="submit" 
                  class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Kirim Laporan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { UserIcon, CheckCircle2Icon, FileTextIcon, AlertCircleIcon } from '@lucide/vue'

// 1. Array Reaktif Laporan 6 Bulan
const laporanBulan = reactive([
  { bulan: 1, status: 'disetujui', deskripsi: 'Melakukan onboarding, instalasi environment, dan memahami struktur repository.', kendala: 'Tidak ada.', file_name: 'logbook_bulan_1.pdf', catatan_revisi: '' },
  { bulan: 2, status: 'disetujui', deskripsi: 'Membangun UI awal untuk modul autentikasi.', kendala: 'Sedikit kendala saat penyesuaian tailwind config, tapi sudah teratasi.', file_name: 'logbook_bulan_2.pdf', catatan_revisi: '' },
  { bulan: 3, status: 'menunggu_mitra', deskripsi: 'Mengintegrasikan API login ke dalam state frontend.', kendala: 'Menunggu dokumentasi API yang sempat delay 2 hari.', file_name: 'logbook_bulan_3.pdf', catatan_revisi: '' },
  { bulan: 4, status: 'revisi', deskripsi: 'Mengerjakan fitur pelaporan bulanan.', kendala: 'Desain kurang sesuai dengan PRD.', file_name: 'draft_bulan_4.pdf', catatan_revisi: 'Mohon perbaiki bagian validasi agar sesuai dengan format yang kami minta di PRD.' },
  { bulan: 5, status: 'belum_mulai', deskripsi: '', kendala: '', file_name: '', catatan_revisi: '' },
  { bulan: 6, status: 'belum_mulai', deskripsi: '', kendala: '', file_name: '', catatan_revisi: '' }
])

// 2. State Bulan Aktif
const bulanAktif = ref(3)

// Form Data yang sedang diedit
const formData = reactive({
  deskripsi: '',
  kendala: '',
  file_name: ''
})

// UI State untuk Alert
const successMsg = ref('')
const errorMsg = ref('')

// Computed Property untuk mengambil data bulan yang sedang aktif
const laporanAktif = computed(() => {
  return laporanBulan.find(l => l.bulan === bulanAktif.value)
})

// 3. Watcher untuk memperbarui form otomatis jika bulan berganti
watch(bulanAktif, (newBulan) => {
  const current = laporanBulan.find(l => l.bulan === newBulan)
  if (current) {
    formData.deskripsi = current.deskripsi
    formData.kendala = current.kendala
    formData.file_name = current.file_name
  }
  // Reset alert
  successMsg.value = ''
  errorMsg.value = ''
}, { immediate: true })

// Logika Kunci Form (Read-Only Guard)
const isLocked = computed(() => {
  return laporanAktif.value.status === 'disetujui' || laporanAktif.value.status === 'menunggu_mitra'
})

// Simulasi upload file
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    formData.file_name = file.name
  }
}

// Client-Side Validation & Submission
const handleSubmit = () => {
  errorMsg.value = ''
  successMsg.value = ''

  if (!formData.deskripsi.trim()) {
    errorMsg.value = 'Deskripsi kegiatan tidak boleh kosong.'
    return
  }

  // Jika lolos validasi, perbarui array master lokal
  const index = laporanBulan.findIndex(l => l.bulan === bulanAktif.value)
  if (index !== -1) {
    laporanBulan[index].deskripsi = formData.deskripsi
    laporanBulan[index].kendala = formData.kendala
    laporanBulan[index].file_name = formData.file_name
    laporanBulan[index].status = 'menunggu_mitra' // Ubah status secara reaktif
  }

  console.log(`[Frontend-First] Payload Laporan Bulan ${bulanAktif.value}:`, {
    bulan: bulanAktif.value,
    deskripsi: formData.deskripsi,
    kendala: formData.kendala,
    file_name: formData.file_name
  })

  successMsg.value = `Laporan bulan ${bulanAktif.value} berhasil disubmit dan sedang menunggu review mitra.`
}

// === Utility CSS Classes for UI ===
const getStatusIndicatorClass = (status) => {
  if (status === 'disetujui') return 'bg-green-500'
  if (status === 'revisi') return 'bg-red-500'
  if (status === 'menunggu_mitra') return 'bg-amber-500'
  return 'bg-slate-300'
}

const getStatusBorderColor = (status, isActive) => {
  if (!isActive) return ''
  if (status === 'disetujui') return '!border-green-500 !bg-green-50'
  if (status === 'revisi') return '!border-red-500 !bg-red-50'
  if (status === 'menunggu_mitra') return '!border-amber-500 !bg-amber-50'
  return '!border-blue-500'
}

const getStatusBadgeClass = (status) => {
  if (status === 'disetujui') return 'bg-green-100 text-green-700'
  if (status === 'revisi') return 'bg-red-100 text-red-700'
  if (status === 'menunggu_mitra') return 'bg-amber-100 text-amber-700'
  return 'bg-slate-100 text-slate-600'
}

const formatStatusText = (status) => {
  if (status === 'disetujui') return 'Disetujui'
  if (status === 'revisi') return 'Revisi'
  if (status === 'menunggu_mitra') return 'Menunggu Review'
  return 'Belum Mulai'
}
</script>
