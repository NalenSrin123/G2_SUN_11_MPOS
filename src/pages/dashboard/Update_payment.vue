<template>
  <div
    class="min-h-screen bg-slate-50 p-6 font-sans text-slate-800 antialiased">
    <header
      class="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div class="flex items-center gap-2 text-xs text-slate-500">
          <span>Payments</span>
          <span>&gt;</span>
          <span class="text-emerald-600 font-medium">Update Payment</span>
        </div>
        <div class="mt-2 flex items-center gap-3">
          <button class="rounded-full p-1 hover:bg-slate-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="h-6 w-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <h1 class="text-2xl font-bold text-slate-900">
            Transaction #{{ transactionId }}
          </h1>
          <span
            class="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-600 uppercase tracking-wide">
            {{ paymentStatus }}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="printReceipt"
          class="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
          Print Receipt
        </button>
        <button
          @click="saveChanges"
          class="rounded-md bg-emerald-800 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 shadow-sm transition-colors">
          Save Changes
        </button>
      </div>
    </header>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div class="lg:col-span-2 flex flex-col gap-6">
        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900">Order Details</h2>
            <div class="flex items-center gap-2 text-sm text-slate-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
              </svg>
              <span>Oct 24, 2023 • 19:42</span>
            </div>
          </div>

          <div
            class="grid grid-cols-12 border-b border-slate-100 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <div class="col-span-6">Item</div>
            <div class="col-span-2 text-center">Qty</div>
            <div class="col-span-2 text-right">Price</div>
            <div class="col-span-2 text-right">Total</div>
          </div>

          <div class="divide-y divide-slate-100">
            <div
              v-for="item in orderItems"
              :key="item.name"
              class="grid grid-cols-12 items-center py-4">
              <div class="col-span-6 flex items-start gap-3">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <span v-if="item.type === 'food'" class="text-lg">🍴</span>
                  <span v-else class="text-lg">🍸</span>
                </div>
                <div>
                  <h4 class="font-semibold text-slate-900">{{ item.name }}</h4>
                  <p class="text-xs text-slate-500 mt-0.5">{{ item.notes }}</p>
                </div>
              </div>
              <div
                class="col-span-2 text-center text-sm font-medium text-slate-700">
                {{ item.qty }}
              </div>
              <div
                class="col-span-2 text-right text-sm font-medium text-slate-700">
                ${{ item.price.toFixed(2) }}
              </div>
              <div
                class="col-span-2 text-right text-sm font-bold text-slate-900">
                ${{ (item.qty * item.price).toFixed(2) }}
              </div>
            </div>
          </div>

          <div
            class="mt-4 border-t border-slate-100 pt-4 flex flex-col items-end gap-2 text-sm text-slate-600">
            <div class="flex w-full max-w-xs justify-between">
              <span>Subtotal</span>
              <span class="font-medium text-slate-900"
                >${{ subtotal.toFixed(2) }}</span
              >
            </div>
            <div class="flex w-full max-w-xs justify-between">
              <span>Tax (8.5%)</span>
              <span class="font-medium text-slate-900"
                >${{ tax.toFixed(2) }}</span
              >
            </div>
            <div
              class="flex class w-full max-w-xs justify-between border-b border-emerald-400 pb-3">
              <span>Service Fee</span>
              <span class="font-medium text-slate-900"
                >${{ serviceFee.toFixed(2) }}</span
              >
            </div>
            <div
              class="flex w-full max-w-xs justify-between pt-2 text-lg font-bold text-slate-900">
              <span>Total</span>
              <span class="text-emerald-700">${{ total.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="mb-4 text-lg font-bold text-slate-900">Internal Notes</h2>
          <div class="relative">
            <textarea
              v-model="internalNotes"
              placeholder="Add administrative notes regarding this transaction..."
              rows="4"
              class="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-800 placeholder-slate-400 focus:border-slate-300 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-300 transition-all"></textarea>
            <span
              class="absolute bottom-3 right-4 text-xs font-medium text-slate-400 pointer-events-none">
              Visible to staff only
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="mb-4 text-lg font-bold text-slate-900">Payment Status</h2>

          <div class="mb-5">
            <label
              class="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5"
              >Current Status</label
            >
            <div class="relative">
              <select
                v-model="paymentStatus"
                class="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-800 focus:border-slate-300 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-300">
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="h-4 w-4">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </div>
          </div>

          <div class="mb-5">
            <label
              class="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5"
              >Payment Method</label
            >
            <div
              class="flex items-center gap-3 rounded-lg bg-slate-100 p-3 text-sm font-medium text-slate-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5 text-slate-500">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
              <span
                >Visa ending in
                <span class="tracking-widest">••••</span> 4242</span
              >
            </div>
          </div>

          <div class="mt-6 border-t border-slate-100 pt-4">
            <div
              class="flex items-center gap-1 text-xs font-bold text-red-500 uppercase tracking-wider mb-2">
              <span class="text-sm">⚠️</span> Danger Zone
            </div>
            <button
              @click="handleRefund"
              class="w-full rounded-lg border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors">
              Refund Transaction
            </button>
          </div>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="mb-4 text-lg font-bold text-slate-900">Customer Info</h2>

          <div class="flex items-center gap-3 mb-4">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
              alt="Julian Alexander"
              class="h-12 w-12 rounded-full object-cover border border-slate-100" />
            <div>
              <h3 class="font-bold text-slate-900">Julian Alexander</h3>
              <p class="text-xs text-slate-500">Regular • 14 Visits</p>
            </div>
          </div>

          <div class="space-y-2.5 text-sm text-slate-600">
            <div class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4 text-slate-400">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <a href="mailto:j.alexander@email.com" class="hover:underline"
                >j.alexander@email.com</a
              >
            </div>
            <div class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4 text-slate-400">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <span>+1 (555) 012-3456</span>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="mb-5 text-lg font-bold text-slate-900">Payment History</h2>

          <div class="relative border-l border-slate-200 pl-4 ml-2 space-y-6">
            <div class="relative">
              <div
                class="absolute left-5 top-1 h-2.5 w-2.5 rounded-full bg-emerald-600 ring-4 ring-white"></div>
              <h4 class="text-sm font-bold text-slate-800">
                Transaction Initiated
              </h4>
              <p class="text-xs text-slate-500 mt-0.5">
                Today at 19:42 by POS-1
              </p>
            </div>

            <div class="relative">
              <div
                class="absolute -left-5 top-1 h-2.5 w-2.5 rounded-full bg-slate-400 ring-4 ring-white"></div>
              <h4 class="text-sm font-bold text-slate-800">
                Waiting for Verification
              </h4>
              <p class="text-xs text-slate-500 mt-0.5">
                Today at 19:43 • Stripe API
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Basic Component State Data
const transactionId = ref("PAY-8821");
const paymentStatus = ref("Pending");
const internalNotes = ref("");
const serviceFee = ref(5.0);

const orderItems = ref([
  {
    name: "Truffle Tagliatelle",
    notes: "Extra parmesan, no garlic",
    qty: 2,
    price: 28.5,
    type: "food",
  },
  {
    name: "Old Fashioned",
    notes: "Smoked oak finish",
    qty: 3,
    price: 16.0,
    type: "drink",
  },
]);

// Computed Properties for auto-calculating totals
const subtotal = computed(() => {
  return orderItems.value.reduce((acc, item) => acc + item.qty * item.price, 0);
});

const tax = computed(() => {
  return subtotal.value * 0.085; // 8.5%
});

const total = computed(() => {
  return subtotal.value + tax.value + serviceFee.value;
});

// Trigger Mock Component Interactions
const saveChanges = () => {
  alert(
    `Changes saved! Status is set to: ${paymentStatus.value}. Notes: "${internalNotes.value}"`,
  );
};

const printReceipt = () => {
  window.print();
};

const handleRefund = () => {
  if (confirm("Are you sure you want to refund this transaction?")) {
    alert("Refund initiated successfully.");
  }
};
</script>

<style scoped>
/* Scoped adjustments if any specific layout configurations are needed */
</style>
