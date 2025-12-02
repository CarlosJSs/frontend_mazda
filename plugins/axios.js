import axios from 'axios'

export default defineNuxtPlugin(() => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:1906/api'
  })

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('Axios error:', error)
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      axios: axiosInstance,
    }
  }
})
