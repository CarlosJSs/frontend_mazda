<template>
  <div class="pageCont">
    <LoginForm @loginEvent="handleLogin" />
  </div>
</template>

<script setup>
  import { toast } from 'vue3-toastify'
  import LoginForm from '@/components/loginForm.vue'

  definePageMeta({
    layout: 'login'
  })

  const { login } = useAuth()

  const handleLogin = async (credentials) => {
    try {
      await login(credentials)
    } catch (error) {
      toast.error(error.message);
    }
  }

</script>

<style scoped>
.pageCont {
  width: 90%;
}
</style>