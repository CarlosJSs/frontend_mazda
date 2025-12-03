import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:1906/api'
  })

  axiosInstance.interceptors.request.use((config) => {
    const token = useCookie('token')

    if(token.value) {
      config.headers.Authorization = `Bearer ${token.value}`
    }

    return config
  }), (error) => {
    return Promise.reject(error)
  }

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if(error.response && error.response.status === 401){
        console.log("Sesion expirada o invalida")
        const router = useRouter()
        router.push('/')
      }

      return Promise.reject(error)
    }
  )

  return {
    provide: {
      axios: axiosInstance,
    }
  }
})
