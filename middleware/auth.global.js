export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token')

  // si no hay token lo envia al login
  if (to.path !== '/' && !token.value) {
    return navigateTo('/')
  }

  // si hay token ignora el login
  if (to.path === '/' && token.value) {
    return navigateTo('/proyecto')
  }
})