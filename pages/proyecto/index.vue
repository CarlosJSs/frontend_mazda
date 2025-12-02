<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Gestión de Proyectos</h1>
      </div>
    <div v-if="loading" class="text-center py-10">
      <p class="text-gray-600 text-lg animate-pulse">Cargando proyectos...</p>
    </div>
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
      <strong class="font-bold">Error: </strong>
      <span class="block sm:inline">{{ error }}</span>
    </div>
    <div v-else class="tablaContainer">
      <projectsTable :proyectos="proyectos" />
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import projectsTable from '~/components/projectsTable.vue';

  definePageMeta({
    layout: 'proyecto'
  })

  const { proyectos, loading, error, fetchProyectos } = useProjects()

  onMounted(async () => {
    await fetchProyectos()
  })
</script>

<style scoped>
.tablaContainer {
  
}
</style>