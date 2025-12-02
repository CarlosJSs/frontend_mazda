import { ref } from 'vue'

export const useUsuarios = () => {
  const { $axios } = useNuxtApp()

  const usuarios = ref([])
  const loadingUsuarios = ref(false)
  
  const fetchUsuarios = async () => {
    loadingUsuarios.value = true
    try {
      const { data } = await $axios.get('/usuario')
      if (data.success) {
        usuarios.value = data.usuarios
      }
    } catch (error) {
      console.error('Error cargando usuarios:', error)
    } finally {
      loadingUsuarios.value = false
    }
  }

  const getUsuariosByRol = (rol) => {
    return usuarios.value.filter(u => u.rol === rol)
  }

  return {
    usuarios,
    loadingUsuarios,
    fetchUsuarios,
    getUsuariosByRol
  }
}