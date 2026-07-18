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

          <!-- 👇 សារកំហុសពេល email/password ខុស -->
          <p v-if="errorMessage" class="text-sm font-medium text-red-600">
            {{ errorMessage }}
          </p>

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
import { useRouter, useRoute } from 'vue-router'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { loginUser } from '@/services/api' // 👈 ប្រើ function ដែលមានស្រាប់ក្នុង services/api.js

const router = useRouter()
const route = useRoute()
const loading = ref(false)
const errorMessage = ref('')

const form = reactive({
  email: '',
  password: '',
})

const onSubmit = async () => {
  if (!form.email || !form.password || loading.value) return

  loading.value = true
  errorMessage.value = ''

  try {
    // 🔗 ហៅ /auth/login តាមរយៈ loginUser() ដែលមានស្រាប់ក្នុង services/api.js
    const data = await loginUser(form.email, form.password)

    // ⚠️ ពិនិត្យ console.log(data) ម្តងសិន ដើម្បីដឹងច្បាស់ថា token នៅត្រង់ណា
    // (ជាទូទៅអាចជា data.token, data.accessToken, ឬ data.data.token អាស្រ័យលើ backend)
    const token = data.token || data.accessToken || data?.data?.token

    if (!token) {
      throw new Error('No token returned from server')
    }

    // ✅ Login ជោគជ័យ -> រក្សាទុក token (key ត្រូវតែដូចគ្នានឹង router.js គឺ "auth_token")
    localStorage.setItem('auth_token', token)

    // ចូល dashboard, ឬត្រឡប់ទៅ path ដើមប្រសិនបើមាន ?redirect= (ពី router guard)
    const redirectPath = route.query.redirect || '/dashboard'
    router.push(redirectPath)
  } catch (err) {
    // ❌ Email ឬ password ខុស (ឬមិនមាន token) -> នៅតែលើទំព័រ login, បង្ហាញកំហុស, មិនចូល dashboard ទេ
    errorMessage.value =
      err?.response?.data?.message || 'អ៊ីមែល ឬ ពាក្យសម្ងាត់មិនត្រឹមត្រូវ'
  } finally {
    loading.value = false
  }
}
</script>