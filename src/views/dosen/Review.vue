<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Peninjauan Laporan Mahasiswa</h1>
      <p class="mt-2 text-sm text-gray-700">Tinjau, evaluasi, dan berikan persetujuan pada laporan progres magang mahasiswa bimbingan Anda.</p>
    </div>

    <!-- Sistem Kisi (Grid Layout) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Kolom Kiri: Daftar Pengajuan Laporan -->
      <div class="lg:col-span-1 flex flex-col gap-4">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-4 py-4 border-b border-gray-200 bg-gray-50">
            <h2 class="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <User class="h-4 w-4 text-blue-600" /> Daftar Pengajuan Laporan
            </h2>
          </div>
          <div class="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
            <button
              v-for="laporan in daftarLaporan"
              :key="laporan.nim"
              @click="pilihLaporan(laporan)"
              :class="[
                'w-full text-left px-4 py-4 transition-colors focus:outline-none',
                selectedLaporan?.nim === laporan.nim 
                  ? 'bg-blue-50 border-l-4 border-blue-600' 
                  : 'border-l-4 border-transparent hover:bg-gray-50'
              ]"
            >
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ laporan.nama }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ laporan.nim }} &bull; {{ laporan.periode }}</p>
                </div>
              </div>
              <div class="mt-3 flex items-center justify-between">
                <span class="text-xs text-gray-500 truncate max-w-[150px]">{{ laporan.perusahaan }}</span>
                <span :class="[
                  'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                  laporan.status === 'disetujui' ? 'bg-green-50 text-green-700 ring-green-600/20' : 
                  laporan.status === 'revisi' ? 'bg-red-50 text-red-700 ring-red-600/20' : 
                  'bg-amber-50 text-amber-700 ring-amber-600/20'
                ]">
                  {{ formatStatus(laporan.status) }}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Kolom Kanan: Detail Laporan dan Peninjauan -->
      <div class="lg:col-span-2">
        <div v-if="selectedLaporan" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
          <div class="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FileText class="h-5 w-5 text-blue-600" /> Detail Laporan: {{ selectedLaporan.nama }}
            </h2>
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
            <div v-if="notifikasi.tampil" :class="[
              'mx-6 mt-6 p-4 rounded-md border flex items-center justify-between',
              notifikasi.tipe === 'sukses' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'
            ]">
              <div class="flex items-center">
                <CheckCircle v-if="notifikasi.tipe === 'sukses'" class="h-5 w-5 mr-3 text-green-500" />
                <AlertCircle v-else class="h-5 w-5 mr-3 text-red-500" />
                <p class="text-sm font-medium">{{ notifikasi.pesan }}</p>
              </div>
              <button @click="notifikasi.tampil = false" class="focus:outline-none hover:bg-black/5 rounded p-1 transition-colors">
                <span class="text-current font-bold text-lg leading-none">&times;</span>
              </button>
            </div>
          </transition>

          <div class="p-6 flex-grow">
            <!-- Info Laporan -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 class="text-sm font-medium text-gray-500">Perusahaan Tempat Magang</h3>
                <p class="mt-1 text-base text-gray-900">{{ selectedLaporan.perusahaan }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500">Periode Laporan</h3>
                <p class="mt-1 text-base text-gray-900">{{ selectedLaporan.periode }}</p>
              </div>
              <div class="md:col-span-2">
                <h3 class="text-sm font-medium text-gray-500 mb-1">Status Verifikasi Industri</h3>
                <span class="inline-flex items-center rounded-md bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20">
                  <CheckCircle class="h-4 w-4 mr-1.5" />
                  {{ selectedLaporan.statusVerifikasi }}
                </span>
              </div>
            </div>

            <!-- Isi Laporan -->
            <div class="space-y-6 mb-8">
              <div>
                <h3 class="text-sm font-medium text-gray-900 flex items-center gap-2 mb-2">
                  <CheckCircle class="h-4 w-4 text-green-500" /> Deskripsi Kegiatan
                </h3>
                <div class="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 border border-gray-100">
                  {{ selectedLaporan.deskripsi }}
                </div>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-900 flex items-center gap-2 mb-2">
                  <AlertCircle class="h-4 w-4 text-amber-500" /> Kendala yang Dihadapi
                </h3>
                <div class="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 border border-gray-100">
                  {{ selectedLaporan.kendala }}
                </div>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-900 flex items-center gap-2 mb-2">
                  <FileText class="h-4 w-4 text-gray-500" /> Dokumen Lampiran
                </h3>
                <a href="#" class="inline-flex items-center gap-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-md border border-blue-200 transition-colors">
                  <FileText class="h-4 w-4" /> {{ selectedLaporan.fileDokumen }}
                  <Download class="h-4 w-4 ml-1 opacity-70" />
                </a>
              </div>
            </div>

            <hr class="border-gray-200 mb-6" />

            <!-- Area Peninjauan (Dosen) -->
            <div>
              <div v-if="laporanDisetujui" class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-md">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <CheckCircle class="h-5 w-5 text-blue-500" />
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-blue-700">
                      Laporan ini telah disetujui dan tidak dapat diubah kembali.
                    </p>
                  </div>
                </div>
              </div>

              <form @submit.prevent>
                <div class="mb-6">
                  <label for="catatanDosen" class="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900">
                    <MessageSquare class="h-4 w-4 text-gray-400" /> Catatan Masukan (Wajib diisi jika revisi)
                  </label>
                  <div class="mt-2">
                    <textarea
                      id="catatanDosen"
                      v-model="catatanDosen"
                      :disabled="laporanDisetujui"
                      rows="4"
                      class="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:bg-gray-100 disabled:text-gray-500 disabled:ring-gray-200 transition-colors"
                      placeholder="Tuliskan umpan balik atau perbaikan yang perlu dilakukan mahasiswa..."
                    ></textarea>
                    <p v-if="galatValidasi" class="mt-2 text-sm text-red-600">{{ galatValidasi }}</p>
                  </div>
                </div>

                <!-- Tombol Aksi -->
                <div class="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    @click="mintaRevisi"
                    :disabled="laporanDisetujui"
                    :class="[
                      'inline-flex justify-center items-center rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 border',
                      laporanDisetujui 
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                        : 'bg-white text-red-600 border-red-200 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
                    ]"
                  >
                    Minta Revisi
                  </button>
                  <button
                    type="button"
                    @click="setujuiLaporan"
                    :disabled="laporanDisetujui"
                    :class="[
                      'inline-flex justify-center items-center rounded-md px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200',
                      laporanDisetujui 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-600 hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 hover:shadow-md'
                    ]"
                  >
                    <CheckCircle class="h-4 w-4 mr-2" />
                    Setujui Laporan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Keadaan Kosong (Empty State) ketika belum memilih -->
        <div v-else class="bg-gray-50 rounded-xl border border-gray-200 border-dashed flex flex-col items-center justify-center p-12 h-full min-h-[500px]">
          <FileText class="h-12 w-12 text-gray-300 mb-4" />
          <h3 class="text-base font-semibold text-gray-900">Tidak ada laporan yang dipilih</h3>
          <p class="mt-1 text-sm text-gray-500 text-center max-w-sm">Silakan pilih laporan dari daftar di sebelah kiri untuk menampilkan detail dan memberikan persetujuan atau catatan.</p>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { User, FileText, CheckCircle, AlertCircle, MessageSquare, Download } from '@lucide/vue';

