import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// ── Global styles ──────────────────────────────────────────────────────────────
import './style.css' // adjust or remove if your CSS entry is different

// ── Create & mount app ─────────────────────────────────────────────────────────
const app = createApp(App)

app.use(router)

app.mount('#app')