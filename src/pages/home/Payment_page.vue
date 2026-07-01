  <script>
    const goToPayment = () => {
  router.push('/payment-page')
}
  </script>
<template>
  <div class="page-wrap">
    <div class="screen">
      <!-- Header -->
      <div class="header">
        <button class="header-btn" aria-label="Go back"  @click="$router.push('/Cart')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="header-title">Payment Method</h1>
        <button class="header-btn" aria-label="Notifications">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="content">
        <!-- Order Card -->
        <div class="order-card">
          <div class="order-top">
            <span class="order-label">Order Summary</span>
            <span class="order-badge">LuxDine Premium</span>
          </div>
          <div class="order-amount">$200.60</div>
          <div class="order-sub">
            <span>2 items</span>
            <span class="dot"></span>
            <span>Dinner service</span>
          </div>
        </div>

        <!-- Saved Methods -->
        <div class="section">
          <p class="section-label">Saved Methods</p>
          <label
            class="method-card"
            :class="{ selected: selected === 'visa' }"
            @click="selected = 'visa'"
          >
            <div class="method-left">
              <div
                class="method-icon"
                :class="selected === 'visa' ? 'icon-active' : 'icon-idle'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              </div>
              <div class="method-info">
                <p class="method-name">Visa ···· 4242</p>
                <p class="method-sub">Expires 12/26</p>
              </div>
            </div>
            <div class="radio-dot" :class="{ checked: selected === 'visa' }"></div>
          </label>
        </div>

        <!-- Digital Wallets -->
        <div class="section">
          <p class="section-label">Digital Wallets</p>
          <div class="methods-list">
            <label
              v-for="wallet in wallets"
              :key="wallet.id"
              class="method-card"
              :class="{ selected: selected === wallet.id }"
              @click="selected = wallet.id"
            >
              <div class="method-left">
                <div
                  class="method-icon brand-icon"
                  :class="{ 'icon-active-border': selected === wallet.id }"
                >
                  <!-- ABA -->
                  <svg
                    v-if="wallet.id === 'aba'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="42"
                    height="42"
                    viewBox="0 0 56 56"
                    fill="none"
                  >
                    <rect width="56" height="56" rx="12" fill="url(#abaGrad)" />
                    <defs>
                      <linearGradient id="abaGrad" x1="0" y1="0" x2="56" y2="56">
                        <stop offset="0%" stop-color="#2a6496" />
                        <stop offset="100%" stop-color="#1a4a72" />
                      </linearGradient>
                    </defs>
                    <text
                      x="7"
                      y="34"
                      font-family="Arial Black, Arial"
                      font-weight="900"
                      font-size="17"
                      fill="#ffffff"
                      letter-spacing="-0.5"
                    >
                      ABA
                    </text>
                    <rect x="40" y="16" width="4" height="10" rx="1" fill="#e63946" />
                  </svg>

                  <!-- KHQR -->
                  <svg
                    v-else-if="wallet.id === 'khqr'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="42"
                    height="42"
                    viewBox="0 0 56 56"
                    fill="none"
                  >
                    <rect
                      width="56"
                      height="56"
                      rx="12"
                      fill="#ffffff"
                      stroke="#e2e8f0"
                      stroke-width="1"
                    />
                    <rect
                      x="8"
                      y="8"
                      width="14"
                      height="14"
                      rx="2"
                      fill="none"
                      stroke="#1a1a1a"
                      stroke-width="2.5"
                    />
                    <rect x="11" y="11" width="8" height="8" rx="1" fill="#1a1a1a" />
                    <rect
                      x="34"
                      y="8"
                      width="14"
                      height="14"
                      rx="2"
                      fill="none"
                      stroke="#1a1a1a"
                      stroke-width="2.5"
                    />
                    <rect x="37" y="11" width="8" height="8" rx="1" fill="#1a1a1a" />
                    <rect
                      x="8"
                      y="34"
                      width="14"
                      height="14"
                      rx="2"
                      fill="none"
                      stroke="#1a1a1a"
                      stroke-width="2.5"
                    />
                    <rect x="11" y="37" width="8" height="8" rx="1" fill="#1a1a1a" />
                    <rect x="26" y="8" width="4" height="4" rx="0.5" fill="#1a1a1a" />
                    <rect x="26" y="14" width="4" height="4" rx="0.5" fill="#1a1a1a" />
                    <rect x="34" y="26" width="4" height="4" rx="0.5" fill="#1a1a1a" />
                    <rect x="40" y="26" width="4" height="4" rx="0.5" fill="#1a1a1a" />
                    <rect x="34" y="32" width="4" height="4" rx="0.5" fill="#1a1a1a" />
                    <rect x="26" y="34" width="4" height="4" rx="0.5" fill="#e63946" />
                    <rect x="26" y="40" width="4" height="4" rx="0.5" fill="#1a1a1a" />
                    <rect x="32" y="40" width="4" height="4" rx="0.5" fill="#1a1a1a" />
                    <rect x="44" y="34" width="4" height="4" rx="0.5" fill="#1a1a1a" />
                    <rect x="44" y="44" width="4" height="4" rx="0.5" fill="#1a1a1a" />
                    <rect x="38" y="44" width="4" height="4" rx="0.5" fill="#1a1a1a" />
                    <text
                      x="28"
                      y="53"
                      font-family="Arial"
                      font-weight="700"
                      font-size="5"
                      fill="#e63946"
                      text-anchor="middle"
                      letter-spacing="1"
                    >
                      KHQR
                    </text>
                  </svg>

                  <!-- PayPal -->
                  <svg
                    v-else-if="wallet.id === 'paypal'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="42"
                    height="42"
                    viewBox="0 0 56 56"
                    fill="none"
                  >
                    <rect width="56" height="56" rx="12" fill="#003087" />
                    <text
                      x="10"
                      y="38"
                      font-family="Arial Black, Arial"
                      font-weight="900"
                      font-size="30"
                      fill="#009cde"
                      opacity="0.55"
                    >
                      P
                    </text>
                    <text
                      x="16"
                      y="40"
                      font-family="Arial Black, Arial"
                      font-weight="900"
                      font-size="30"
                      fill="#ffffff"
                    >
                      P
                    </text>
                  </svg>
                </div>
                <div class="method-info">
                  <p class="method-name">{{ wallet.name }}</p>
                  <p class="method-sub">{{ wallet.sub }}</p>
                </div>
              </div>
              <div class="radio-dot" :class="{ checked: selected === wallet.id }"></div>
            </label>
          </div>
        </div>

        <!-- Others -->
        <div class="section">
          <p class="section-label">Others</p>
          <div class="methods-list">
            <label
              v-for="other in others"
              :key="other.id"
              class="method-card"
              :class="{ selected: selected === other.id }"
              @click="selected = other.id"
            >
              <div class="method-left">
                <div
                  class="method-icon"
                  :class="selected === other.id ? 'icon-active' : 'icon-idle'"
                >
                  <!-- Credit/Debit Card icon -->
                  <svg
                    v-if="other.id === 'card'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                    <line x1="5" y1="15" x2="9" y2="15" />
                  </svg>
                  <!-- Cash icon -->
                  <svg
                    v-else-if="other.id === 'cash'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="1" y="6" width="22" height="13" rx="2" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M17 6V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1" />
                  </svg>
                </div>
                <div class="method-info">
                  <p class="method-name">{{ other.name }}</p>
                  <p class="method-sub">{{ other.sub }}</p>
                </div>
              </div>
              <div class="radio-dot" :class="{ checked: selected === other.id }"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="footer-row">
          <div>
            <p class="total-label">Total Amount</p>
            <p class="total-amount">$200.60</p>
          </div>
          <div class="fee-note">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Platform fee included
          </div>
        </div>
        
        <button class="pay-btn"  @click="$router.push('/scan-to-pay')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Confirm &amp; Pay
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selected = ref("visa");

