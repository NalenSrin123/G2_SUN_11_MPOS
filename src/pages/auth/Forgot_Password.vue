<template>
    <div class="w-full h-screen py-5 bg-zinc-100 flex justify-center items-center">
        <div class="md:w-[30%] lg:w-[25%] w-[90%] p-6 bg-white rounded-lg shadow-md">
            <div class="space-y-6">
                <div class="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-colors">
                    <span>
                        <i class="fa-solid fa-arrow-left text-sm"></i>
                    </span>
                    <RouterLink to="/login">Go back</RouterLink>
                </div>

                <div class="space-y-2">
                    <h1 class="font-bold text-2xl text-zinc-800">Forgot password?</h1>
                    <p class="text-zinc-500 text-sm leading-relaxed">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                <form @submit.prevent="handleSubmit" class="w-full flex flex-col gap-4">
                    <div class="flex flex-col gap-1.5">
                        <label for="email" class="text-sm font-medium text-zinc-700">Email Address</label>
                        <input 
                            id="email"
                            v-model="email"
                            class="border px-4 py-2.5 rounded-lg outline-none border-zinc-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm" 
                            type="email" 
                            placeholder="name@company.com"
                            required
                        >
                    </div>

                    <button 
                        type="submit" 
                        class="rounded-lg w-full py-2.5 mt-2 font-medium hover:bg-blue-700 active:scale-[0.98] duration-200 text-white bg-blue-600 shadow-sm shadow-blue-200"
                    >
                        Send reset link
                    </button>
                </form>
            </div>  
        </div>
    </div>
</template>

<script setup>      
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')

const handleSubmit = () => {
    console.log('Sending reset link to:', email.value)
    router.push('/verify_otp')
}
</script>
