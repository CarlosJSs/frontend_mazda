<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-4xl font-bold text-gray-700">Gestión de Proyectos</h1>
    </div>
    <div v-if="loading || loadingUsuarios" class="text-center py-10">
      <p class="text-gray-600 text-lg animate-pulse">Cargando información...</p>
    </div>
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>
    <div v-else class="mainCont">
      <div class="flex justify-end gap-4 mb-4">
        <button 
          type="button" 
          class="flex items-center gap-2 text-white bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-2xl text-sm px-5 py-2.5 focus:outline-none transition-colors shadow-sm"
          @click="showFormProj = true"
        >
          <i class="fas fa-plus"></i>
          Nuevo Proyecto
        </button>
        <button 
          type="button" 
          class="flex items-center gap-2 text-white bg-yellow-600 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-2xl text-sm px-5 py-2.5 focus:outline-none transition-colors shadow-sm"
          @click="descargarProyectos"
        >
          <i class="fas fa-download"></i>
          Descargar
        </button>
      </div>
      <div class="tableCont">
        <projectsTable 
          :proyectos="proyectos" 
          :usuarios="usuarios"
        />
      </div>
    </div>

    <newProject
      :visible-new-proj="showFormProj"
      @close="showFormProj = false"
      @add-new-project="handleNewProject"
    />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import projectsTable from '~/components/projectsTable.vue';
  import newProject from '~/components/newProject.vue';

  definePageMeta({
    layout: 'proyecto'
  })

  const { proyectos, loading, error, fetchProyectos, createProyecto } = useProjects()
  const { usuarios, loadingUsuarios, fetchUsuarios } = useUsuarios()

  const showFormProj = ref(false)

  onMounted(async () => {
    await Promise.all([
      fetchProyectos(),
      fetchUsuarios()
    ])
  })

  const handleNewProject = async (newProjData) => {
    const payload = {
      area: newProjData.area, 
      titulo: newProjData.titulo,
      descripcion: newProjData.descripcion,
      id_encargado: newProjData.id_encargado,
      id_supervisor: newProjData.id_supervisor,
      id_aprobador: newProjData.id_aprobador,
      estatus: 'Nuevo'
    }

    const success = await createProyecto(payload)

    if (success) {
      showFormProj.value = false
      alert('Proyecto creado exitosamente')
    } else {
      alert('Hubo un problema al crear el proyecto.')
    }
  }

  const descargarProyectos = () => {
    console.log("Descargando proyectos...")
    alert("Descarga Excel")
  }
</script>

<style scoped>

</style>