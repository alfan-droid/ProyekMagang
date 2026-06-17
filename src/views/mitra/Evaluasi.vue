<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Evaluasi Akhir Mahasiswa</h1>
      <p class="mt-2 text-sm text-gray-700">Berikan penilaian teknis dan soft skill untuk mahasiswa magang yang telah menyelesaikan program.</p>
    </div>

    <!-- Layout Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Kolom Kiri: Daftar Mahasiswa -->
      <div class="lg:col-span-1 flex flex-col gap-4">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-4 py-4 border-b border-gray-200 bg-gray-50">
            <h2 class="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <UserCheck class="h-4 w-4 text-fuchsia-600" /> Daftar Mahasiswa Aktif
            </h2>
          </div>
          <div class="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
            <button
              v-for="intern in activeInterns"
              :key="intern.nim"
              @click="selectedIntern = intern"
              :class="[
                'w-full text-left px-4 py-4 transition-colors focus:outline-none',
                selectedIntern?.nim === intern.nim 
                  ? 'bg-fuchsia-50 border-l-4 border-fuchsia-600' 
                  : 'border-l-4 border-transparent hover:bg-gray-50'
              ]"
            >
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ intern.nama }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ intern.nim }} &bull; {{ intern.prodi }}</p>
                </div>
              </div>
              <div class="mt-3">
                <span :class="[
                  'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                  intern.statusEvaluasi === 'sudah_dinilai' 
                    ? 'bg-green-50 text-green-700 ring-green-600/20' 
                    : 'bg-amber-50 text-amber-700 ring-amber-600/20'
                ]">
                  {{ intern.statusEvaluasi === 'sudah_dinilai' ? 'Sudah Dinilai' : 'Belum Dinilai' }}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Kolom Kanan: Form Evaluasi -->
      <div class="lg:col-span-2">
        <div v-if="selectedIntern" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <ClipboardCheck class="h-5 w-5 text-fuchsia-600" /> Form Evaluasi: {{ selectedIntern.nama }}
            </h2>
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
            <div v-if="notification.show" class="mx-6 mt-6 p-4 rounded-md border flex items-center justify-between bg-green-50 text-green-800 border-green-200">
              <div class="flex items-center">
                <ClipboardCheck class="h-5 w-5 mr-3 text-green-500" />
                <p class="text-sm font-medium">{{ notification.message }}</p>
              </div>
              <button @click="notification.show = false" class="focus:outline-none hover:bg-black/5 rounded p-1 transition-colors">
                <span class="sr-only">Close</span>
                <span class="text-green-600 font-bold text-lg leading-none">&times;</span>
              </button>
            </div>
          </transition>

          <form @submit.prevent="submitEvaluation" class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <!-- Nilai Teknis -->
              <div>
                <label for="nilaiTeknis" class="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900">
                  <FileSpreadsheet class="h-4 w-4 text-gray-400" /> Nilai Teknis (0-100)
                </label>
                <div class="mt-2">
                  <input
                    type="number"
                    id="nilaiTeknis"
                    v-model="form.nilaiTeknis"
                    :disabled="isFormDisabled"
                    min="0" max="100"
                    required
                    class="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 transition-colors"
                    placeholder="Contoh: 85"
                  />
                </div>
              </div>

              <!-- Nilai Soft Skill -->
              <div>
                <label for="nilaiSoftSkill" class="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900">
                  <Award class="h-4 w-4 text-gray-400" /> Nilai Soft Skill (0-100)
                </label>
                <div class="mt-2">
                  <input
                    type="number"
                    id="nilaiSoftSkill"
                    v-model="form.nilaiSoftSkill"
                    :disabled="isFormDisabled"
                    min="0" max="100"
                    required
                    class="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 transition-colors"
                    placeholder="Contoh: 90"
                  />
                </div>
              </div>

              <!-- Catatan -->
              <div class="md:col-span-2">
                <label for="catatan" class="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900">
                  <MessageSquare class="h-4 w-4 text-gray-400" /> Catatan Tambahan (Opsional)
                </label>
                <div class="mt-2">
                  <textarea
                    id="catatan"
                    v-model="form.catatan"
                    :disabled="isFormDisabled"
                    rows="4"
                    class="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 transition-colors"
                    placeholder="Berikan ulasan tentang kinerja mahasiswa selama magang..."
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Error message for validation -->
            <div v-if="validationError" class="mt-4 text-sm text-red-600 flex items-center gap-1">
              <span class="font-medium">Peringatan:</span> {{ validationError }}
            </div>

            <!-- Submit Button Area -->
            <div class="mt-8 pt-5 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                :disabled="isFormDisabled"
                :class="[
                  'inline-flex justify-center items-center rounded-md px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200',
                  isFormDisabled 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-fuchsia-600 hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600 hover:shadow-md'
                ]"
              >
                <ClipboardCheck class="h-4 w-4 mr-2" />
                {{ isFormDisabled ? 'Nilai Telah Dikunci & Dikirim ke Prodi' : 'Simpan Evaluasi' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Empty State ketika tidak ada yang dipilih -->
        <div v-else class="bg-gray-50 rounded-xl border border-gray-200 border-dashed flex flex-col items-center justify-center p-12 h-full min-h-[400px]">
          <UserCheck class="h-12 w-12 text-gray-300 mb-4" />
          <h3 class="text-base font-semibold text-gray-900">Belum ada mahasiswa yang dipilih</h3>
          <p class="mt-1 text-sm text-gray-500 text-center max-w-sm">Pilih salah satu mahasiswa dari daftar di sebelah kiri untuk mulai mengisi form evaluasi akhir.</p>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { UserCheck, Award, FileSpreadsheet, ClipboardCheck, MessageSquare } from '@lucide/vue';

// Data Mock
const activeInterns = ref([
  {
    nama: "Budi Santoso",
    nim: "23.11.5438",
    prodi: "Informatika",
    statusEvaluasi: "belum_dinilai",
    nilaiTeknis: null,
    nilaiSoftSkill: null,
    catatan: ""
  },
  {
    nama: "Siti Aminah",
    nim: "23.11.9999",
    prodi: "Sistem Informasi",
    statusEvaluasi: "sudah_dinilai",
    nilaiTeknis: 88,
    nilaiSoftSkill: 92,
    catatan: "Sangat aktif berkontribusi dalam perancangan user flow aplikasi."
  }
]);

// State
const selectedIntern = ref(null);
const validationError = ref('');
const notification = ref({ show: false, message: '' });
let notificationTimeout = null;

// Form State (Reaktif mengikuti selectedIntern)
const form = ref({
  nilaiTeknis: null,
  nilaiSoftSkill: null,
  catatan: ''
});

// Watcher untuk sinkronisasi form saat mahasiswa dipilih
watch(selectedIntern, (newVal) => {
  validationError.value = '';
  if (notificationTimeout) clearTimeout(notificationTimeout);
  notification.value.show = false;
  
  if (newVal) {
    form.value = {
      nilaiTeknis: newVal.nilaiTeknis,
      nilaiSoftSkill: newVal.nilaiSoftSkill,
      catatan: newVal.catatan || ''
    };
  } else {
    form.value = { nilaiTeknis: null, nilaiSoftSkill: null, catatan: '' };
  }
});

// Computed Properties
const isFormDisabled = computed(() => {
  return selectedIntern.value?.statusEvaluasi === 'sudah_dinilai';
});

// Method
const submitEvaluation = () => {
  validationError.value = '';
  
  const tk = Number(form.value.nilaiTeknis);
  const ss = Number(form.value.nilaiSoftSkill);
  
  // Validasi
  if (tk === null || isNaN(tk) || tk < 0 || tk > 100) {
    validationError.value = 'Nilai Teknis harus berupa angka antara 0 hingga 100.';
    return;
  }
  if (ss === null || isNaN(ss) || ss < 0 || ss > 100) {
    validationError.value = 'Nilai Soft Skill harus berupa angka antara 0 hingga 100.';
    return;
  }
  
  // Jika lolos validasi, update local state
  if (selectedIntern.value) {
    selectedIntern.value.nilaiTeknis = tk;
    selectedIntern.value.nilaiSoftSkill = ss;
    selectedIntern.value.catatan = form.value.catatan;
    selectedIntern.value.statusEvaluasi = 'sudah_dinilai';
    
    // Payload Log
    console.log('--- Payload Evaluasi Terkirim ---');
    console.log(JSON.parse(JSON.stringify(selectedIntern.value)));
    
    // Tampilkan notifikasi
    if (notificationTimeout) clearTimeout(notificationTimeout);
    notification.value = {
      show: true,
      message: `Evaluasi untuk ${selectedIntern.value.nama} berhasil disimpan dan dikunci.`
    };
    notificationTimeout = setTimeout(() => {
      notification.value.show = false;
    }, 4000);
  }
};
</script>
