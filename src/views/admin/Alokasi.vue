<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <UserPlusIcon class="w-6 h-6 text-blue-600" />
        Alokasi Dosen Pembimbing
      </h1>
      <p class="mt-1 text-sm text-gray-500">
        Kelola pendistribusian mahasiswa magang ke dosen pembimbing yang tersedia.
      </p>
    </div>

    <!-- Alert / Pesan Notifikasi -->
    <div v-if="alertMsg" :class="['mb-6 p-4 rounded-md flex items-center gap-3', alertType === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700']">
      <AlertCircleIcon v-if="alertType === 'error'" class="w-5 h-5" />
      <UserCheckIcon v-else class="w-5 h-5" />
      <span>{{ alertMsg }}</span>
    </div>

    <!-- Layout Dua Kolom -->
    <!-- Catatan: Menggunakan lg:col-span-2 dan lg:col-span-1 pada grid-cols-3 untuk mencapai proporsi yang pas dan responsif -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Kolom Kiri: Daftar Antrean -->
      <div class="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-800">Antrean Mahasiswa</h2>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {{ antreanAlokasi.length }} Menunggu
          </span>
        </div>
        
        <div class="overflow-x-auto">
          <table v-if="antreanAlokasi.length > 0" class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mahasiswa</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prodi</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Perusahaan Mitra</th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Aksi</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr 
                v-for="mhs in antreanAlokasi" 
                :key="mhs.NIM"
                :class="{'bg-blue-50': selectedMahasiswa?.NIM === mhs.NIM}"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {{ mhs.Nama.charAt(0) }}
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ mhs.Nama }}</div>
                      <div class="text-sm text-gray-500">{{ mhs.NIM }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ mhs.Prodi }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center text-sm text-gray-900">
                    <Building2Icon class="w-4 h-4 mr-2 text-gray-400" />
                    {{ mhs.Perusahaan }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    @click="pilihMahasiswa(mhs)"
                    class="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors cursor-pointer"
                  >
                    Pilih
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="p-8 text-center text-gray-500">
            <UserCheckIcon class="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p>Semua mahasiswa telah dialokasikan.</p>
          </div>
        </div>
      </div>

      <!-- Kolom Kanan: Form Alokasi -->
      <div class="lg:col-span-1">
        <div v-if="selectedMahasiswa" class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sticky top-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Formulir Alokasi</h2>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Mahasiswa Terpilih</label>
            <div class="bg-gray-50 p-3 rounded-md border border-gray-200">
              <div class="font-medium text-gray-900">{{ selectedMahasiswa.Nama }}</div>
              <div class="text-sm text-gray-500">{{ selectedMahasiswa.NIM }} - {{ selectedMahasiswa.Prodi }}</div>
              <div class="text-sm text-gray-600 mt-1 flex items-center">
                <Building2Icon class="w-3.5 h-3.5 mr-1" /> {{ selectedMahasiswa.Perusahaan }}
              </div>
            </div>
          </div>

          <form @submit.prevent="saveAlokasi">
            <div class="mb-5">
              <label for="dosen" class="block text-sm font-medium text-gray-700 mb-2">Pilih Dosen Pembimbing</label>
              <select 
                id="dosen" 
                v-model="selectedDosenId"
                class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="" disabled>-- Pilih Dosen --</option>
                <option 
                  v-for="dosen in daftarDosen" 
                  :key="dosen.NIDN" 
                  :value="dosen.NIDN"
                  :disabled="dosen.Terpakai >= dosen.Maksimal"
                >
                  {{ dosen.Nama }} (Sisa Kuota: {{ dosen.Maksimal - dosen.Terpakai }} Slot)
                </option>
              </select>
            </div>

            <div class="flex gap-3">
              <button 
                type="button" 
                @click="batalPilih"
                class="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button 
                type="submit" 
                class="flex-1 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <SaveIcon class="w-4 h-4" />
                Simpan
              </button>
            </div>
          </form>
        </div>

        <div v-else class="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center h-full flex flex-col justify-center min-h-[300px]">
          <UserPlusIcon class="w-10 h-10 mx-auto text-gray-400 mb-3" />
          <p class="text-sm text-gray-500">Silakan pilih mahasiswa dari antrean untuk memulai alokasi dosen pembimbing.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  UserPlusIcon, 
  Building2Icon, 
  UserCheckIcon, 
  AlertCircleIcon, 
  SaveIcon 
} from '@lucide/vue'

// Data Mockup Reaktif Intern
const antreanAlokasi = ref([
  {
    Nama: "Budi Santoso",
    NIM: "23.11.5438",
    Perusahaan: "PT Teknologi Cendana",
    Prodi: "Teknik Informatika"
  },
  {
    Nama: "Ahmad Rizky",
    NIM: "23.11.0045",
    Perusahaan: "Tech Innovators",
    Prodi: "Teknik Informatika"
  }
])

const daftarDosen = ref([
  {
    Nama: "Andi, S.Kom",
    NIDN: "0512088801",
    Terpakai: 4,
    Maksimal: 5
  },
  {
    Nama: "Nikko, M.Kom",
    NIDN: "0512089002",
    Terpakai: 2,
    Maksimal: 5
  }
])

// State Komponen
const selectedMahasiswa = ref(null)
const selectedDosenId = ref("")
const alertMsg = ref("")
const alertType = ref("")

// Metode
const pilihMahasiswa = (mhs) => {
  selectedMahasiswa.value = mhs
  selectedDosenId.value = ""
  alertMsg.value = ""
}

const batalPilih = () => {
  selectedMahasiswa.value = null
  selectedDosenId.value = ""
}

const saveAlokasi = () => {
  if (!selectedDosenId.value) return

  const dosenTerpilih = daftarDosen.value.find(d => d.NIDN === selectedDosenId.value)
  
  if (dosenTerpilih) {
    if (dosenTerpilih.Terpakai >= dosenTerpilih.Maksimal) {
      alertType.value = "error"
      alertMsg.value = "Gagal mengalokasikan. Kuota bimbingan dosen tersebut telah penuh!"
      return
    }

    // Simulasi penambahan kuota yang terpakai
    dosenTerpilih.Terpakai += 1
    
    // Potong elemen mahasiswa dari array antrean lokal
    antreanAlokasi.value = antreanAlokasi.value.filter(
      mhs => mhs.NIM !== selectedMahasiswa.value.NIM
    )

    alertType.value = "success"
    alertMsg.value = `Pembaruan berhasil. Mahasiswa ${selectedMahasiswa.value.Nama} telah sukses dialokasikan ke Dosen Pembimbing ${dosenTerpilih.Nama}.`
    
    // Reset formulir
    batalPilih()
    
    // Sembunyikan pesan secara otomatis setelah 5 detik
    setTimeout(() => {
      alertMsg.value = ""
    }, 5000)
  }
}
</script>
