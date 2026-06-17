<template>
  <div>
    <h2 class="text-xl font-semibold text-slate-800 mb-6 text-center">Masuk ke Akun Anda</h2>
    
    <!-- Tab Switcher -->
    <div class="flex mb-6 bg-slate-100 p-1 rounded-lg">
      <button 
        type="button"
        @click="activeTab = 'akademik'"
        :class="['flex-1 py-2 text-sm font-medium rounded-md transition-colors', activeTab === 'akademik' ? 'bg-white text-primary-600 shadow' : 'text-slate-500 hover:text-slate-700']"
      >
        Akademik Kampus
      </button>
      <button 
        type="button"
        @click="activeTab = 'mitra'"
        :class="['flex-1 py-2 text-sm font-medium rounded-md transition-colors', activeTab === 'mitra' ? 'bg-white text-primary-600 shadow' : 'text-slate-500 hover:text-slate-700']"
      >
        Mitra Perusahaan
      </button>
    </div>

    <!-- General Error Message -->
    <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
      {{ errorMessage }}
    </div>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">
          {{ activeTab === 'akademik' ? 'Email Amikom / NIM / NIDN' : 'Email Resmi Perusahaan' }}
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserIcon class="h-5 w-5 text-slate-400" />
          </div>
          <input type="text" v-model="form.identifier"
            :class="[
              'block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors',
              identifierError ? 'border-red-500 text-red-600' : 'border-slate-300'
            ]"
            :placeholder="activeTab === 'akademik' ? 'Masukkan email @amikom.ac.id' : 'Contoh: hrd@perusahaan.com'" />
        </div>
        <p v-if="identifierError" class="mt-1 text-sm text-red-500">{{ identifierError }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Kata Sandi</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockIcon class="h-5 w-5 text-slate-400" />
          </div>
          <input type="password" v-model="form.password"
            class="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
            placeholder="••••••••" />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" type="checkbox"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded" />
          <label for="remember-me" class="ml-2 block text-sm text-slate-700">
            Ingat Saya
          </label>
        </div>
        <div class="text-sm">
          <RouterLink to="/forgot-password" @click.prevent="handleForgotPassword" class="font-medium text-primary-600 hover:text-primary-500">
            Lupa sandi?
          </RouterLink>
        </div>
      </div>

      <div>
        <button type="submit"
          class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
          Masuk
        </button>
      </div>
      
      <div class="mt-4 text-center">
        <p v-if="activeTab === 'akademik'" class="text-sm text-slate-600">
          Belum memiliki akun mahasiswa? 
          <RouterLink to="/register/mahasiswa" class="font-medium text-primary-600 hover:text-primary-500">Daftar disini</RouterLink>
        </p>
        <p v-else class="text-sm text-slate-600">
          Perusahaan baru? 
          <RouterLink to="/register/mitra" class="font-medium text-primary-600 hover:text-primary-500">Daftar kemitraan disini</RouterLink>
        </p>
      </div>

      <!-- Demo shortcuts -->
      <div v-if="isDev" class="mt-8 pt-4 border-t border-slate-200 demo-shortcuts">
        <p class="text-xs text-center text-slate-500 mb-2">Pintas Peran Demo (Khusus Fase Pengujian)</p>
        <div class="flex flex-wrap gap-2 justify-center">
          <button type="button" @click="mockLogin('/mahasiswa/dashboard', 'mahasiswa')" class="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600 hover:bg-slate-200">Mahasiswa</button>
          <button type="button" @click="mockLogin('/mitra/dashboard', 'mitra')" class="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600 hover:bg-slate-200">Mitra</button>
          <button type="button" @click="mockLogin('/dosen/dashboard', 'dosen')" class="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600 hover:bg-slate-200">Dosen</button>
          <button type="button" @click="mockLogin('/admin/dashboard', 'admin')" class="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600 hover:bg-slate-200">Admin</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { UserIcon, LockIcon } from '@lucide/vue'

const router = useRouter()
const isDev = import.meta.env.DEV

const activeTab = ref('akademik')
const errorMessage = ref('')
const identifierError = ref('')

const form = reactive({
  identifier: '',
  password: ''
})

// Reset error message and form on tab change
watch(activeTab, () => {
  errorMessage.value = ''
  identifierError.value = ''
  form.identifier = ''
  form.password = ''
})

// Hapus error spesifik identifier ketika user mengetik ulang
watch(() => form.identifier, () => {
  if (identifierError.value) {
    identifierError.value = ''
  }
})

const handleForgotPassword = () => {
  alert('Fitur reset kata sandi sedang disiapkan oleh tim backend.')
}

const validateForm = () => {
  errorMessage.value = ''
  identifierError.value = ''
  
  if (!form.identifier) {
    identifierError.value = 'ID pengguna tidak boleh kosong.'
    return false
  }
  
  if (!form.password) {
    errorMessage.value = 'Kata sandi tidak boleh kosong.'
    return false
  }

  if (activeTab.value === 'mitra') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.identifier)) {
      identifierError.value = 'Format email tidak valid untuk perusahaan.'
      return false
    }
  } else if (activeTab.value === 'akademik') {
    // Validasi format email institusi atau NIM/NIDN Amikom
    if (form.identifier.includes('@')) {
      const isStudentEmail = form.identifier.endsWith('@students.amikom.ac.id')
      const isAmikomEmail = form.identifier.endsWith('@amikom.ac.id')
      
      if (!isStudentEmail && !isAmikomEmail) {
        identifierError.value = 'Gunakan email resmi kampus (@students.amikom.ac.id / @amikom.ac.id).'
        return false
      }
    } else {
      // Jika bukan email, pastikan format NIM (XX.XX.XXXX) atau NIDN (angka murni) atau string 'admin'
      const nimRegex = /^\d{2}\.\d{2}\.\d{4}$/
      const nidnRegex = /^\d+$/
      const isAdmin = form.identifier.toLowerCase().includes('admin')

      if (!nimRegex.test(form.identifier) && !nidnRegex.test(form.identifier) && !isAdmin) {
        identifierError.value = 'Format ID tidak valid. Gunakan NIM, NIDN, atau email kampus.'
        return false
      }
    }
  }

  if (form.password.length < 6) {
    errorMessage.value = 'Kata sandi harus minimal 6 karakter.'
    return false
  }

  return true
}

