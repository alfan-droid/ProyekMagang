<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Profil Mahasiswa</h1>
        <p class="text-sm text-slate-500 mt-1">Kelola biodata, dokumen akademik, dan kata sandi Anda.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Biodata Pribadi & Akademik (2 Kolom) -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div class="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2">
              <UserIcon class="w-5 h-5 text-blue-600" />
              Biodata & Informasi Akademik
            </h2>
          </div>
          
          <div class="p-6">
            <form @submit.prevent="saveProfile" class="space-y-6">
              <!-- General Alert -->
              <div v-if="profileSuccessMsg" class="p-3 bg-green-50 text-green-700 border border-green-100 rounded-lg text-sm">
                {{ profileSuccessMsg }}
              </div>
              <div v-if="profileErrorMsg" class="p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm">
                {{ profileErrorMsg }}
              </div>

              <!-- Grid Form -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Nama -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                  <input type="text" v-model="userProfile.nama"
                    class="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" />
                </div>
                
                <!-- Email -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Email Students</label>
                  <input type="email" v-model="userProfile.email"
                    class="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" />
                </div>

                <!-- NIM (Readonly) -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">NIM</label>
                  <input type="text" :value="userProfile.nim" readonly disabled
                    class="block w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 sm:text-sm cursor-not-allowed" />
                </div>

                <!-- Prodi (Readonly) -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Program Studi</label>
                  <input type="text" :value="userProfile.prodi" readonly disabled
                    class="block w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 sm:text-sm cursor-not-allowed" />
                </div>

                <!-- Angkatan & Semester (Readonly) -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Angkatan</label>
                    <input type="text" :value="userProfile.angkatan" readonly disabled
                      class="block w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 sm:text-sm cursor-not-allowed text-center" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Semester</label>
                    <input type="text" :value="userProfile.semester" readonly disabled
                      class="block w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 sm:text-sm cursor-not-allowed text-center" />
                  </div>
                </div>

                <!-- IPK (Readonly) -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">IPK Terakhir</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BookOpenIcon class="h-4 w-4 text-slate-400" />
                    </div>
                    <input type="text" :value="userProfile.ipk" readonly disabled
                      class="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 sm:text-sm cursor-not-allowed" />
                  </div>
                </div>

                <!-- No Telp -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Nomor Telepon</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PhoneIcon class="h-4 w-4 text-slate-400" />
                    </div>
                    <input type="text" v-model="userProfile.noTelp"
                      :class="[
                        'block w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors',
                        profileErrorMsg && !userProfile.noTelp ? 'border-red-500' : 'border-slate-300'
                      ]" />
                  </div>
                </div>

                <!-- Alamat -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-slate-700 mb-1">Alamat Tinggal / Domisili</label>
                  <div class="relative">
                    <div class="absolute top-2.5 left-3 pointer-events-none">
                      <MapPinIcon class="h-4 w-4 text-slate-400" />
                    </div>
                    <textarea v-model="userProfile.alamat" rows="2"
                      :class="[
                        'block w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors',
                        profileErrorMsg && !userProfile.alamat ? 'border-red-500' : 'border-slate-300'
                      ]"></textarea>
                  </div>
                </div>
              </div>

              <div class="pt-2 flex justify-end">
                <button type="submit" class="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors text-sm">
                  <SaveIcon class="w-4 h-4" />
                  Simpan Perubahan Biodata
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Manajemen Berkas & Sandi (1 Kolom) -->
      <div class="lg:col-span-1 space-y-6">
        
        <!-- Dokumen Akademik -->
        <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div class="p-5 border-b border-slate-100">
            <h2 class="text-base font-bold text-slate-800 flex items-center gap-2">
              <FileUpIcon class="w-5 h-5 text-indigo-600" />
              Dokumen Akademik
            </h2>
          </div>
          <div class="p-5 space-y-4">
            <!-- CV -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Curriculum Vitae (CV)</label>
              <div class="flex items-center gap-3">
                <label class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs font-medium cursor-pointer transition-colors border border-slate-200">
                  <span>Pilih File</span>
                  <input type="file" class="sr-only" accept=".pdf" @change="(e) => handleFileUpload(e, 'cv')">
                </label>
                <span class="text-xs truncate text-slate-500 font-medium" :title="cvFile">{{ cvFile || 'Belum ada file terpilih' }}</span>
              </div>
            </div>

            <!-- Transkrip -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Transkrip Nilai Terakhir</label>
              <div class="flex items-center gap-3">
                <label class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs font-medium cursor-pointer transition-colors border border-slate-200">
                  <span>Pilih File</span>
                  <input type="file" class="sr-only" accept=".pdf" @change="(e) => handleFileUpload(e, 'transkrip')">
                </label>
                <span class="text-xs truncate text-slate-500 font-medium" :title="transkripFile">{{ transkripFile || 'Belum ada file terpilih' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Ubah Kata Sandi -->
        <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div class="p-5 border-b border-slate-100">
            <h2 class="text-base font-bold text-slate-800 flex items-center gap-2">
              <LockIcon class="w-5 h-5 text-amber-600" />
              Keamanan Akun
            </h2>
          </div>
          <div class="p-5">
            <form @submit.prevent="updatePassword" class="space-y-4">
              <div v-if="passwordSuccessMsg" class="p-2 bg-green-50 text-green-700 border border-green-100 rounded-lg text-xs">
                {{ passwordSuccessMsg }}
              </div>
              <div v-if="passwordErrorMsg" class="p-2 bg-red-50 text-red-600 border border-red-100 rounded-lg text-xs">
                {{ passwordErrorMsg }}
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-700 mb-1">Sandi Lama</label>
                <input type="password" v-model="passwordForm.old"
                  class="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" />
              </div>
              
              <div>
                <label class="block text-xs font-medium text-slate-700 mb-1">Sandi Baru</label>
                <input type="password" v-model="passwordForm.new"
                  :class="[
                    'block w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors',
                    passwordErrorMsg && passwordForm.new !== passwordForm.confirm ? 'border-red-500' : 'border-slate-300'
                  ]" />
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-700 mb-1">Konfirmasi Sandi Baru</label>
                <input type="password" v-model="passwordForm.confirm"
                  :class="[
                    'block w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors',
                    passwordErrorMsg && passwordForm.new !== passwordForm.confirm ? 'border-red-500' : 'border-slate-300'
                  ]" />
              </div>

              <div class="pt-2">
                <button type="submit" class="w-full inline-flex justify-center items-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-lg shadow-sm transition-colors text-sm">
                  Perbarui Sandi
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
import { reactive, ref } from 'vue'
import { UserIcon, BookOpenIcon, PhoneIcon, MapPinIcon, FileUpIcon, LockIcon, SaveIcon } from '@lucide/vue'

