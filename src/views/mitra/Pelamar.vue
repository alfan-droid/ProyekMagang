<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Daftar Pelamar Magang</h1>
        <p class="mt-2 text-sm text-gray-700">Kelola mahasiswa yang melamar posisi magang di perusahaan Anda.</p>
      </div>
      <div class="mt-4 sm:mt-0">
        <div class="relative rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FilterIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <select
            v-model="filterPosisi"
            class="block w-full rounded-md border-0 py-2 pl-10 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6"
          >
            <option value="">Semua Posisi</option>
            <option v-for="posisi in uniquePosisi" :key="posisi" :value="posisi">
              {{ posisi }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Alert / Toast Notification -->
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="notification.show" :class="[notification.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200', 'mb-6 p-4 rounded-md border flex items-center justify-between']">
        <div class="flex items-center">
          <Check v-if="notification.type === 'success'" class="h-5 w-5 mr-3 text-green-500" />
          <X v-else class="h-5 w-5 mr-3 text-red-500" />
          <p class="text-sm font-medium">{{ notification.message }}</p>
        </div>
        <button @click="notification.show = false" class="focus:outline-none hover:bg-black/5 rounded p-1 transition-colors">
          <X class="h-4 w-4 opacity-70 hover:opacity-100" />
        </button>
      </div>
    </transition>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Pelamar</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Posisi</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Berkas</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th scope="col" class="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:pr-6">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="pelamar in filteredPelamar" :key="pelamar.nim" class="hover:bg-gray-50 transition-colors">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0 bg-fuchsia-100 rounded-full flex items-center justify-center text-fuchsia-600">
                    <User class="h-5 w-5" />
                  </div>
                  <div class="ml-4">
                    <div class="font-medium text-gray-900">{{ pelamar.nama }}</div>
                    <div class="text-sm text-gray-500">{{ pelamar.nim }} &bull; {{ pelamar.prodi }}</div>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                {{ pelamar.posisi }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div class="flex flex-col gap-2 items-start">
                  <a href="#" class="inline-flex items-center gap-1 text-xs font-medium text-fuchsia-700 bg-fuchsia-50 hover:bg-fuchsia-100 px-2.5 py-1.5 rounded-md border border-fuchsia-200 transition-colors">
                    <FileText class="h-3.5 w-3.5" /> CV
                    <Download class="h-3.5 w-3.5 ml-1 opacity-70" />
                  </a>
                  <a href="#" class="inline-flex items-center gap-1 text-xs font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 px-2.5 py-1.5 rounded-md border border-purple-200 transition-colors">
                    <FileText class="h-3.5 w-3.5" /> Transkrip
                    <Download class="h-3.5 w-3.5 ml-1 opacity-70" />
                  </a>
                </div>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm">
                <span :class="['inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset', getStatusBadgeClass(pelamar.status)]">
                  {{ pelamar.status }}
                </span>
              </td>
              <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <div class="flex justify-end gap-2" v-if="pelamar.status === 'Menunggu Review' || pelamar.status === 'Wawancara'">
                  <button 
                    @click="updateStatus(pelamar.nim, 'Diterima')"
                    class="p-1.5 rounded-md bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 transition-colors"
                    title="Terima Pelamar"
                  >
                    <Check class="h-4 w-4" />
                  </button>
                  <button 
                    @click="updateStatus(pelamar.nim, 'Ditolak')"
                    class="p-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors"
                    title="Tolak Pelamar"
                  >
                    <X class="h-4 w-4" />
                  </button>
                </div>
                <span v-else class="text-gray-400 text-xs italic">
                  Telah diproses
                </span>
              </td>
            </tr>
            <tr v-if="filteredPelamar.length === 0">
              <td colspan="5" class="py-8 text-center text-sm text-gray-500">
                Tidak ada pelamar yang sesuai dengan filter.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { User, FileText, Download, Check, X, Filter as FilterIcon } from '@lucide/vue';

// Data Mock
const pelamarList = ref([
  {
    nama: "Budi Santoso",
    nim: "23.11.5438",
    prodi: "Informatika",
    posisi: "Frontend Developer Intern",
    status: "Menunggu Review",
    fileCV: "CV_Budi_Santoso.pdf",
    fileTranscript: "Transkrip_Budi.pdf"
  },
  {
    nama: "Siti Aminah",
    nim: "23.11.9999",
    prodi: "Sistem Informasi",
    posisi: "UI/UX Designer Intern",
    status: "Wawancara",
    fileCV: "CV_Siti.pdf",
    fileTranscript: "Transkrip_Siti.pdf"
  },
  {
    nama: "Andi Pratama",
    nim: "23.11.1111",
    prodi: "Informatika",
    posisi: "Frontend Developer Intern",
    status: "Diterima",
    fileCV: "CV_Andi.pdf",
    fileTranscript: "Transkrip_Andi.pdf"
  }
]);

// Filter State
const filterPosisi = ref('');

// Unique Posisi for Dropdown
const uniquePosisi = computed(() => {
  const positions = new Set(pelamarList.value.map(p => p.posisi));
  return Array.from(positions);
});

// Computed Filtered List
const filteredPelamar = computed(() => {
  if (!filterPosisi.value) return pelamarList.value;
  return pelamarList.value.filter(p => p.posisi === filterPosisi.value);
});

// Notification State
const notification = ref({
  show: false,
  message: '',
  type: 'success' // 'success' | 'error'
});

let notificationTimeout = null;

// Actions
const updateStatus = (nim, newStatus) => {
  const index = pelamarList.value.findIndex(p => p.nim === nim);
  if (index !== -1) {
    pelamarList.value[index].status = newStatus;
    
    // Clear existing timeout if any
    if (notificationTimeout) clearTimeout(notificationTimeout);
    
    // Show Notification
    notification.value = {
      show: true,
      message: `Status pelamar berhasil diperbarui menjadi ${newStatus}.`,
      type: newStatus === 'Diterima' ? 'success' : 'error'
    };
    
    // Auto hide notification
    notificationTimeout = setTimeout(() => {
      notification.value.show = false;
    }, 4000);
  }
};

// Helpers
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Menunggu Review':
      return 'bg-blue-50 text-blue-700 ring-blue-600/20';
    case 'Wawancara':
      return 'bg-amber-50 text-amber-700 ring-amber-600/20';
    case 'Diterima':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'Ditolak':
      return 'bg-red-50 text-red-700 ring-red-600/20';
    default:
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
  }
};
</script>