const wallets = [
  { id: "aba", name: "ABA Pay", sub: "Instant transfer" },
  { id: "khqr", name: "KHQR", sub: "Scan to pay" },
  { id: "paypal", name: "PayPal", sub: "Fast & secure" },
];

const others = [
  { id: "card", name: "Credit/Debit Card", sub: "Visa, Mastercard, JCB" },
  { id: "cash", name: "Cash", sub: "Pay on delivery" },
];
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ─── Layout ─────────────────────────────────────────── */
.page-wrap {
  min-height: 100vh;
  background: #e2e8f0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.screen {
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

/* ─── Header ─────────────────────────────────────────── */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: #ffffff;
  border-bottom: 0.5px solid rgba(24, 95, 165, 0.15);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-title {
  font-size: 16px;
  font-weight: 600;
  color: #185fa5;
  letter-spacing: -0.2px;
}

.header-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #334155;
  flex-shrink: 0;
}

/* ─── Content ────────────────────────────────────────── */
.content {
  flex: 1;
  padding: 28px 20px 34px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;
  background: #daeaf9;
}

/* ─── Order Card ─────────────────────────────────────── */
.order-card {
  background: linear-gradient(135deg, #185fa5 0%, #0c447c 100%);
  border-radius: 20px;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.order-card::before,
.order-card::after {
  content: "";
  position: absolute;
  border-radius: 50%;
}

.order-card::before {
  top: -40px;
  right: -40px;
  width: 140px;
  height: 140px;
  background: rgba(255, 255, 255, 0.07);
}

.order-card::after {
  bottom: -30px;
  right: 30px;
  width: 90px;
  height: 90px;
  background: rgba(255, 255, 255, 0.05);
}

.order-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.order-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

.order-badge {
  background: rgba(255, 255, 255, 0.18);
  color: #ffffff;
  font-size: 11px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 100px;
  border: 0.5px solid rgba(255, 255, 255, 0.25);
}

.order-amount {
  font-size: 38px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -1px;
  margin-bottom: 8px;
}

.order-sub {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
}

/* ─── Section ────────────────────────────────────────── */
.section-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #9fb0c9;
  font-weight: 700;
  margin-bottom: 14px;
}

.methods-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* ─── Method Card ────────────────────────────────────── */
.method-card {
  background: #eef5ff;
  border-radius: 16px;
  border: 1px solid rgba(24, 95, 165, 0.12);
  padding: 16px 18px;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.15s;
  box-shadow: 0 2px 10px rgba(24, 95, 165, 0.06);
}

.method-card.selected {
  border: 1.5px solid #185fa5;
  background: #dbeafe;
}

.method-left {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
}

/* ─── Icons ──────────────────────────────────────────── */
.method-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.icon-active {
  background: #dbeafe;
  color: #185fa5;
}

.icon-idle {
  background: #c8dff4;
  color: #7faed4;
}

.brand-icon {
  background: transparent !important;
  border-radius: 12px;
}

.icon-active-border {
  box-shadow: 0 0 0 2px #185fa5;
}

/* ─── Method Info ────────────────────────────────────── */
.method-name {
  font-size: 15px;
  font-weight: 700;
  color: #16233b;
}

.method-sub {
  font-size: 12px;
  color: #7f96ba;
  margin-top: 3px;
}

/* ─── Radio ──────────────────────────────────────────── */
.radio-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #c8d5e6;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.15s;
}

.radio-dot.checked {
  border-color: #185fa5;
  background: #185fa5;
}

.radio-dot.checked::after {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ffffff;
}

/* ─── Footer ─────────────────────────────────────────── */
.footer {
  background: #ffffff;
  border-top: 0.5px solid rgba(0, 0, 0, 0.08);
  padding: 16px 20px;
  padding-bottom: max(20px, env(safe-area-inset-bottom));
}

.footer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.total-label {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 2px;
}

.total-amount {
  font-size: 28px;
  font-weight: 700;
  color: #185fa5;
}

.fee-note {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #7f96ba;
}

.pay-btn {
  width: 100%;
  background: #185fa5;
  color: #ffffff;
  border: none;
  border-radius: 14px;
  padding: 15px;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.15s;
}

.pay-btn:hover {
  background: #0c447c;
}

.pay-btn:active {
  transform: scale(0.98);
}

/* ─── Responsive ─────────────────────────────────────── */
@media (min-width: 768px) {
  .page-wrap {
    padding: 24px;
    align-items: center;
  }

  .screen {
    max-width: 430px;
    min-height: auto;
    border-radius: 28px;
    box-shadow: 0 12px 42px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
}
</style>
