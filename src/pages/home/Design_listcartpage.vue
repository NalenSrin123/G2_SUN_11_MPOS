<template>
  <div class="page">
    <!-- Header -->
    <header class="header">
      <button
        class="icon-btn cursor-pointer"
        aria-label="Go back"
        @click="$router.back()"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <span class="logo">🛒 Your Order</span>
      <button class="icon-btn" aria-label="Clear cart" @click="clearCart">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14H6L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4h6v2" />
        </svg>
      </button>
    </header>

    <main class="content">
      <h1 class="page-title">Your Selection</h1>

      <!-- Empty state -->
      <div v-if="cartItems.length === 0" class="empty">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <p class="empty-title">Your cart is empty</p>
        <p class="empty-sub">Add something delicious from menu</p>
        <button @click="$router.push('/')" class="shop-btn">Browse Menu</button>
      </div>

      <!-- Cart list -->
      <div v-else class="cart-wrapper">
        <div class="cart-count">
          <span>{{ cartItems.length }} items</span>
          <span>Total: ${{ subtotal }}</span>
        </div>

        <transition-group name="item" tag="ul" class="cart-list">
          <li v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="item-thumb" :style="{ background: item.bg || '#f5f5f5' }">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.name"
                class="item-img"
                @error="onImgError(item)"
              />
              <span v-else class="item-emoji">{{ item.emoji || "🍽️" }}</span>
            </div>

            <div class="item-body">
              <div class="item-top">
                <div>
                  <p class="item-name">{{ item.name }}</p>
                  <p class="item-desc">{{ item.desc || item.description }}</p>
                </div>
                <button
                  class="delete-btn"
                  @click="removeItem(item.id)"
                  aria-label="Remove item"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                </button>
              </div>
              <div class="item-bottom">
                <span class="item-price">${{ lineTotal(item) }}</span>
                <div class="stepper">
                  <button class="step-btn" @click="decrement(item)" aria-label="Decrease">
                    −
                  </button>
                  <span class="step-qty">{{ item.qty }}</span>
                  <button class="step-btn" @click="increment(item)" aria-label="Increase">
                    +
                  </button>
                </div>
              </div>
            </div>
          </li>
        </transition-group>
      </div>

      <!-- Order Summary -->
      <section v-if="cartItems.length" class="summary">
        <h2 class="summary-title">Order Summary</h2>
        <div class="summary-row">
          <span>Subtotal</span>
          <span>${{ subtotal }}</span>
        </div>
        <div class="summary-row">
          <span>Service Fee (10%)</span>
          <span>${{ serviceFee }}</span>
        </div>
        <div class="summary-row">
          <span>Tax (8%)</span>
          <span>${{ tax }}</span>
        </div>
        <div class="summary-divider" />
        <div class="summary-total">
          <span>Total</span>
          <span>${{ total }}</span>
        </div>
      </section>
    </main>

    <!-- Footer CTA -->
    <footer class="footer">
      <button
        class="cta-btn"
        :disabled="cartItems.length === 0 || isPlacingOrder"
        @click="placeOrder"
      >
        {{
          isPlacingOrder
            ? "Sending Order..."
            : ordered
            ? "✅ Order Placed!"
            : "Place Order"
        }}
        <svg
          v-if="!ordered"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { createOrder, saveLocalOrder } from "@/services/api";

// State
const cartItems = ref([]);
const ordered = ref(false);
const isPlacingOrder = ref(false);
const CART_STORAGE_KEY = "cartItems";

const toNumber = (value) => {
  const amount = Number(String(value ?? 0).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(amount) ? amount : 0;
};

const normalizeCartItems = (items) =>
  Array.isArray(items)
    ? items.map((item) => ({
        ...item,
        price: toNumber(item.price),
        qty: Math.max(1, Number.parseInt(item.qty, 10) || 1),
      }))
    : [];

// Load cart from localStorage
const loadCart = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    cartItems.value = normalizeCartItems(savedCart ? JSON.parse(savedCart) : []);
  } catch (error) {
    console.error("Error loading cart:", error);
    cartItems.value = [];
  }
};

// Save cart to localStorage
const saveCart = () => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems.value));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
};

// Load on mount
onMounted(() => {
  loadCart();
});

// Watch for changes
watch(cartItems, saveCart, { deep: true });

// Computed
const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)
);

const serviceFee = computed(() => (parseFloat(subtotal.value) * 0.1).toFixed(2));

const tax = computed(() => (parseFloat(subtotal.value) * 0.08).toFixed(2));

const total = computed(() =>
  (
    parseFloat(subtotal.value) +
    parseFloat(serviceFee.value) +
    parseFloat(tax.value)
  ).toFixed(2)
);

const lineTotal = (item) => (toNumber(item.price) * item.qty).toFixed(2);

// Methods
function increment(item) {
  item.qty++;
}

function decrement(item) {
  if (item.qty > 1) {
    item.qty--;
  } else {
    removeItem(item.id);
  }
}

function removeItem(id) {
  if (confirm("Remove this item from cart?")) {
    cartItems.value = cartItems.value.filter((item) => item.id !== id);
  }
}

function clearCart() {
  if (cartItems.value.length > 0 && confirm("Clear all items from cart?")) {
    cartItems.value = [];
  }
}

// Fall back to the emoji if the image URL fails to load
function onImgError(item) {
  item.image = "";
}

