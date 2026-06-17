<template>
  <div>
    <h2 class="text-xl font-semibold text-slate-800 mb-6 text-center">Registrasi Mahasiswa</h2>
    
    <form @submit.prevent="handleRegister" class="space-y-4">
      <!-- Nama Lengkap -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
        <input type="text" v-model="form.namaLengkap"
          :class="[
            'block w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors',
            errors.namaLengkap ? 'border-red-500 text-red-600' : 'border-slate-300'
          ]"
          placeholder="Masukkan nama lengkap Anda" />
        <p v-if="errors.namaLengkap" class="mt-1 text-sm text-red-500">{{ errors.namaLengkap }}</p>
      </div>

      <!-- NIM -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">NIM</label>
        <input type="text" v-model="form.nim"
          :class="[
            'block w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors',
            errors.nim ? 'border-red-500 text-red-600' : 'border-slate-300'
          ]"
          placeholder="Contoh: 23.11.5438" />
        <p v-if="errors.nim" class="mt-1 text-sm text-red-500">{{ errors.nim }}</p>
      </div>

      <!-- Email Students -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Email Students</label>
        <input type="email" v-model="form.email"
          :class="[
            'block w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors',
            errors.email ? 'border-red-500 text-red-600' : 'border-slate-300'
          ]"
          placeholder="Contoh: nama@students.amikom.ac.id" />
        <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
      </div>

      <!-- Program Studi -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Program Studi</label>
        <select v-model="form.programStudi"
          :class="[
            'block w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors',
            errors.programStudi ? 'border-red-500 text-red-600' : 'border-slate-300'
          ]">
          <option value="" disabled>Pilih program studi</option>
          <option value="S1 Informatika">S1 Informatika</option>
          <option value="S1 Sistem Informasi">S1 Sistem Informasi</option>
          <option value="S1 Teknologi Informasi">S1 Teknologi Informasi</option>
          <option value="S1 Ilmu Komunikasi">S1 Ilmu Komunikasi</option>
          <option value="D3 Manajemen Informatika">D3 Manajemen Informatika</option>
          <option value="D3 Teknik Informatika">D3 Teknik Informatika</option>
        </select>
        <p v-if="errors.programStudi" class="mt-1 text-sm text-red-500">{{ errors.programStudi }}</p>
      </div>

      <!-- Angkatan -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Angkatan</label>
        <select v-model="form.angkatan"
          :class="[
            'block w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors',
            errors.angkatan ? 'border-red-500 text-red-600' : 'border-slate-300'
          ]">
          <option value="" disabled>Pilih tahun angkatan</option>
          <option v-for="year in [2021, 2022, 2023, 2024]" :key="year" :value="year">{{ year }}</option>
        </select>
        <p v-if="errors.angkatan" class="mt-1 text-sm text-red-500">{{ errors.angkatan }}</p>
      </div>

      <!-- Kata Sandi -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Kata Sandi</label>
        <input type="password" v-model="form.password"
          :class="[
            'block w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors',
            errors.password ? 'border-red-500 text-red-600' : 'border-slate-300'
          ]"
          placeholder="••••••••" />
        <p v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</p>
      </div>

      <!-- Konfirmasi Kata Sandi -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Konfirmasi Kata Sandi</label>
        <input type="password" v-model="form.passwordConfirm"
          :class="[
            'block w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors',
            errors.passwordConfirm ? 'border-red-500 text-red-600' : 'border-slate-300'
          ]"
          placeholder="••••••••" />
        <p v-if="errors.passwordConfirm" class="mt-1 text-sm text-red-500">{{ errors.passwordConfirm }}</p>
      </div>

      <div class="pt-2">
        <button type="submit"
          class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
          Daftar Mahasiswa
        </button>
      </div>
      
      <div class="mt-4 text-center">
        <p class="text-sm text-slate-600">
          <RouterLink to="/login" class="font-medium text-primary-600 hover:text-primary-500">
            Sudah memiliki akun? Masuk di sini
          </RouterLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()

const form = reactive({
  namaLengkap: '',
  nim: '',
  email: '',
  programStudi: '',
  angkatan: '',
  password: '',
  passwordConfirm: ''
})

const errors = reactive({
  namaLengkap: '',
  nim: '',
  email: '',
  programStudi: '',
  angkatan: '',
  password: '',
  passwordConfirm: ''
})

// Auto-clear errors when user types again
Object.keys(form).forEach(key => {
  watch(() => form[key], () => {
    if (errors[key]) {
      errors[key] = ''
    }
  })
})

const validateForm = () => {
  let isValid = true
  
  // Reset all errors before validating
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  if (!form.namaLengkap.trim()) {
    errors.namaLengkap = 'Nama lengkap wajib diisi.'
    isValid = false
  }

  // Regex exact match format XX.XX.XXXX
  const nimRegex = /^\d{2}\.\d{2}\.\d{4}$/
  if (!nimRegex.test(form.nim)) {
    errors.nim = 'Format NIM tidak valid (Contoh: 23.11.5438)'
    isValid = false
  }

  // Email wajib memiliki domain @students.amikom.ac.id
  if (!form.email.endsWith('@students.amikom.ac.id')) {
    errors.email = 'Email harus menggunakan domain @students.amikom.ac.id'
    isValid = false
  }

  if (!form.programStudi) {
    errors.programStudi = 'Program studi wajib dipilih.'
    isValid = false
  }

  if (!form.angkatan) {
    errors.angkatan = 'Angkatan wajib dipilih.'
    isValid = false
  }

  if (!form.password || form.password.length < 6) {
    errors.password = 'Kata sandi minimal 6 karakter.'
    isValid = false
  }

  if (form.password !== form.passwordConfirm) {
    errors.passwordConfirm = 'Konfirmasi kata sandi tidak cocok.'
    isValid = false
  }

  return isValid
}

const handleRegister = () => {
  if (!validateForm()) return

  // Simulasi pengiriman data ke API backend sesuai arsitektur Frontend-First
  console.log('Simulasi payload pendaftaran (siap dikirim via Axios):', {
    namaLengkap: form.namaLengkap,
    nim: form.nim,
    email: form.email,
    programStudi: form.programStudi,
    angkatan: form.angkatan,
    password: form.password,
    role: 'mahasiswa' // Menambahkan role penanda
  })
  
  // Bypass navigasi jika sukses ke halaman login
  router.push('/login')
}
</script>
