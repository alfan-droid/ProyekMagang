<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import MahasiswaLayout from '@/layouts/MahasiswaLayout.vue'
import MitraLayout from '@/layouts/MitraLayout.vue'
import AdminDosenLayout from '@/layouts/AdminDosenLayout.vue'

const layouts = {
  AuthLayout,
  MahasiswaLayout,
  MitraLayout,
  AdminDosenLayout
}

const route = useRoute()
const layout = computed(() => {
  return layouts[route.meta.layout || 'AuthLayout']
})
</script>
