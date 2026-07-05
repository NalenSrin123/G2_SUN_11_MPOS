<!-- script for goto home page -->
<script>
export default {
  methods: {
    home() {
      this.$router.push('/home');
    }
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-gray-100 md:py-8 md:px-4 flex items-center justify-center font-sans select-none">
    <div
      class="w-full max-w-md md:max-w-xl bg-gray-50 min-h-screen md:min-h-212.5 flex flex-col justify-between shadow-2xl md:rounded-3xl overflow-hidden border border-gray-100">
      <header
        class="bg-white px-6 py-4 md:py-5 flex items-center justify-between border-b border-gray-100">
        <button class="text-emerald-800 hover:opacity-70 transition p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            class="w-6 h-6 md:w-7">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
        <h1
          class="text-xl md:text-2xl font-bold text-emerald-900 tracking-tight">
          Scan to Pay
        </h1>
        <button
          class="text-emerald-800 relative hover:opacity-70 transition p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-6 h-6 md:w-7">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
        </button>
      </header>

      <main class="flex-1 p-5 md:p-8 space-y-5 md:space-y-6 overflow-y-auto">
        <section
          class="bg-emerald-50/50 rounded-2xl p-5 md:p-6 border-l-4 border-emerald-800 shadow-sm relative">
          <div class="flex justify-between items-start">
            <div>
              <span
                class="text-xs md:text-sm font-bold text-emerald-800/70 tracking-wider uppercase"
                >Total Amount</span
              >
              <h2
                class="text-4xl md:text-5xl font-extrabold text-emerald-800 mt-1">
                ${{ orderDetails.amount.toFixed(2) }}
              </h2>
            </div>
            <span
              class="bg-emerald-500 text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              {{ orderDetails.table }}
            </span>
          </div>

          <div
            class="mt-4 md:mt-5 pt-3 border-t border-emerald-100 flex items-center text-sm md:text-base text-gray-600 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4 md:w-5 md:h-5 text-emerald-800">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            <span
              >Order #{{ orderDetails.id }} •
              {{ orderDetails.merchantName }}</span
            >
          </div>
        </section>

        <section
          class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col items-center relative">
          <div
            class="absolute top-4 right-4 bg-red-50 text-red-500 font-semibold text-xs md:text-sm px-3 py-1 rounded-full flex items-center gap-1 border border-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="w-3.5 h-3.5 md:w-4 md:h-4">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
            {{ formattedTime }}
          </div>

          <div
            class="w-56 h-56 md:w-64 md:h-64 mt-6 bg-linear-to-br from-emerald-950 to-emerald-900 rounded-2xl p-6 md:p-8 flex items-center justify-center relative shadow-inner">
            <div
              class="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-emerald-400 rounded-tl"></div>
            <div
              class="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-emerald-400 rounded-tr"></div>
            <div
              class="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-emerald-400 rounded-bl"></div>
            <div
              class="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-emerald-400 rounded-br"></div>

            <div
              class="bg-white p-3 rounded-2xl shadow-md w-full h-full flex items-center justify-center">
              <img
                :src="qrCodeUrl"
                alt="Payment QR Code"
                class="w-36 h-36 md:w-44 md:h-44 object-contain" />
            </div>
          </div>

          <div class="text-center mt-6 space-y-2">
            <h3 class="text-xl md:text-2xl font-bold text-gray-800">
              Payment Code
            </h3>
            <p
              class="text-sm md:text-base text-gray-500 max-w-xs md:max-w-sm mx-auto leading-relaxed">
              Open your banking app and scan this QR code to complete payment
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3 w-full mt-6 md:mt-8">
            <button
              @click="handleSaveQR"
              class="flex items-center justify-center gap-2 border border-gray-200 py-3 md:py-4 rounded-xl text-sm md:text-base font-semibold text-gray-700 hover:bg-gray-50 active:scale-98 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-4 h-4 md:w-5 md:h-5">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Save QR
            </button>

            <button
              @click="handleShareQR"
              class="flex items-center justify-center gap-2 border border-gray-200 py-3 md:py-4 rounded-xl text-sm md:text-base font-semibold text-gray-700 hover:bg-gray-50 active:scale-98 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-4 h-4 md:w-5 md:h-5">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
              </svg>
              Share
            </button>
          </div>
        </section>

        <div class="space-y-3 pt-2">
          <button
            @click="home"
            class="w-full bg-emerald-800 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-900 active:scale-[0.99] transition shadow-md shadow-emerald-800/10 text-base md:text-lg">
            <span>I have paid</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="w-5 h-5 md:w-6 md:h-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>

          <p
            class="text-center text-xs md:text-sm text-gray-400 px-4 leading-normal">
            If the payment doesn't reflect automatically, please show this
            screen to your server.
          </p>
        </div>
      </main>

      <nav
        class="bg-white border-t border-gray-100 px-6 py-3 md:py-4 grid grid-cols-4 text-center md:rounded-b-3xl items-center">
        <button
          v-for="tab in navigationTabs"
          :key="tab.name"
          @click="currentTab = tab.name"
          :class="[
            currentTab === tab.name
              ? 'text-emerald-500 font-semibold'
              : 'text-gray-400 hover:text-gray-600',
          ]"
          class="flex flex-col items-center justify-center transition gap-1">
          <div
            :class="[
              currentTab === tab.name && tab.name === 'Orders'
                ? 'bg-emerald-400 text-white py-2 rounded-full px-5 md:px-7 flex items-center gap-1.5 shadow-sm'
                : 'p-1',
            ]">
            <component :is="tab.icon" class="w-5 h-5 md:w-6 md:h-6 mx-auto" />
            <span
              v-if="currentTab === tab.name && tab.name === 'Orders'"
              class="text-xs md:text-sm font-semibold"
              >{{ tab.name }}</span
            >
          </div>
          <span
            v-if="!(currentTab === 'Orders' && tab.name === 'Orders')"
            class="text-[11px] md:text-xs font-medium"
            >{{ tab.name }}</span
          >
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, h } from "vue";

// Order properties data
const orderDetails = ref({
  amount: 200.6,
  table: "Table 14",
  id: "LX-8892",
  merchantName: "LuxeDine Signature",
});

// QR Code Endpoint
const qrCodeUrl = ref(
  "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=LuxeDine-Order-LX-8892",
);

// Timer reactive states
const timeLeft = ref(298);
let timerInterval = null;

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});

const currentTab = ref("Orders");

// Action Handlers
const handleSaveQR = () => alert("QR Code saved to gallery!");
const handleShareQR = () => alert("Share sheet triggered!");
const verifyPayment = () => alert("Checking payment status with server...");

// FIX FOR ICONS: SVGs defined through Vue's native functional Hyperscript 'h()' node system
const HomeIcon = () =>
  h(
    "svg",
    { 
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      "stroke-width": "2",
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
      }),
    ],
  );

const OrdersIcon = () =>
  h(
    "svg",
    {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      "stroke-width": "2",
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      }),
    ],
  );

const CartIcon = () =>
  h(
    "svg",
    {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      "stroke-width": "2",
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z",
      }),
    ],
  );

const ProfileIcon = () =>
  h(
    "svg",
    {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      "stroke-width": "2",
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
      }),
    ],
  );



onMounted(() => {
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) timeLeft.value--;
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timerInterval);
});
</script>

<style scoped>
.active\:scale-98:active {
  transform: scale(0.98);
}
</style>
