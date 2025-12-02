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

      const token = useCookie('token', { maxAge: 86400 })
      const userID = useCookie('userID', { maxAge: 86400 })
      const rol = useCookie('rol', { maxAge: 86400 })

      token.value = data.token
      userID.value = data.userId
      rol.value = data.userRol
      
      user.value = { id: data.userId, rol: data.userRol }

      //redireccion
      // if (data.userRol === 'admin'){
      //   await router.push('/admin')
      // } else {
      //   await router.push('/cliente')
      // }

      await router.push('/proyecto')

      return data
    }catch (error) {
      let errorMessage = 'Error en el login'

      if (error.response) {
        errorMessage = error.response.data?.message || (error.response.status === 401 ? 'Credenciales invalidas' : errorMessage)

        throw new Error(errorMessage)
      }
    }
  }

  const logout = () => {
    const token = useCookie('token')
    const userID = useCookie('userID')
    const rol = useCookie('rol')

    token.value = null
    userID.value = null
    rol.value = null

    user.value = null

    router.replace('/')
    router.go(0)
  }

  return { user, login, logout }
}