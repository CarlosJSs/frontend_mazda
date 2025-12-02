<template>
  <div class="pageCont">
    <LoginForm @loginEvent="handleLogin" />
  </div>
</template>

<script setup>
  import LoginForm from '@/components/loginForm.vue'

  definePageMeta({
    layout: 'login'
  })

  const { login } = useAuth()

  const handleLogin = async (credentials) => {
    try {
      await login(credentials)
    } catch (error) {
      alert(error.message)
    }
  }

</script>

<style scoped>
.pageCont {
  width: 90%;
}
</style>