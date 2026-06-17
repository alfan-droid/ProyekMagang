<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <Building2 class="h-6 w-6 text-blue-600" /> Persetujuan Lowongan Mitra
      </h1>
      <p class="mt-2 text-sm text-gray-700">Tinjau dan berikan persetujuan untuk setiap pengajuan lowongan magang dari perusahaan mitra.</p>
    </div>

    <!-- Layout 2 Kolom -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Kolom Kiri: Antrean Lowongan -->
      <div class="lg:col-span-1 flex flex-col gap-4">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-4 py-4 border-b border-gray-200 bg-gray-50">
            <h2 class="text-sm font-semibold text-gray-900">Daftar Pengajuan</h2>
          </div>
          <div class="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
            <button
              v-for="lowongan in antreanLowongan"
              :key="lowongan.id"
              @click="pilihLowongan(lowongan)"
              :class="[
                'w-full text-left px-4 py-4 transition-colors focus:outline-none cursor-pointer',
                selectedLowongan?.id === lowongan.id 
                  ? 'bg-blue-50 border-l-4 border-blue-600' 
                  : 'border-l-4 border-transparent hover:bg-gray-50'
              ]"
            >
              <div class="flex justify-between items-start">
                <div class="pr-2">
                  <p class="text-sm font-medium text-gray-900 truncate">{{ lowongan.posisi }}</p>
                  <p class="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Building2 class="h-3 w-3" /> {{ lowongan.perusahaan }}
                  </p>
                </div>
              </div>
              <div class="mt-3 flex items-center justify-between">
                <span class="text-xs text-gray-500">{{ lowongan.tanggal }}</span>
                <span :class="[
                  'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                  lowongan.status === 'disetujui' ? 'bg-green-50 text-green-700 ring-green-600/20' : 
                  lowongan.status === 'ditolak' ? 'bg-red-50 text-red-700 ring-red-600/20' : 
                  'bg-amber-50 text-amber-700 ring-amber-600/20'
                ]">
                  {{ formatStatus(lowongan.status) }}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Kolom Kanan: Detail & Aksi -->
      <div class="lg:col-span-2">
        <div v-if="selectedLowongan" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
          <div class="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Briefcase class="h-5 w-5 text-blue-600" /> Detail Lowongan
            </h2>
          </div>

          <!-- Toast Notifikasi -->
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
                <Check v-if="notifikasi.tipe === 'sukses'" class="h-5 w-5 mr-3 text-green-500" />
                <AlertCircle v-else class="h-5 w-5 mr-3 text-red-500" />
                <p class="text-sm font-medium">{{ notifikasi.pesan }}</p>
              </div>
              <button @click="notifikasi.tampil = false" class="focus:outline-none hover:bg-black/5 rounded p-1 transition-colors cursor-pointer">
                <span class="text-current font-bold text-lg leading-none">&times;</span>
              </button>
            </div>
          </transition>

          <div class="p-6 flex-grow">
            <!-- Informasi Utama -->
            <div class="mb-6 pb-6 border-b border-gray-100">
              <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ selectedLowongan.posisi }}</h1>
              <p class="text-base text-blue-600 font-medium mb-6">{{ selectedLowongan.perusahaan }}</p>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div class="text-xs text-gray-500 mb-1 flex items-center gap-1"><Users class="h-3.5 w-3.5"/> Kuota</div>
                  <div class="font-semibold text-gray-900">{{ selectedLowongan.kuota }} Mahasiswa</div>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div class="text-xs text-gray-500 mb-1 flex items-center gap-1"><Briefcase class="h-3.5 w-3.5"/> Tipe</div>
                  <div class="font-semibold text-gray-900">{{ selectedLowongan.tipe }}</div>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div class="text-xs text-gray-500 mb-1 flex items-center gap-1"><Calendar class="h-3.5 w-3.5"/> Tanggal</div>
                  <div class="font-semibold text-gray-900">{{ selectedLowongan.tanggal }}</div>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div class="text-xs text-gray-500 mb-1 flex items-center gap-1"><AlertCircle class="h-3.5 w-3.5"/> Status</div>
                  <div class="font-semibold text-gray-900 capitalize">{{ formatStatus(selectedLowongan.status) }}</div>
                </div>
              </div>
            </div>

            <!-- Deskripsi & Kualifikasi -->
            <div class="space-y-6 mb-8">
              <div>
                <h3 class="text-sm font-semibold text-gray-900 mb-2">Deskripsi Pekerjaan</h3>
                <p class="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                  {{ selectedLowongan.deskripsi }}
                </p>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-gray-900 mb-2">Kualifikasi</h3>
                <p class="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                  {{ selectedLowongan.kualifikasi }}
                </p>
              </div>
            </div>

            <!-- Area Keputusan -->
            <div class="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <div v-if="selectedLowongan.status === 'disetujui'" class="flex items-start gap-3">
                <Check class="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 class="text-sm font-bold text-green-800">Lowongan Terpublikasi</h4>
                  <p class="text-sm text-green-700 mt-1">Lowongan ini telah disetujui dan aktif di portal mahasiswa.</p>
                </div>
              </div>
              
              <div v-else-if="selectedLowongan.status === 'ditolak'" class="flex items-start gap-3">
                <X class="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 class="text-sm font-bold text-red-800">Lowongan Ditolak</h4>
                  <p class="text-sm text-red-700 mt-1">Lowongan ini telah ditolak dan tidak akan dipublikasikan.</p>
                </div>
              </div>

              <div v-else class="space-y-4">
                <div>
                  <label for="alasanPenolakan" class="block text-sm font-medium text-gray-700 mb-1">
                    Alasan Penolakan <span class="text-gray-400 font-normal">(Wajib diisi jika menolak)</span>
                  </label>
                  <textarea
                    id="alasanPenolakan"
                    v-model="alasanPenolakan"
                    rows="2"
                    class="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    placeholder="Tuliskan alasan mengapa lowongan ini tidak disetujui..."
                  ></textarea>
                  <p v-if="galatValidasi" class="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle class="h-3.5 w-3.5"/> {{ galatValidasi }}
                  </p>
                </div>
                
                <div class="flex items-center gap-3 pt-2">
                  <button
                    @click="tolakLowongan"
                    class="cursor-pointer inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-50"
                  >
                    <X class="h-4 w-4 mr-1.5" />
                    Tolak Lowongan
                  </button>
                  <button
                    @click="setujuiLowongan"
                    class="cursor-pointer inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    <Check class="h-4 w-4 mr-1.5" />
                    Setujui & Publikasikan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Keadaan Kosong (Empty State) -->
        <div v-else class="bg-gray-50 rounded-xl border border-gray-200 border-dashed flex flex-col items-center justify-center p-12 h-full min-h-[500px]">
          <Briefcase class="h-12 w-12 text-gray-300 mb-4" />
          <h3 class="text-base font-semibold text-gray-900">Belum ada lowongan dipilih</h3>
          <p class="mt-1 text-sm text-gray-500 text-center max-w-sm">Silakan pilih salah satu pengajuan lowongan di sebelah kiri untuk meninjau detail dan mengambil keputusan.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Building2, Briefcase, Calendar, Users, Check, X, AlertCircle } from '@lucide/vue';

