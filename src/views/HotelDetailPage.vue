<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useCart } from '../services/cartStore';

const route = useRoute();
const router = useRouter();
const { addToCart } = useCart();

// Get hotel data from route params
const hotel = JSON.parse(decodeURIComponent(route.params.hotel));

function bookHotel() {
  addToCart({
    ...hotel,
    type: 'Hotel',
  });
  alert(`Hotel booked: ${hotel.name}`);
  router.push('/cart');
}

function goBack() {
  router.back();
}

const getAmenityIcon = (amenity) => {
  const icons = {
    'Free WiFi': 'wifi',
    'Gym': 'fitness_center',
    'Restaurant': 'restaurant',
    'Breakfast': 'dining',
  };
  return icons[amenity] || 'check_circle';
};
</script>

<template>
  <div class="hotel-detail-page">
    <!-- Header with back button -->
    <div class="detail-header">
      <button class="back-btn" @click="goBack">
        <span class="material-icons">arrow_back</span>
        Back
      </button>
      <h1>Hotel Details</h1>
      <div></div>
    </div>

    <!-- Detail Content -->
    <div class="detail-container">
      <div class="detail-hero">
        <span class="material-icons detail-icon">hotel</span>
      </div>

      <div class="detail-card">
        <!-- Name Section -->
        <div class="section">
          <h2>{{ hotel.name }}</h2>
          <p class="subtitle">{{ hotel.location }}</p>
        </div>

        <!-- Rating Section -->
        <div class="section">
          <div class="rating-box">
            <span class="material-icons">star</span>
            <span class="rating-value">{{ hotel.rating }}/5.0</span>
            <span class="rating-label">{{ hotel.stars }}-Star Hotel</span>
          </div>
        </div>

        <!-- Hotel Information -->
        <div class="section">
          <h3>Hotel Information</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="material-icons">star</span>
              <div>
                <p class="info-label">Rating</p>
                <p class="info-value">{{ hotel.rating }}/5.0</p>
              </div>
            </div>
            <div class="info-item">
              <span class="material-icons">grade</span>
              <div>
                <p class="info-label">Stars</p>
                <p class="info-value">{{ hotel.stars }} Stars</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Amenities -->
        <div class="section">
          <h3>Amenities</h3>
          <div class="tags">
            <span v-for="amenity in hotel.amenities" :key="amenity" class="tag">{{ amenity }}</span>
          </div>
        </div>

        <!-- Features Included -->
        <div class="section">
          <h3>Features Included</h3>
          <div class="features-list">
            <div v-for="feature in hotel.features" :key="feature" class="feature-item">
              <span class="material-icons">{{ getAmenityIcon(feature) }}</span>
              {{ feature }}
            </div>
          </div>
        </div>

        <!-- Price Section -->
        <div class="section">
          <h3>Price</h3>
          <p class="price">${{ hotel.price }}<span class="price-label">/night</span></p>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button class="btn-secondary" @click="goBack">Continue Browsing</button>
          <button class="btn-primary" @click="bookHotel">Book Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./HotelDetailPage.css"></style>