async function placeOrder() {
  if (cartItems.value.length === 0) return;

  isPlacingOrder.value = true;
  const order = {
    id: `LOCAL-${Date.now()}`,
    customerName: "Guest Customer",
    tableNumber: "Walk-in",
    createdAt: new Date().toISOString(),
    items: cartItems.value.map((item) => ({
      productId: item.id,
      name: item.name,
      price: toNumber(item.price),
      qty: item.qty,
    })),
    subtotal: Number(subtotal.value),
    serviceFee: Number(serviceFee.value),
    tax: Number(tax.value),
    total: Number(total.value),
    status: "Pending",
  };

  try {
    await createOrder(order);

    cartItems.value = [];
    ordered.value = true;
    alert("Order placed successfully. The admin dashboard has been notified.");
    window.setTimeout(() => {
      ordered.value = false;
    }, 1500);
  } catch (error) {
    // A CORS/network failure has no response. Keep the order in this browser
    // so the admin Orders page can still receive and display it.
    if (!error.response) {
      saveLocalOrder(order);
      cartItems.value = [];
      ordered.value = true;
      alert(
        "Order saved locally and is visible in the admin dashboard. Server sync will resume when the API is available."
      );
      window.setTimeout(() => {
        ordered.value = false;
      }, 1500);
    } else {
      console.error("Unable to place order:", error);
      alert("Unable to place the order. Please try again.");
    }
  } finally {
    isPlacingOrder.value = false;
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  max-width: 420px;
  margin: 0 auto;
  background: #f4f6f4;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #fff;
  border-bottom: 1px solid #e8ede9;
  position: sticky;
  top: 0;
  z-index: 10;
}

.logo {
  font-size: 20px;
  font-weight: 600;
  color: #1a5c3a;
  letter-spacing: 0.3px;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: #f0f7f2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #1a5c3a;
  transition: background 0.2s;
}

.icon-btn:hover {
  background: #d8eddf;
}

.content {
  flex: 1;
  padding: 20px 16px 100px;
  overflow-y: auto;
}

.page-title {
  font-size: 22px;
  font-weight: 600;
  color: #1a2e22;
  margin-bottom: 16px;
}

.empty {
  text-align: center;
  padding: 60px 20px;
  color: #7a9a82;
}

.empty svg {
  margin-bottom: 12px;
  opacity: 0.4;
}

.empty-title {
  font-size: 16px;
  font-weight: 500;
  color: #3a5c42;
  margin-bottom: 4px;
}

.empty-sub {
  font-size: 13px;
  color: #8aaa90;
}

.shop-btn {
  margin-top: 16px;
  padding: 10px 32px;
  background: #34a85a;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.shop-btn:hover {
  background: #2e9450;
}

.cart-wrapper {
  position: relative;
  margin-bottom: 16px;
}

.cart-count {
  display: flex;
  justify-content: space-between;
  padding: 8px 4px 12px;
  font-size: 14px;
  color: #5a7a65;
}

.cart-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cart-item {
  background: #fff;
  border-radius: 14px;
  padding: 14px;
  display: flex;
  gap: 12px;
  border: 1px solid #e8ede9;
  transition: all 0.2s;
}

.cart-item:hover {
  box-shadow: 0 4px 16px rgba(26, 92, 58, 0.08);
}

.item-thumb {
  width: 64px;
  height: 64px;
  border-radius: 10px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.item-emoji {
  font-size: 28px;
}

.item-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.item-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a2e22;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}

.item-desc {
  font-size: 12px;
  color: #7a9a82;
  margin-top: 2px;
}

.delete-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: #faf0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #c0392b;
  flex-shrink: 0;
  transition: background 0.2s;
}

.delete-btn:hover {
  background: #f5d0cc;
}

.item-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item-price {
  font-size: 15px;
  font-weight: 600;
  color: #2e7d52;
}

.stepper {
  display: flex;
  align-items: center;
  background: #f0f7f2;
  border-radius: 20px;
  padding: 2px 4px;
  gap: 2px;
}

.step-btn {
  width: 26px;
  height: 26px;
  border: none;
  background: #fff;
  border-radius: 50%;
  font-size: 16px;
  font-weight: 600;
  color: #1a5c3a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.15s;
  line-height: 1;
}

.step-btn:active {
  transform: scale(0.92);
}

.step-qty {
  min-width: 24px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #1a2e22;
}

.summary {
  background: #fff;
  border-radius: 14px;
  padding: 18px;
  border: 1px solid #e8ede9;
}

.summary-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a2e22;
  margin-bottom: 14px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #5a7a65;
  padding: 4px 0;
}

.summary-divider {
  border: none;
  border-top: 1px solid #e8ede9;
  margin: 12px 0;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 600;
  color: #1a2e22;
}

.summary-total span:last-child {
  color: #1a5c3a;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 420px;
  padding: 12px 16px 24px;
  background: linear-gradient(to top, #f4f6f4 70%, transparent);
}

.cta-btn {
  width: 100%;
  padding: 15px;
  background: #34a85a;
  color: #fff;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 16px rgba(52, 168, 90, 0.3);
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
}

.cta-btn:hover {
  background: #2e9450;
  box-shadow: 0 6px 22px rgba(52, 168, 90, 0.38);
}

.cta-btn:active {
  transform: scale(0.98);
}

.cta-btn:disabled {
  background: #b0c8b8;
  box-shadow: none;
  cursor: not-allowed;
}

.item-enter-active,
.item-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}

.item-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.item-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.item-leave-active {
  position: absolute;
  width: 100%;
}

/* Mobile Responsive */
@media (max-width: 420px) {
  .page {
    max-width: 100%;
  }

  .item-name {
    max-width: 120px;
  }
}
</style>
