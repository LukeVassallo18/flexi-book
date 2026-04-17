<template>
  <main class="success-page">
    <section class="success-wrap">
      <div class="success-card">
        <span class="material-icons success-icon" aria-hidden="true">verified</span>
        <h1>Booking Successful</h1>
        <p class="lead">Your demo booking was completed successfully.</p>

        <div class="reference-box">
          <span>Reference</span>
          <strong>{{ bookingReference }}</strong>
        </div>

        <div class="summary-grid">
          <div>
            <span>Items</span>
            <strong>{{ itemCount }}</strong>
          </div>
          <div>
            <span>Total paid</span>
            <strong>${{ totalAmount }}</strong>
          </div>
          <div>
            <span>Booked on</span>
            <strong>{{ bookedOn }}</strong>
          </div>
        </div>

        <div class="actions">
          <RouterLink to="/" class="primary-link">Book Another Trip</RouterLink>
          <RouterLink to="/cart" class="secondary-link">Go to Cart</RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

const bookingReference = computed(() => {
  const value = typeof route.query.ref === 'string' ? route.query.ref : '';
  return value || 'FB-DEMO';
});

const itemCount = computed(() => {
  const raw = Number(route.query.items);
  return Number.isFinite(raw) && raw > 0 ? raw : 0;
});

const totalAmount = computed(() => {
  const raw = Number(route.query.total);
  return Number.isFinite(raw) && raw > 0 ? raw : 0;
});

const bookedOn = computed(() => {
  return new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
});
</script>

<style scoped src="./BookingSuccessPage.css"></style>
