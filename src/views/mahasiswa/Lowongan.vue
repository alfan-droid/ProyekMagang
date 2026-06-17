<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Eksplorasi Lowongan</h1>
        <p class="text-sm text-slate-500 mt-1">Temukan program magang yang sesuai dengan minat dan bidang Anda.</p>
      </div>
    </div>

    <!-- Search & Filter Section -->
    <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Search Bar -->
        <div class="flex-1 relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon class="h-5 w-5 text-slate-400" />
          </div>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Cari posisi atau nama perusahaan..." 
            class="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors bg-slate-50 focus:bg-white"
          />
        </div>

        <!-- Filters -->
        <div class="flex flex-col sm:flex-row gap-4 lg:w-1/2">
          <div class="flex-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BriefcaseIcon class="h-4 w-4 text-slate-400" />
            </div>
            <select 
              v-model="filterCategory"
              class="block w-full pl-9 pr-8 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none bg-slate-50 focus:bg-white transition-colors"
            >
              <option value="">Semua Bidang Usaha</option>
              <option v-for="cat in uniqueCategories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>

          <div class="flex-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPinIcon class="h-4 w-4 text-slate-400" />
            </div>
            <select 
              v-model="filterLocation"
              class="block w-full pl-9 pr-8 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none bg-slate-50 focus:bg-white transition-colors"
            >
              <option value="">Semua Lokasi</option>
              <option v-for="loc in uniqueLocations" :key="loc" :value="loc">{{ loc }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Job Cards List -->
    <div v-if="filteredJobs.length > 0" class="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
      <div 
        v-for="job in filteredJobs" 
        :key="job.id" 
        class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 group flex flex-col h-full"
      >
        <div class="flex items-start gap-4 mb-4">
          <!-- Company Initial/Logo -->
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shrink-0">
            <span class="font-bold text-blue-700 text-lg">{{ getInitial(job.company) }}</span>
          </div>
          
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
              {{ job.title }}
            </h3>
            <p class="text-sm font-medium text-slate-500 truncate">{{ job.company }}</p>
          </div>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-6">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
            <MapPinIcon class="w-3.5 h-3.5" />
            {{ job.location }}
          </span>
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-600">
            <BriefcaseIcon class="w-3.5 h-3.5" />
            {{ job.type }}
          </span>
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-600">
            <UsersIcon class="w-3.5 h-3.5" />
            Sisa Kuota: {{ job.quota }}
          </span>
        </div>

        <!-- Spacer to push button to bottom -->
        <div class="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div class="text-xs text-slate-500 font-medium">
            Bidang: <span class="text-slate-700">{{ job.category }}</span>
          </div>
          <RouterLink 
            :to="`/mahasiswa/lowongan/${job.id}`" 
            class="inline-flex items-center justify-center px-4 py-2 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg text-sm font-semibold transition-colors"
          >
            Lihat Detail
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="bg-white rounded-2xl border border-slate-200 py-16 px-4 text-center shadow-sm">
      <div class="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
        <SearchIcon class="w-8 h-8" />
      </div>
      <h3 class="text-lg font-bold text-slate-800 mb-1">Lowongan tidak ditemukan</h3>
      <p class="text-slate-500 text-sm max-w-sm mx-auto">
        Maaf, tidak ada posisi magang yang sesuai dengan kriteria pencarian dan filter Anda. Silakan coba kata kunci atau filter lain.
      </p>
      <button @click="resetFilters" class="mt-6 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
        Reset Pencarian
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SearchIcon, MapPinIcon, BriefcaseIcon, UsersIcon, SlidersHorizontalIcon } from '@lucide/vue'
import { RouterLink } from 'vue-router'

// Data Mockup Lowongan Magang
const jobs = [
  { id: 1, company: 'PT Nusantara Teknologi', title: 'Frontend Developer Intern', location: 'Yogyakarta', type: 'Full-time', quota: 3, category: 'Teknologi Informasi' },
  { id: 2, company: 'PT Kreatif Solusi', title: 'UI/UX Designer Intern', location: 'Yogyakarta', type: 'Full-time', quota: 2, category: 'Kreatif' },
  { id: 3, company: 'PT Digital Inovasi', title: 'Data Analyst Intern', location: 'Bandung', type: 'Remote', quota: 4, category: 'Teknologi Informasi' },
  { id: 4, company: 'PT Inovasi Mandiri', title: 'Digital Marketing Intern', location: 'Jakarta', type: 'Hybrid', quota: 2, category: 'Digital Marketing' }
]

// Filter States
const searchQuery = ref('')
const filterCategory = ref('')
const filterLocation = ref('')

// Utility untuk mengambil inisial perusahaan
const getInitial = (companyName) => {
  const words = companyName.replace('PT ', '').split(' ')
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase()
  }
  return companyName.substring(0, 2).toUpperCase()
}

// Ekstrak opsi unik untuk dropdown filter
const uniqueCategories = computed(() => {
  return [...new Set(jobs.map(job => job.category))].sort()
})

const uniqueLocations = computed(() => {
  return [...new Set(jobs.map(job => job.location))].sort()
})

// Fungsi Filter Utama (Frontend Search Engine)
const filteredJobs = computed(() => {
  return jobs.filter(job => {
    // 1. Filter Pencarian Teks
    const searchLower = searchQuery.value.toLowerCase().trim()
    const matchSearch = searchLower === '' || 
                        job.title.toLowerCase().includes(searchLower) || 
                        job.company.toLowerCase().includes(searchLower)
    
    // 2. Filter Kategori
    const matchCategory = filterCategory.value === '' || job.category === filterCategory.value
    
    // 3. Filter Lokasi
    const matchLocation = filterLocation.value === '' || job.location === filterLocation.value

    return matchSearch && matchCategory && matchLocation
  })
})

const resetFilters = () => {
  searchQuery.value = ''
  filterCategory.value = ''
  filterLocation.value = ''
}
</script>
