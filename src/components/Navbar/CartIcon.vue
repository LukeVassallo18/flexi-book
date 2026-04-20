<script setup>
import { useRouter } from 'vue-router';
import { useCart } from '../../services/cartStore';

const { getCartCount } = useCart();
const router = useRouter();

function openCart() {
  router.push('/cart');
}
</script>

<template>
  <button class="cart-btn" @click="openCart" aria-label="Shopping cart">
    <span class="material-icons">shopping_cart</span>
    <span v-if="getCartCount > 0" class="cart-badge">{{ getCartCount }}</span>
  </button>
</template>

<style scoped>
.cart-btn {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-heading);
  transition: opacity 0.2s;
}

.cart-btn:hover {
  opacity: 0.7;
}

.cart-btn .material-icons {
  font-size: 1.25rem;
}

.cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--color-cta);
  color: var(--color-cta-text);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
}
</style>
