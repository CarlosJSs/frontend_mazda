<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-4xl font-bold text-gray-700">Gestión de Proyectos</h1>
      <p v-if="nameUsuario" class="text-gray-800 text-lg font-medium mt-2">
        Bienvenido, 
        <span class="font-semibold text-gray-700">
          {{ nameUsuario }}
        </span>
      </p>
      <p class="whitespace-nowrap text-sm leading-6 font-semibold mt-2">
        Ha accedido como: 
        <span class="mx-1 px-2 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-800">
          {{ userRol }}
        </span>
      </p> 
    </div>
    <div v-if="loading || loadingUsuarios" class="text-center py-10">
      <p class="text-gray-600 text-lg animate-pulse">Cargando información...</p>
    </div>
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>
    <div v-else class="mainCont mt-8">
      <div class="flex justify-between items-center mb-4">

        <div>
          <button 
            type="button" 
            class="flex items-center gap-2 text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:ring-green-400 font-medium rounded-2xl text-sm px-5 py-2.5 focus:outline-none transition-colors shadow-sm"
            @click="descargarProyectos"
          >
            <i class="fas fa-download"></i>
            Descargar Excel
          </button>
        </div>

        <div class="flex gap-4">
          <button 
            v-if="userRol === 'Planeador'"
            type="button" 
            class="flex items-center gap-2 text-white bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-2xl text-sm px-5 py-2.5 focus:outline-none transition-colors shadow-sm"
            @click="showFormProj = true"
          >
            <i class="fas fa-plus"></i>
            Nuevo Proyecto
          </button>
          <button 
            type="button" 
            class="flex items-center gap-2 text-white bg-black hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-2xl text-sm px-5 py-2.5 focus:outline-none transition-colors shadow-sm"
            @click="handleLogout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
              <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div class="tableCont">
        <projectsTable 
          :proyectos="proyectos" 
          :usuarios="usuarios"
          :user-rol="userRol"
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
  import { toast } from 'vue3-toastify'
  import { onMounted, ref, computed } from 'vue'
  import * as XLSX from 'xlsx'

  import projectsTable from '~/components/projectsTable.vue';
  import newProject from '~/components/newProject.vue';

  definePageMeta({
    layout: 'proyecto'
  })

  const { proyectos, loading, error, fetchProyectos, createProyecto } = useProjects()
  const { usuarios, loadingUsuarios, fetchUsuarios } = useUsuarios()
  const { logout } = useAuth()

  const showFormProj = ref(false)
  const userRol = useCookie('rol')
  const userID = useCookie('userID')

  const nameUsuario = computed(() => {
    if(!usuarios.value || usuarios.value.length === 0) return ''

    const myUsuario = usuarios.value.find(u => u.id === userID.value)

    return myUsuario ? myUsuario.nombre : ''
  })

  onMounted(async () => {
    await Promise.all([
      fetchProyectos(),
      fetchUsuarios()
    ])
  })

  const handleLogout = async () => {
    const confirm = window.confirm("¿Desea cerrar la sesión?")
    if(confirm) {
      await logout()
    }
  }

  const handleNewProject = async (newProjData) => {
    const payload = {
      area: newProjData.area, 
      titulo: newProjData.titulo,
      descripcion: newProjData.descripcion,
      id_supervisor: newProjData.id_supervisor,
      id_aprobador: newProjData.id_aprobador,
      estatus: 'Nuevo'
    }

    const success = await createProyecto(payload)

    if (success) {
      showFormProj.value = false
      toast.success('Proyecto creado exitosamente', {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error('Hubo un problema al crear el proyecto.');
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
        toast.error('No hay datos para descargar');
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
      toast.error('Error al generar el archivo Excel', e);
      alert("Ocurrio un error al intentar descargar el archivo.")
    }
  }
</script>

<style scoped>

</style>