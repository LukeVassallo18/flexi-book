<template>
  <div class="cart-page">
    <div class="cart-hero">
      <div class="cart-hero-inner">
        <h1>Your Bookings</h1>
        <p>Review and manage your booked trips</p>
      </div>
    </div>

    <div class="cart-content">
      <div class="cart-container">
        <div v-if="getCartItems.length === 0" class="empty-cart">
          <span class="material-icons">shopping_cart</span>
          <h2>Your cart is empty</h2>
          <p>Start booking flights, hotels, or cars to see them here</p>
          <RouterLink to="/" class="cta-btn">
            <span class="material-icons">arrow_back</span>
            Continue Booking
          </RouterLink>
        </div>

        <div v-else class="cart-grid">
          <div class="cart-items">
            <div v-for="item in getCartItems" :key="item.cartId" class="cart-item">
              <div class="item-header">
                <h3>{{ item.route || item.name || item.location }}</h3>
                <button 
                  class="remove-btn" 
                  @click="removeFromCart(item.cartId)"
                  aria-label="Remove item"
                >
                  <span class="material-icons">close</span>
                </button>
              </div>

              <div class="item-details">
                <div class="detail-row">
                  <span class="label">Type:</span>
                  <span class="value">{{ item.type || getItemType(item) }}</span>
                </div>
                <div v-if="item.details" class="detail-row">
                  <span class="label">Details:</span>
                  <span class="value">{{ item.details }}</span>
                </div>
                <div v-if="item.rating" class="detail-row">
                  <span class="label">Rating:</span>
                  <span class="value">
                    <span class="material-icons">star</span>
                    {{ item.rating }}
                  </span>
                </div>
                <div class="detail-row">
                  <span class="label">Price:</span>
                  <span class="price">${{ item.price }}</span>
                </div>
              </div>

              <button 
                class="view-details-btn"
                @click="viewDetails(item)"
              >
                View Details
              </button>
            </div>
          </div>

          <div class="cart-summary">
            <div class="summary-card">
              <h3>Order Summary</h3>
              <div class="summary-items">
                <div class="summary-row">
                  <span>Items ({{ getCartItems.length }})</span>
                  <span>${{ getCartTotal }}</span>
                </div>
                <div class="summary-row">
                  <span>Taxes & Fees</span>
                  <span>${{ Math.round(getCartTotal * 0.1) }}</span>
                </div>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-total">
                <span>Total</span>
                <span>${{ Math.round(getCartTotal * 1.1) }}</span>
              </div>
              <button class="checkout-btn" @click="proceedToCheckout">
                <span class="material-icons">payment</span>
                Proceed to Checkout
              </button>
              <RouterLink to="/" class="continue-shopping">
                Continue Shopping
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <div v-if="selectedItem" class="modal-overlay" @click="closeDetails">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeDetails">
          <span class="material-icons">close</span>
        </button>
        <h2>Booking Details</h2>
        <div class="modal-body">
          <div class="detail-section">
            <h4>{{ selectedItem.route || selectedItem.name }}</h4>
            <p>{{ selectedItem.location || selectedItem.details || selectedItem.specs }}</p>
          </div>

          <div class="detail-section">
            <h5>What's Included:</h5>
            <ul v-if="selectedItem.features || selectedItem.amenities">
              <li v-for="feature in (selectedItem.features || selectedItem.amenities)" :key="feature">
                <span class="material-icons">check_circle</span>
                {{ feature }}
              </li>
            </ul>
            <ul v-else>
              <li>
                <span class="material-icons">check_circle</span>
                Standard amenities
              </li>
              <li>
                <span class="material-icons">check_circle</span>
                Customer support
              </li>
            </ul>
          </div>

          <div class="detail-section">
            <h5>Price Details:</h5>
            <p>Price per unit: <strong>${{ selectedItem.price }}</strong></p>
            <p v-if="selectedItem.rating" class="rating">
              <span class="material-icons">star</span>
              {{ selectedItem.rating }} Rating
            </p>
          </div>

          <div class="modal-actions">
            <button class="secondary-btn" @click="closeDetails">Close</button>
            <button class="primary-btn" @click="closeDetails">Keep Booking</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useCart } from '../services/cartStore';

const router = useRouter();
const { removeFromCart, getCartItems, getCartTotal } = useCart();
const selectedItem = ref(null);

function getItemType(item) {
  if (item.airline) return 'Flight';
  if (item.specs && item.specs.includes('star')) return 'Hotel';
  if (item.transmission) return 'Car Rental';
  return 'Booking';
}

function viewDetails(item) {
  selectedItem.value = item;
}

function closeDetails() {
  selectedItem.value = null;
}

function proceedToCheckout() {
  router.push('/checkout');
}
</script>

<style scoped src="./CartPage.css"></style>
