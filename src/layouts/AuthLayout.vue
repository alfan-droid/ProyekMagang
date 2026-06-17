<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Decorative Elements -->
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div class="absolute top-1/3 right-1/4 w-64 h-64 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      <div class="relative glass rounded-2xl p-8 shadow-xl">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-slate-800 tracking-tight">SIMAGANG</h1>
          <p class="text-slate-500 mt-2">Sistem Informasi Manajemen Magang</p>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
// Auth layout wrapper
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
