<template>
  <main class="checkout-page">
    <section class="checkout-hero">
      <div class="checkout-hero-inner">
        <h1>Checkout</h1>
        <p>Review your booking and confirm when you are ready</p>
      </div>
    </section>

    <section class="checkout-content">
      <div class="checkout-container" v-if="getCartItems.length > 0">
        <div class="checkout-main">
          <div class="card-block">
            <h2>Review your booking</h2>
            <p class="checkout-note">No payment details are collected here. This is a demo confirmation step.</p>
            <ul class="booking-checklist">
              <li>Trip items are ready to confirm</li>
              <li>Booking reference will be generated automatically</li>
              <li>You will be taken to the confirmation page after booking</li>
            </ul>
          </div>

          <div class="action-row">
            <RouterLink class="back-link" to="/cart">Back to cart</RouterLink>
            <button type="button" class="confirm-btn" @click="placeOrder">Confirm Booking</button>
          </div>
        </div>

        <aside class="checkout-summary">
          <div class="summary-card">
            <h3>Order Summary</h3>
            <div class="summary-list">
              <div class="summary-row" v-for="item in getCartItems" :key="item.cartId">
                <span>{{ item.route || item.name || 'Booking item' }}</span>
                <span>${{ item.price || 0 }}</span>
              </div>
            </div>
            <div class="summary-divider"></div>
            <div class="summary-row"><span>Subtotal</span><span>${{ subTotal }}</span></div>
            <div class="summary-row"><span>Taxes & fees</span><span>${{ taxes }}</span></div>
            <div class="summary-row total"><span>Total</span><span>${{ grandTotal }}</span></div>
          </div>
        </aside>
      </div>

      <div v-else class="empty-checkout">
        <span class="material-icons">shopping_cart</span>
        <h2>Your cart is empty</h2>
        <p>Add an item before proceeding to checkout.</p>
        <RouterLink to="/" class="go-home">Start Booking</RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useCart } from '../services/cartStore';
import { useToast } from '../services/toastStore';

const router = useRouter();
const { getCartItems, getCartTotal, clearCart } = useCart();
const { pushToast } = useToast();

const subTotal = computed(() => Math.round(getCartTotal.value));
const taxes = computed(() => Math.round(subTotal.value * 0.1));
const grandTotal = computed(() => subTotal.value + taxes.value);

function placeOrder() {
  if (getCartItems.value.length === 0) {
    pushToast('Your cart is empty. Add a booking first.', { type: 'error' });
    router.push('/cart');
    return;
  }

  const bookingReference = `FB-${Date.now().toString().slice(-6)}`;
  const itemCount = getCartItems.value.length;
  const totalAmount = grandTotal.value;

  clearCart();

  pushToast('Booking confirmed. Redirecting to confirmation page...', { type: 'success' });
  router.push({
    name: 'booking-success',
    query: {
      ref: bookingReference,
      items: String(itemCount),
      total: String(totalAmount),
    },
  });
}
</script>

<style scoped src="./CheckoutPage.css"></style>