// 1. Mock Data Biodata
const userProfile = reactive({
  nama: 'Budi Santoso',
  nim: '23.11.5438',
  prodi: 'Informatika',
  angkatan: 2023,
  semester: 6,
  ipk: 3.42,
  email: 'budi.s@students.amikom.ac.id',
  noTelp: '081222224444',
  alamat: 'Yogyakarta'
})

// States untuk Biodata Validation
const profileErrorMsg = ref('')
const profileSuccessMsg = ref('')

// 2. Mock Data Sandi
const passwordForm = reactive({
  old: '',
  new: '',
  confirm: ''
})

const passwordErrorMsg = ref('')
const passwordSuccessMsg = ref('')

// 3. States untuk Berkas (File Upload)
const cvFile = ref('')
const transkripFile = ref('')

// Handler: Simpan Perubahan Biodata
const saveProfile = () => {
  profileErrorMsg.value = ''
  profileSuccessMsg.value = ''

  if (!userProfile.noTelp.trim() || !userProfile.alamat.trim()) {
    profileErrorMsg.value = 'Nomor telepon dan alamat tidak boleh kosong.'
    return
  }

  // Jika lolos validasi
  console.log('[Frontend-First] Profil diperbarui:', userProfile)
  profileSuccessMsg.value = 'Perubahan biodata berhasil disimpan secara lokal.'
  
  // Hilangkan pesan sukses setelah 3 detik
  setTimeout(() => {
    profileSuccessMsg.value = ''
  }, 3000)
}

// Handler: Perbarui Sandi
const updatePassword = () => {
  passwordErrorMsg.value = ''
  passwordSuccessMsg.value = ''

  if (!passwordForm.old || !passwordForm.new || !passwordForm.confirm) {
    passwordErrorMsg.value = 'Harap isi semua field kata sandi.'
    return
  }

  if (passwordForm.new !== passwordForm.confirm) {
    passwordErrorMsg.value = 'Kata sandi baru dan konfirmasi tidak cocok.'
    return
  }

  if (passwordForm.new.length < 6) {
    passwordErrorMsg.value = 'Kata sandi baru minimal 6 karakter.'
    return
  }

  console.log('[Frontend-First] Kata sandi diubah:', passwordForm.new)
  passwordSuccessMsg.value = 'Kata sandi berhasil diperbarui.'
  
  // Reset form
  passwordForm.old = ''
  passwordForm.new = ''
  passwordForm.confirm = ''

  setTimeout(() => {
    passwordSuccessMsg.value = ''
  }, 3000)
}

// Handler: Tangkap file secara lokal
const handleFileUpload = (event, type) => {
  const file = event.target.files[0]
  if (file) {
    if (type === 'cv') {
      cvFile.value = file.name
      console.log('CV Diunggah:', file.name)
    } else if (type === 'transkrip') {
      transkripFile.value = file.name
      console.log('Transkrip Diunggah:', file.name)
    }
  }
}
</script>