const antreanLowongan = ref([
  {
    id: 1,
    perusahaan: "PT Startup Inovasi",
    posisi: "Backend Developer",
    tanggal: "16 Juni 2026",
    status: "menunggu",
    kuota: 2,
    tipe: "Onsite",
    kualifikasi: "Minimal Semester 6, Menguasai Node.js/Laravel",
    deskripsi: "Mengembangkan API internal sistem, mengoptimalkan kueri database, dan melakukan pengujian unit kode."
  },
  {
    id: 2,
    perusahaan: "PT Startup Inovasi",
    posisi: "Frontend Developer",
    tanggal: "16 Juni 2026",
    status: "disetujui",
    kuota: 3,
    tipe: "Hybrid",
    kualifikasi: "Menguasai Vue 3 atau React",
    deskripsi: "Mengonversi desain Figma menjadi komponen antarmuka reaktif."
  }
]);

const selectedLowongan = ref(null);
const alasanPenolakan = ref('');
const galatValidasi = ref('');
const notifikasi = ref({ tampil: false, pesan: '', tipe: 'sukses' });
let jedaNotifikasi = null;

const formatStatus = (status) => {
  if (status === 'menunggu') return 'Menunggu';
  if (status === 'disetujui') return 'Disetujui';
  if (status === 'ditolak') return 'Ditolak';
  return status;
};

const pilihLowongan = (lowongan) => {
  selectedLowongan.value = lowongan;
  alasanPenolakan.value = '';
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

const setujuiLowongan = () => {
  if (selectedLowongan.value) {
    selectedLowongan.value.status = 'disetujui';
    tampilkanNotifikasi('Lowongan berhasil disetujui dan dipublikasikan.', 'sukses');
  }
};

const tolakLowongan = () => {
  if (!alasanPenolakan.value.trim()) {
    galatValidasi.value = 'Silakan isi alasan penolakan terlebih dahulu.';
    return;
  }
  if (selectedLowongan.value) {
    selectedLowongan.value.status = 'ditolak';
    galatValidasi.value = '';
    tampilkanNotifikasi('Lowongan telah ditolak.', 'sukses');
  }
};
</script>
