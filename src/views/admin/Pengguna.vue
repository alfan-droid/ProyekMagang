<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Users class="h-6 w-6 text-indigo-600" /> Manajemen Pengguna
        </h1>
        <p class="mt-2 text-sm text-gray-700">Kelola data akun mahasiswa, dosen pembimbing, dan mitra perusahaan.</p>
      </div>
      <div class="mt-4 sm:mt-0 flex gap-3">
        <div class="relative rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search class="h-4 w-4 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            placeholder="Cari pengguna..."
            class="block w-full rounded-md border-0 py-2 pl-9 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <button type="button" class="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors">
          <UserPlus class="h-4 w-4" />
          Tambah
        </button>
      </div>
    </div>

    <!-- Alert / Toast Notifikasi -->
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="notifikasi.tampil" class="mb-6 p-4 rounded-md border flex items-center justify-between bg-green-50 text-green-800 border-green-200">
        <div class="flex items-center">
          <ShieldCheck class="h-5 w-5 mr-3 text-green-500" />
          <p class="text-sm font-medium">{{ notifikasi.pesan }}</p>
        </div>
        <button @click="notifikasi.tampil = false" class="focus:outline-none hover:bg-black/5 rounded p-1 transition-colors cursor-pointer">
          <span class="text-current font-bold text-lg leading-none">&times;</span>
        </button>
      </div>
    </transition>

    <!-- Content Area -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      <!-- Tab Bar -->
      <div class="border-b border-gray-200 bg-gray-50/50">
        <nav class="-mb-px flex space-x-1 px-4 py-3" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="tabAktif = tab.id"
            :class="[
              tabAktif === tab.id
                ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-600'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
              'cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-all duration-200'
            ]"
          >
            {{ tab.label }}
          </button>
        </nav>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 w-1/4">
                {{ labelKolomId }}
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Nama {{ labelJenisPengguna }}
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Keterangan Tambahan
              </th>
              <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 w-24">
                <span class="sr-only">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="item in dataTampil" :key="item.id" class="hover:bg-gray-50/50 transition-colors group">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {{ item.id }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700 font-medium">
                {{ item.nama }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ item.info }}
              </td>
              <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button class="cursor-pointer p-1.5 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-900 rounded-md transition-colors" title="Edit Data">
                    <Edit2 class="h-4 w-4" />
                  </button>
                  <button 
                    @click="handleDelete(item.id)" 
                    class="cursor-pointer p-1.5 text-red-600 hover:bg-red-50 hover:text-red-900 rounded-md transition-colors"
                    title="Hapus Pengguna"
                  >
                    <Trash2 class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="dataTampil.length === 0">
              <td colspan="4" class="py-12 text-center">
                <Users class="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <h3 class="text-sm font-medium text-gray-900">Data Kosong</h3>
                <p class="mt-1 text-sm text-gray-500">Belum ada entri {{ labelJenisPengguna.toLowerCase() }} yang terdaftar.</p>
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
import { Users, UserPlus, Search, Edit2, Trash2, ShieldCheck } from '@lucide/vue';

// Konfigurasi Tab
const tabAktif = ref('mahasiswa');
const tabs = [
  { id: 'mahasiswa', label: 'Mahasiswa' },
  { id: 'dosen', label: 'Dosen Pembimbing' },
  { id: 'mitra', label: 'Mitra Perusahaan' }
];

// Data Tiruan (Mock Data)
const dataPengguna = ref({
  mahasiswa: [
    { id: "23.11.5438", nama: "Budi Santoso", info: "Informatika" },
    { id: "23.11.9999", nama: "Siti Aminah", info: "Sistem Informasi" }
  ],
  dosen: [
    { id: "0512088801", nama: "Andi, S.Kom", info: "Kuota: 5/10 Mhs" }
  ],
  mitra: [
    { id: "MTR-001", nama: "PT Teknologi Cendana", info: "Teknologi (Terverifikasi)" }
  ]
});

// State Notifikasi
const notifikasi = ref({ tampil: false, pesan: '' });
let jedaNotifikasi = null;

// Properti Terkomputasi (Computed Properties)
const dataTampil = computed(() => {
  return dataPengguna.value[tabAktif.value] || [];
});

const labelKolomId = computed(() => {
  if (tabAktif.value === 'mahasiswa') return 'NIM';
  if (tabAktif.value === 'dosen') return 'NIDN';
  return 'ID Mitra';
});

const labelJenisPengguna = computed(() => {
  const tab = tabs.find(t => t.id === tabAktif.value);
  return tab ? tab.label : 'Pengguna';
});

// Fungsi Aksi
const handleDelete = (idTarget) => {
  // Lakukan pemotongan array untuk tab aktif berdasarkan ID
  const arraySaatIni = dataPengguna.value[tabAktif.value];
  const index = arraySaatIni.findIndex(item => item.id === idTarget);
  
  if (index !== -1) {
    const namaTerhapus = arraySaatIni[index].nama;
    arraySaatIni.splice(index, 1);
    
    // Tampilkan notifikasi toast sukses
    if (jedaNotifikasi) clearTimeout(jedaNotifikasi);
    notifikasi.value = { 
      tampil: true, 
      pesan: `Data pengguna "${namaTerhapus}" berhasil dihapus dari sistem.` 
    };
    
    jedaNotifikasi = setTimeout(() => {
      notifikasi.value.tampil = false;
    }, 4000);
  }
};
</script>
