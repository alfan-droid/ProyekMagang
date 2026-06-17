<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-800">Bimbingan Magang</h1>
      <p class="text-sm text-slate-500">Kelola dan pantau progress mahasiswa bimbingan Anda.</p>
    </div>

    <!-- Student List -->
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="student in students" :key="student.id" class="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:border-blue-300 transition-colors">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">
              {{ student.initial }}
            </div>
            <div>
              <h3 class="font-bold text-slate-800">{{ student.name }}</h3>
              <p class="text-xs text-slate-500">{{ student.nim }}</p>
            </div>
          </div>
          <span class="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded">Aktif</span>
        </div>
        
        <div class="space-y-2 mb-4">
          <div class="flex justify-between text-sm">
            <span class="text-slate-500">Perusahaan</span>
            <span class="font-medium text-slate-700 text-right">{{ student.company }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-slate-500">Posisi</span>
            <span class="font-medium text-slate-700 text-right">{{ student.position }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-slate-500">Laporan</span>
            <span class="font-medium text-amber-600 text-right">{{ student.reports_pending }} Perlu Ditinjau</span>
          </div>
        </div>

        <button class="w-full py-2 bg-slate-50 hover:bg-blue-50 text-blue-600 rounded-lg text-sm font-medium transition-colors">
          Lihat Detail & Laporan
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const students = [
  { id: 1, initial: 'BS', name: 'Budi Santoso', nim: '23.11.5438', company: 'PT Teknologi Cendana', position: 'Frontend Developer Intern', reports_pending: 1 },
  { id: 2, initial: 'SA', name: 'Siti Aminah', nim: '23.11.9999', company: 'PT Kreatif Solusi', position: 'UI/UX Designer', reports_pending: 0 },
  { id: 3, initial: 'DF', name: 'Dwi Fajri', nim: '20230022', company: 'Kreatif Studio', position: 'UI/UX Designer', reports_pending: 2 },
]
</script>
