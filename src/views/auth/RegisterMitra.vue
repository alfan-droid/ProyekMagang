<template>
  <div>
    <h2 class="text-xl font-semibold text-slate-800 mb-6 text-center">Registrasi Mitra Perusahaan</h2>
    
    <form @submit.prevent="handleRegisterMitra" class="space-y-4">
      <!-- Nama Perusahaan -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Nama Perusahaan / Badan Usaha</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <BuildingIcon class="h-5 w-5 text-slate-400" />
          </div>
          <input type="text" v-model="form.namaPerusahaan"
            :class="[
              'block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors',
              errors.namaPerusahaan ? 'border-red-500 text-red-600' : 'border-slate-300'
            ]"
            placeholder="Masukkan nama perusahaan Anda" />
        </div>
        <p v-if="errors.namaPerusahaan" class="mt-1 text-sm text-red-500">{{ errors.namaPerusahaan }}</p>
      </div>

      <!-- Bidang Usaha -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Bidang Usaha</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <BriefcaseIcon class="h-5 w-5 text-slate-400" />
          </div>
          <select v-model="form.bidangUsaha"
            :class="[
              'block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors',
              errors.bidangUsaha ? 'border-red-500 text-red-600' : 'border-slate-300'
            ]">
            <option value="" disabled>Pilih bidang usaha</option>
            <option value="Teknologi Informasi">Teknologi Informasi</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Manufaktur">Manufaktur</option>
            <option value="Keuangan">Keuangan</option>
            <option value="Kreatif">Kreatif</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>
        <p v-if="errors.bidangUsaha" class="mt-1 text-sm text-red-500">{{ errors.bidangUsaha }}</p>
      </div>

      <!-- Alamat Kantor -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Alamat Kantor / Perusahaan</label>
        <div class="relative">
          <div class="absolute top-2 left-3 flex items-start pointer-events-none">
            <MapPinIcon class="h-5 w-5 text-slate-400" />
          </div>
          <textarea v-model="form.alamat" rows="3"
            :class="[
              'block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors',
              errors.alamat ? 'border-red-500 text-red-600' : 'border-slate-300'
            ]"
            placeholder="Masukkan alamat lengkap kantor"></textarea>
        </div>
        <p v-if="errors.alamat" class="mt-1 text-sm text-red-500">{{ errors.alamat }}</p>
      </div>

      <!-- No. Telepon -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">No. Telepon Perusahaan</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <PhoneIcon class="h-5 w-5 text-slate-400" />
          </div>
          <input type="tel" v-model="form.noTelepon"
            :class="[
              'block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors',
              errors.noTelepon ? 'border-red-500 text-red-600' : 'border-slate-300'
            ]"
            placeholder="Contoh: 081234567890" />
        </div>
        <p v-if="errors.noTelepon" class="mt-1 text-sm text-red-500">{{ errors.noTelepon }}</p>
      </div>

      <!-- Email Resmi -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Email Resmi Perusahaan</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MailIcon class="h-5 w-5 text-slate-400" />
          </div>
          <input type="email" v-model="form.email"
            :class="[
              'block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors',
              errors.email ? 'border-red-500 text-red-600' : 'border-slate-300'
            ]"
            placeholder="Contoh: hrd@perusahaan.com" />
        </div>
        <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
      </div>

      <!-- Kata Sandi -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Kata Sandi</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockIcon class="h-5 w-5 text-slate-400" />
          </div>
          <input type="password" v-model="form.password"
            :class="[
              'block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors',
              errors.password ? 'border-red-500 text-red-600' : 'border-slate-300'
            ]"
            placeholder="••••••••" />
        </div>
        <p v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</p>
      </div>

      <!-- Konfirmasi Kata Sandi -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Konfirmasi Kata Sandi</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockIcon class="h-5 w-5 text-slate-400" />
          </div>
          <input type="password" v-model="form.passwordConfirm"
            :class="[
              'block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors',
              errors.passwordConfirm ? 'border-red-500 text-red-600' : 'border-slate-300'
            ]"
            placeholder="••••••••" />
        </div>
        <p v-if="errors.passwordConfirm" class="mt-1 text-sm text-red-500">{{ errors.passwordConfirm }}</p>
      </div>

      <div class="pt-2">
        <button type="submit"
          class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
          Daftar Kemitraan
        </button>
      </div>
      
      <div class="mt-4 text-center">
        <p class="text-sm text-slate-600">
          <RouterLink to="/login" class="font-medium text-primary-600 hover:text-primary-500">
            Sudah mendaftar sebagai mitra? Masuk di sini
          </RouterLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { BuildingIcon, BriefcaseIcon, MapPinIcon, PhoneIcon, MailIcon, LockIcon } from '@lucide/vue'

const router = useRouter()

const form = reactive({
  namaPerusahaan: '',
  bidangUsaha: '',
  alamat: '',
  noTelepon: '',
  email: '',
  password: '',
  passwordConfirm: ''
})

const errors = reactive({
  namaPerusahaan: '',
  bidangUsaha: '',
  alamat: '',
  noTelepon: '',
  email: '',
  password: '',
  passwordConfirm: ''
})

// Auto-clear error when user types again to correct the mistake
Object.keys(form).forEach(key => {
  watch(() => form[key], () => {
    if (errors[key]) {
      errors[key] = ''
    }
  })
})

const validateForm = () => {
  let isValid = true
  
  // Reset all errors before running validation
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  // Validasi Required & Panjang Karakter
  if (!form.namaPerusahaan.trim()) {
    errors.namaPerusahaan = 'Nama perusahaan wajib diisi.'
    isValid = false
  }

  if (!form.bidangUsaha) {
    errors.bidangUsaha = 'Bidang usaha wajib dipilih.'
    isValid = false
  }

  if (!form.alamat.trim()) {
    errors.alamat = 'Alamat kantor wajib diisi.'
    isValid = false
  }

  // Validasi No Telepon (hanya angka murni, 9-14 digit)
  const phoneRegex = /^\d{9,14}$/
  if (!form.noTelepon) {
    errors.noTelepon = 'Nomor telepon wajib diisi.'
    isValid = false
  } else if (!phoneRegex.test(form.noTelepon)) {
    errors.noTelepon = 'Nomor telepon harus berupa angka murni (9 - 14 digit).'
    isValid = false
  }

  // Validasi format email korporat/umum
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email) {
    errors.email = 'Email resmi perusahaan wajib diisi.'
    isValid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Format email tidak valid.'
    isValid = false
  }

  // Validasi Kata Sandi Presisi
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

const handleRegisterMitra = () => {
  if (!validateForm()) return

  // Mock Data Payload - Menyimulasikan data yang akan dilempar ke API Laravel
  console.log('Simulasi pengiriman payload data Mitra ke API backend:', {
    ...form,
    role: 'mitra'
  })
  
  // Simulasi redirect sukses
  router.push('/login')
}
</script>