const handleLogin = () => {
  if (!validateForm()) return

  // Tampilkan payload di console sebagai bukti frontend sudah menangkap state form
  console.log('Simulasi pengiriman data ke API backend:', {
    roleTab: activeTab.value,
    identifier: form.identifier,
    password: form.password
  })

  // Logika percabangan role berdasarkan input untuk Akademik Kampus
  if (activeTab.value === 'akademik') {
    const isNim = /^\d{2}\.\d{2}\.\d{4}$/.test(form.identifier)
    
    if (form.identifier.includes('@students.amikom.ac.id') || isNim) {
      mockLogin('/mahasiswa/dashboard', 'mahasiswa')
    } else if (form.identifier === 'admin@amikom.ac.id' || form.identifier.toLowerCase().includes('admin')) {
      mockLogin('/admin/dashboard', 'admin')
    } else if (form.identifier.includes('@amikom.ac.id') || /^\d+$/.test(form.identifier)) {
      mockLogin('/dosen/dashboard', 'dosen')
    } else {
      // Fallback
      mockLogin('/mahasiswa/dashboard', 'mahasiswa')
    }
  } else {
    // Mitra Perusahaan
    mockLogin('/mitra/dashboard', 'mitra')
  }
}

const mockLogin = (path, role) => {
  // Simpan role di localStorage untuk persistent state frontend-first
  localStorage.setItem('role', role)
  router.push(path)
}
</script>
