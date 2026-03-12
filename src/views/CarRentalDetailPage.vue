<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useCart } from '../services/cartStore';

const route = useRoute();
const router = useRouter();
const { addToCart } = useCart();

// Get car data from route params
const car = JSON.parse(decodeURIComponent(route.params.car));

function bookCar() {
  addToCart({
    ...car,
    type: 'Car',
  });
  alert(`Car booked: ${car.name}`);
  router.push('/cart');
}

function goBack() {
  router.back();
}
</script>

<template>
  <div class="car-detail-page">
    <!-- Header with back button -->
    <div class="detail-header">
      <button class="back-btn" @click="goBack">
        <span class="material-icons">arrow_back</span>
        Back
      </button>
      <h1>Car Details</h1>
      <div></div>
    </div>

    <!-- Detail Content -->
    <div class="detail-container">
      <div class="detail-hero">
        <span class="material-icons detail-icon">directions_car</span>
      </div>

      <div class="detail-card">
        <!-- Name Section -->
        <div class="section">
          <h2>{{ car.name }}</h2>
          <p class="subtitle">{{ car.type }}</p>
        </div>

        <!-- Rating Section -->
        <div class="section">
          <div class="rating-box">
            <span class="material-icons">star</span>
            <span class="rating-value">{{ car.rating }}/5.0</span>
            <span class="rating-label">Great Choice</span>
          </div>
        </div>

        <!-- Car Specifications -->
        <div class="section">
          <h3>Specifications</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="material-icons">local_gas_station</span>
              <div>
                <p class="info-label">Fuel Type</p>
                <p class="info-value">{{ car.fuel }}</p>
              </div>
            </div>
            <div class="info-item">
              <span class="material-icons">settings</span>
              <div>
                <p class="info-label">Transmission</p>
                <p class="info-value">{{ car.transmission }}</p>
              </div>
            </div>
            <div class="info-item">
              <span class="material-icons">people</span>
              <div>
                <p class="info-label">Seats</p>
                <p class="info-value">{{ car.seats }}</p>
              </div>
            </div>
            <div class="info-item">
              <span class="material-icons">star</span>
              <div>
                <p class="info-label">Rating</p>
                <p class="info-value">{{ car.rating }}/5.0</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Features Included -->
        <div class="section">
          <h3>Features Included</h3>
          <div class="tags">
            <span v-for="feature in car.features" :key="feature" class="tag">{{ feature }}</span>
          </div>
        </div>

        <!-- Price Section -->
        <div class="section">
          <h3>Price</h3>
          <p class="price">${{ car.price }}<span class="price-label">/day</span></p>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button class="btn-secondary" @click="goBack">Continue Browsing</button>
          <button class="btn-primary" @click="bookCar">Book Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./CarRentalDetailPage.css"></style>
