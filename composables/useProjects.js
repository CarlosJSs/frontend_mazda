export const useProjects = () => {
  const { $axios } = useNuxtApp()

  const proyectos = useState('proyectos', () => [])
  const loading = useState('loading_proyectos', () => false)
  const error = useState('error_proyectos', () => null)

  const fetchProyectos = async () => {
    loading.value = true
    error.value = null
    
    const userID = useCookie('userID').value
    const userRol = useCookie('rol').value

    try {
      //el aprobador ve todo por defecto
      let endpoint = '/proyecto'

      if(userRol === 'Planeador') {
        endpoint = `/proyecto/encargado/${userID}`
      } else if (userRol === 'Supervisor') {
        endpoint = `/proyecto/supervisor/${userID}`
      }

      //traemos los proyectos de acuerdo el rol
      const { data } = await $axios.get(endpoint)

      if(data.success) {
        proyectos.value = data.projects
      } else {
        proyectos.value = []
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        proyectos.value = []
      } else {
        console.error('Error obteniendo proyectos: ', err)
        error.value = 'Error al cargar los proyectos'
      }
    } finally {
      loading.value = false
    }
  }

  const createProyecto = async (projectData) => {
    loading.value = true
    try {
      const userID = useCookie('userID').value
      projectData.id_encargado = userID

      await $axios.post('/proyecto/create', projectData)

      await fetchProyectos()
      
      return true
    } catch (err) {
      console.error('Error creando proyecto:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  const updateEstadoPry = async (id, nuevoEstatus) => {
    try {
      await $axios.put(`/proyecto/status/${id}`, {
        estatus: nuevoEstatus
      })

      const index = proyectos.value.findIndex(p => p.id === id)

      if(index != -1)  {
        proyectos.value[index] = {
          ...proyectos.value[index],
          estatus: nuevoEstatus
        }
      }

      return true
    } catch (err) {
      console.error('Error actualizando estatus: ', err)
      alert('Error al actualizar el estatus')
      return false
    }
  }

  const deleteProyecto = async (id) => {
    try {
      const userID = useCookie('userID').value

      //validamos que sea del propio usuario
      await $axios.delete(`/proyecto/${id}`, {
        data: {
          id_encargado: userID
        }
      })

      proyectos.value = proyectos.value.filter(p => p.id !== id)

      return true
    } catch (err) {
      console.error('Error eliminando proyecto: ', err)
      alert(err.response?.data?.message || 'Error al eliminar el proyecto')
      return false
    }
  }

  return {
    proyectos,
    loading,
    error,
    fetchProyectos,
    createProyecto,
    updateEstadoPry,
    deleteProyecto
  }
}