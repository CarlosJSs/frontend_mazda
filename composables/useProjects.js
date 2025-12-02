export const useProjects = () => {
  const { $axios } = useNuxtApp()

  const proyectos = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchProyectos = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await $axios.get('/proyecto')
      
      if (data.success) {
        proyectos.value = data.proyectos
      } else {
        error.value = 'No se pudieron cargar los proyectos'
      }
    } catch (err) {
      console.error('Error obteniendo proyectos:', err)
      error.value = err.response?.data?.message || 'Error de conexión con el servidor'
    } finally {
      loading.value = false
    }
  }

  return {
    proyectos,
    loading,
    error,
    fetchProyectos
  }
}