// Data Tiruan (Mock Data) Tersinkronisasi dengan Dashboard
const daftarLaporan = ref([
  {
    nama: "Budi Santoso",
    nim: "23.11.5438",
    perusahaan: "PT Teknologi Cendana",
    periode: "Laporan Bulan 1",
    status: "menunggu_review_dosen",
    statusVerifikasi: "Telah Disetujui Mitra", // Tambahan indikator industri
    deskripsi: "Menyelesaikan integrasi komponen login dan merapikan sistem manajemen rute pada Vue Router.",
    kendala: "Terjadi galat kompilasi internal server pada templat Vite.",
    fileDokumen: "Laporan_Bulan1_Budi.pdf"
  },
  {
    nama: "Siti Aminah",
    nim: "23.11.9999",
    perusahaan: "PT Kreatif Solusi",
    periode: "Laporan Bulan 1",
    status: "disetujui",
    statusVerifikasi: "Telah Disetujui Mitra", // Tambahan indikator industri
    deskripsi: "Merancang desain antarmuka pengguna (UI) dan alur pengguna (user flow) untuk modul eksplorasi lowongan.",
    kendala: "Tidak ada hambatan yang berarti.",
    fileDokumen: "Laporan_Bulan1_Siti.pdf"
  }
]);

// Keadaan (State) Komponen
const selectedLaporan = ref(null);
const catatanDosen = ref('');
const galatValidasi = ref('');
const notifikasi = ref({ tampil: false, pesan: '', tipe: 'sukses' });
let jedaNotifikasi = null;

// Fungsi Pembantu
const formatStatus = (status) => {
  switch (status) {
    case 'menunggu_review_dosen': return 'Perlu Ditinjau'; // Disinkronkan dengan Dashboard
    case 'disetujui': return 'Disetujui';
    case 'revisi': return 'Perlu Revisi';
    default: return status;
  }
};

const laporanDisetujui = computed(() => {
  return selectedLaporan.value?.status === 'disetujui';
});

// Aksi Interaksi
const pilihLaporan = (laporan) => {
  selectedLaporan.value = laporan;
  catatanDosen.value = '';
  galatValidasi.value = '';
  notifikasi.value.tampil = false;
};

const tampilkanNotifikasi = (pesan, tipe = 'sukses') => {
  if (jedaNotifikasi) clearTimeout(jedaNotifikasi);
  notifikasi.value = { tampil: true, pesan, tipe };
  jedaNotifikasi = setTimeout(() => {
    notifikasi.value.tampil = false;
  }, 4000);
};

const setujuiLaporan = () => {
  if (selectedLaporan.value) {
    selectedLaporan.value.status = 'disetujui';
    galatValidasi.value = '';
    tampilkanNotifikasi('Laporan berhasil disetujui.', 'sukses');
  }
};

const mintaRevisi = () => {
  if (!catatanDosen.value.trim()) {
    galatValidasi.value = 'Kolom catatan masukan tidak boleh kosong jika meminta revisi.';
    return;
  }
  
  if (selectedLaporan.value) {
    selectedLaporan.value.status = 'revisi';
    galatValidasi.value = '';
    tampilkanNotifikasi('Permintaan revisi telah dikirim ke mahasiswa.', 'sukses');
  }
};
</script>
