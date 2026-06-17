<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-900 flex items-center gap-2">
        <SettingsIcon class="w-6 h-6 text-indigo-600" />
        Pengaturan Prodi
      </h1>
      <p class="mt-1 text-sm text-slate-500">
        Konfigurasi parameter akademik dan keamanan sistem untuk program magang.
      </p>
    </div>

    <!-- Alert / Pesan Notifikasi -->
    <div v-if="alertMsg" :class="['mb-6 p-4 rounded-md flex items-center gap-3', alertType === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700']">
      <ShieldAlertIcon v-if="alertType === 'error'" class="w-5 h-5" />
      <SettingsIcon v-else class="w-5 h-5" />
      <span>{{ alertMsg }}</span>
    </div>

    <!-- Formulir Pengaturan dengan Layout Grid 2 Kolom -->
    <form @submit.prevent="saveSettings" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Kartu Kiri: Parameter Akademik -->
      <div class="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
        <div class="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
          <GraduationCapIcon class="w-5 h-5 text-indigo-500" />
          <h2 class="text-lg font-semibold text-slate-800">Parameter Akademik</h2>
        </div>

        <div class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Minimal SKS Terpenuhi</label>
            <input 
              type="number" 
              v-model="configProdi.minSks"
              class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Minimal IPK Kumulatif</label>
            <input 
              type="number" 
              step="0.01"
              v-model="configProdi.minIpk"
              class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Kuota Bimbingan Default Dosen</label>
            <input 
              type="number" 
              v-model="configProdi.defaultDosenQuota"
              class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <!-- Kartu Kanan: Sistem & Keamanan (Stacked) -->
      <div class="space-y-6">
        
        <!-- Kartu Pengaturan Laporan -->
        <div class="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
          <div class="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
            <FileClockIcon class="w-5 h-5 text-indigo-500" />
            <h2 class="text-lg font-semibold text-slate-800">Sistem Laporan</h2>
          </div>

          <div class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Batas Waktu Laporan (Tanggal per Bulan)</label>
              <input 
                type="number" 
                v-model="configProdi.reportDeadlineDate"
                class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Batas Maksimal Ukuran File Unggahan</label>
              <input 
                type="text" 
                v-model="configProdi.maxFileSize"
                class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <!-- Kartu Keamanan Akun -->
        <div class="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
          <div class="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
            <ShieldAlertIcon class="w-5 h-5 text-indigo-500" />
            <h2 class="text-lg font-semibold text-slate-800">Keamanan Akun Admin</h2>
          </div>

          <div class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Kata Sandi Baru</label>
              <input 
                type="password" 
                v-model="adminPassword"
                placeholder="Biarkan kosong jika tidak diubah"
                class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Konfirmasi Kata Sandi Baru</label>
              <input 
                type="password" 
                v-model="adminPasswordConfirm"
                placeholder="Ulangi kata sandi baru untuk verifikasi"
                class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Tombol Aksi (Membentang Penuh 2 Kolom) -->
      <div class="lg:col-span-2 flex justify-end pt-4">
        <button 
          type="submit" 
          class="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
          <SaveIcon class="w-4 h-4" />
          Simpan Konfigurasi
        </button>
      </div>

    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  SettingsIcon, 
  GraduationCapIcon, 
  FileClockIcon, 
  ShieldAlertIcon, 
  SaveIcon 
} from '@lucide/vue'

// Objek Reaktif: Konfigurasi Prodi
const configProdi = ref({
  minSks: 100,
  minIpk: 3.00,
  defaultDosenQuota: 5,
  reportDeadlineDate: 10,
  maxFileSize: "10MB"
})

// State Reaktif: Pembaruan Kata Sandi
const adminPassword = ref('')
const adminPasswordConfirm = ref('')

// State Reaktif: Pesan Notifikasi
const alertMsg = ref('')
const alertType = ref('')

// Metode: Menyimpan Pengaturan
const saveSettings = () => {
  // Reset Notifikasi
  alertMsg.value = ''
  
  // Validasi Sederhana
  if (configProdi.value.minSks < 0) {
    alertType.value = 'error'
    alertMsg.value = 'Penyimpanan gagal: Minimal SKS tidak boleh berupa angka negatif.'
    return
  }

  if (configProdi.value.minIpk < 0 || configProdi.value.minIpk > 4.00) {
    alertType.value = 'error'
    alertMsg.value = 'Penyimpanan gagal: Nilai IPK tidak valid. Harap masukkan nilai dari 0.00 hingga 4.00.'
    return
  }

  if (configProdi.value.defaultDosenQuota <= 0) {
    alertType.value = 'error'
    alertMsg.value = 'Penyimpanan gagal: Kuota bimbingan dosen harus diisi dengan angka lebih besar dari 0.'
    return
  }
  
  if (configProdi.value.reportDeadlineDate <= 0 || configProdi.value.reportDeadlineDate > 31) {
    alertType.value = 'error'
    alertMsg.value = 'Penyimpanan gagal: Tanggal batas waktu laporan tidak valid.'
    return
  }

  // Validasi Kata Sandi Jika Diisi
  if (adminPassword.value) {
    if (adminPassword.value !== adminPasswordConfirm.value) {
      alertType.value = 'error'
      alertMsg.value = 'Penyimpanan gagal: Konfirmasi kata sandi tidak sesuai dengan kata sandi baru.'
      return
    }
  }

  // Aksi Saat Data Valid
  alertType.value = 'success'
  alertMsg.value = 'Konfigurasi parameter akademik prodi berhasil diperbarui secara global.'

  // Payload Data untuk Backend (Dicetak ke console)
  const payload = {
    ...configProdi.value,
    password_updated: !!adminPassword.value
  }

  console.log('Payload Konfigurasi Tersimpan:', payload)

  // Bersihkan input sandi
  adminPassword.value = ''
  adminPasswordConfirm.value = ''

  // Sembunyikan notifikasi setelah 5 detik
  setTimeout(() => {
    alertMsg.value = ''
  }, 5000)
}
</script>
