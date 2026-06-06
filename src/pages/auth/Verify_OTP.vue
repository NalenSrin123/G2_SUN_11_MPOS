<template>
  <div class="page">
    <div class="card">

      <RouterLink class="go-back" to="/forgot_password">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Go back
      </RouterLink>

      <h1 class="title">Check your email</h1>
      <p class="subtitle">
        We sent a 6-digit code to your email. Enter it below to verify your identity.
      </p>

      <!-- OTP Inputs -->
      <div class="otp-group">
        <input
          v-for="i in 6"
          :key="i"
          class="otp-input"
          type="tel"
          maxlength="1"
          inputmode="numeric"
        />
      </div>

      <!-- Verify Button -->
      <button class="btn-verify" @click="router.push('/reset_password')">Verify</button>

      <!-- Resend -->
      <p class="resend-row">
        Didn't receive a code?&nbsp;
        <button class="resend-link" type="button">Resend code</button>
      </p>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap');

/* ── Page ── */
.page {
  font-family: 'DM Sans', sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: #f0f4ff;
  background-image:
    radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,99,235,.12) 0%, transparent 70%),
    radial-gradient(ellipse 40% 40% at 90% 90%, rgba(99,102,241,.08) 0%, transparent 70%);
}

/* ── Card ── */
.card {
  background: #fff;
  border-radius: 16px;
  padding: 40px 36px 36px;
  width: 100%;
  max-width: 460px;
  position: relative;
  box-shadow:
    0 4px 6px -1px rgba(37,99,235,.07),
    0 20px 50px -10px rgba(37,99,235,.13);
  border: 1px solid rgba(37,99,235,.08);
  overflow: hidden;
}
.card::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 3px;
  background: linear-gradient(90deg, #2563eb, #6366f1, #8b5cf6);
}

/* ── Go Back ── */
.go-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: #2563eb;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-bottom: 28px;
  text-decoration: none;
}

/* ── Heading ── */
.title {
  font-size: 26px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -.4px;
  margin: 0 0 10px;
}
.subtitle {
  font-size: 14.5px;
  color: #64748b;
  line-height: 1.65;
  margin: 0 0 28px;
}

/* ── OTP ── */
.otp-group {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-bottom: 24px;
}
.otp-input {
  width: 100%;
  height: 58px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-family: 'DM Mono', monospace;
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  color: #0f172a;
  background: #fafbff;
  outline: none;
  transition: border-color .18s, box-shadow .18s, background .18s;
  -moz-appearance: textfield;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button { -webkit-appearance: none; }
.otp-input:focus {
  border-color: #2563eb;
  background: #eff6ff;
  box-shadow: 0 0 0 4px rgba(37,99,235,.12);
}

/* ── Button ── */
.btn-verify {
  width: 100%;
  height: 52px;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(37,99,235,.3);
  margin-bottom: 20px;
  transition: background .18s, transform .12s;
}
.btn-verify:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

/* ── Resend ── */
.resend-row {
  text-align: center;
  font-size: 14px;
  color: #64748b;
  margin: 0;
}
.resend-link {
  background: transparent;
  border: 0;
  color: #2563eb;
  font-family: inherit;
  font-size: inherit;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

/* ── Mobile ── */
@media (max-width: 480px) {
  .card {
    padding: 32px 20px 28px;
    border-radius: 14px;
  }
  .title { font-size: 22px; }
  .otp-group { gap: 8px; }
  .otp-input {
    height: 48px;
    font-size: 18px;
    border-radius: 8px;
  }
  .btn-verify { height: 48px; font-size: 14px; }
}
</style>
