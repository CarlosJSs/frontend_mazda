export const useAuth = () => {
  const user = useState('user', () => null)
  const { $axios } = useNuxtApp()
  const router = useRouter()

  const login = async (credentials) => {
    try {
      const { data } = await $axios.post('/auth/login', {
        usuario: credentials.usuario,
        contrasena: credentials.contrasena,
      })

      const token = useCookie('token', { maxAge: 7200 })
      const userID = useCookie('userID', { maxAge: 7200 })
      const rol = useCookie('rol', { maxAge: 7200 })

      token.value = data.token
      userID.value = data.usuarioID
      rol.value = data.usuarioRol
      
      user.value = { id: data.usuarioID, rol: data.usuarioRol }

      await router.push('/proyecto')

      return data
    }catch (error) {
      let errorMessage = 'Error al iniciar sesion'

      if (error.response && error.response.data) {
        errorMessage = error.response.data?.message || (error.response.status === 401 ? 'Credenciales invalidas' : errorMessage)

        throw new Error(errorMessage)
      }
    }
  }

  const logout = async () => {
    const token = useCookie('token')
    const userID = useCookie('userID')
    const rol = useCookie('rol')

    token.value = null
    userID.value = null
    rol.value = null

    user.value = null

    await router.replace('/')
    //window.location.reload()
  }

  return { user, login, logout }
}