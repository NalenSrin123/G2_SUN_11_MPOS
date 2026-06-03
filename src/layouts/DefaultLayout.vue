<template>
  <div style="min-height:100vh;background:#F8F9FB">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      auth_token: ''
    }
  },
  methods: {
    login() {
      localStorage.setItem('auth_token', 'dev')
      location.href = '/dashboard/orders'
    }
  }
}
</script>