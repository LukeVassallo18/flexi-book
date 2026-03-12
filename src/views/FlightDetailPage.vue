<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useCart } from '../services/cartStore';

const route = useRoute();
const router = useRouter();
const { addToCart } = useCart();

// Get flight data from route params
const flight = JSON.parse(decodeURIComponent(route.params.flight));

function bookFlight() {
  addToCart({
    ...flight,
    type: 'Flight',
  });
  alert(`Flight booked: ${flight.route}`);
  router.push('/cart');
}

function goBack() {
  router.back();
}
</script>

<template>
  <div class="flight-detail-page">
    <!-- Header with back button -->
    <div class="detail-header">
      <button class="back-btn" @click="goBack">
        <span class="material-icons">arrow_back</span>
        Back
      </button>
      <h1>Flight Details</h1>
      <div></div>
    </div>

    <!-- Detail Content -->
    <div class="detail-container">
      <div class="detail-hero">
        <span class="material-icons detail-icon">{{ flight.icon }}</span>
      </div>

      <div class="detail-card">
        <!-- Route Section -->
        <div class="section">
          <h2>{{ flight.route }}</h2>
          <p class="subtitle">{{ flight.details }}</p>
        </div>

        <!-- Rating Section -->
        <div class="section">
          <div class="rating-box">
            <span class="material-icons">star</span>
            <span class="rating-value">{{ flight.rating }}/5.0</span>
            <span class="rating-label">Excellent Rating</span>
          </div>
        </div>

        <!-- Flight Information -->
        <div class="section">
          <h3>Flight Information</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="material-icons">airline_seat_recline_normal</span>
              <div>
                <p class="info-label">Airline</p>
                <p class="info-value">{{ flight.airline }}</p>
              </div>
            </div>
            <div class="info-item">
              <span class="material-icons">stop</span>
              <div>
                <p class="info-label">Stops</p>
                <p class="info-value">{{ flight.stops === 0 ? 'Non-stop' : flight.stops + ' Stop(s)' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- What's Included -->
        <div class="section">
          <h3>What's Included</h3>
          <div class="tags">
            <span v-for="tag in flight.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>

        <!-- Price Section -->
        <div class="section">
          <h3>Price</h3>
          <p class="price">${{ flight.price }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button class="btn-secondary" @click="goBack">Continue Browsing</button>
          <button class="btn-primary" @click="bookFlight">Book Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./FlightDetailPage.css"></style>
