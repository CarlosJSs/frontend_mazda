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
          class="flex items-center gap-2 text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:ring-green-400 font-medium rounded-2xl text-sm px-5 py-2.5 focus:outline-none transition-colors shadow-sm"
          @click="descargarProyectos"
        >
          <i class="fas fa-download"></i>
          Descargar Excel
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
  import { onMounted, ref } from 'vue'
  import * as XLSX from 'xlsx'

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

  //tener nombre en lugar de id
  const getNombreUsuario = (id) => {
    if (!id) return 'N/A'
    const usuarioEncontrado = usuarios.value.find(user => user.id === id)
    return usuarioEncontrado ? usuarioEncontrado.nombre : 'Desconocido'
  }

  const descargarProyectos = () => {
    try {
      if (!proyectos.value || proyectos.value.length === 0) {
        alert("No hay datos para descargar")
        return
      }

      // mapeamos los datos para excel
      const datosParaExcel = proyectos.value.map(proj => ({
        'Código': proj.codigo,
        'Título': proj.titulo,
        'Área': proj.area,
        'Descripción': proj.descripcion,
        'Encargado': getNombreUsuario(proj.id_encargado),
        'Supervisor': getNombreUsuario(proj.id_supervisor),
        'Aprobador': getNombreUsuario(proj.id_aprobador),
        'Estatus': proj.estatus
      }))

      const ws = XLSX.utils.json_to_sheet(datosParaExcel)

      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, "Lista de Proyectos")

      const date = new Date().toISOString().slice(0,10)
      XLSX.writeFile(wb, `Reporte_Proyectos_${date}.xlsx`)

    } catch (e) {
      console.error("Error al generar Excel:", e)
      alert("Ocurrio un error al intentar descargar el archivo.")
    }
  }
</script>

<style scoped>

</style>