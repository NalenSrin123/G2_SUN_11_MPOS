
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md border border-gray-100">
      
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">Reset your password</h2>
        <p class="mt-2 text-sm text-gray-600">
          Please enter your new password below.
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleResetPassword">
        
        <div v-if="errorMessage" class="p-4 text-sm text-red-700 bg-red-50 rounded-lg" role="alert">
          {{ errorMessage }}
        </div>
        
        <div v-if="successMessage" class="p-4 text-sm text-green-700 bg-green-50 rounded-lg" role="alert">
          {{ successMessage }}
        </div>

        <div class="space-y-4 rounded-md shadow-sm">
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="••••••••"
              :disabled="isSubmitting"
            />
          </div>

          <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              id="confirm-password"
              v-model="confirmPassword"
              type="password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="••••••••"
              :disabled="isSubmitting"
            />
          </div>
        </div>

        <div class="text-xs text-gray-500 flex flex-col space-y-1">
          <span :class="isPasswordValid ? 'text-green-600' : 'text-gray-500'">
            ✓ At least 8 characters
          </span>
          <span :class="doPasswordsMatch && confirmPassword ? 'text-green-600' : 'text-gray-500'">
            ✓ Passwords match
          </span>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <svg 
              v-if="isSubmitting" 
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            
            {{ isSubmitting ? 'Updating password...' : 'Reset Password' }}
          </button>
        </div>
      </form>
      
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'

// State management
const password = ref('')
const confirmPassword = ref('')
const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Simple validation: Password must be at least 8 characters
const isPasswordValid = computed(() => password.value.length >= 8)

// Check if both passwords match
const doPasswordsMatch = computed(() => password.value === confirmPassword.value)

// Form submission handler
const handleResetPassword = async () => {
  // Reset previous messages
  errorMessage.value = ''
  successMessage.value = ''

  // Client-side validation guards
  if (!isPasswordValid.value) {
    errorMessage.value = 'Password must be at least 8 characters long.'
    return
  }

  if (!doPasswordsMatch.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  try {
    isSubmitting.value = true
    
    // Simulate API Call (Replace with your actual Axios/Fetch request)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    successMessage.value = 'Your password has been successfully reset!'
    // Clear fields on success
    password.value = ''
    confirmPassword.value = ''
  } catch (error) {
    errorMessage.value = 'Something went wrong. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script> 