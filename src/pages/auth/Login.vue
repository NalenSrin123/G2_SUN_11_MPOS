<template>
  <div class="min-h-screen bg-slate-100">
    <div class="mx-auto flex min-h-screen max-w-md items-center px-4">
      <div class="w-full rounded-sm bg-white p-8 shadow-xl">
        <div class="mb-6 text-center">
          <h1 class="text-2xl font-semibold text-slate-900">Login</h1>
          <p class="mt-1 text-sm text-slate-500">Welcome back</p>
        </div>

        <form class="space-y-4" @submit.prevent="onSubmit">
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-700">Email</label>
            <BaseInput v-model="form.email" type="email" placeholder="you@example.com" required />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-700">Password</label>
            <BaseInput v-model="form.password" type="password" placeholder="Your password" required />
          </div>

          <div class="text-right">
            <RouterLink class="text-sm font-semibold text-blue-600 hover:text-blue-700" to="/forgot_password">
              Forgot password?
            </RouterLink>
          </div>

          <BaseButton
            text="Login"
            color="primary"
            :loading="loading"
            :disabled="!form.email || !form.password"
            @click="onSubmit"
          />
        </form>

        <p class="mt-6 text-center text-sm text-slate-600">
          Don't have an account?
          <RouterLink class="font-semibold text-blue-600 hover:text-blue-700" to="/register">Create account</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const router = useRouter()
const loading = ref(false)

const form = reactive({
  email: '',
  password: '',
})

const onSubmit = async () => {
  if (!form.email || !form.password || loading.value) return

  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 600))
  loading.value = false
  router.push('/dashboard')
}
</script>
