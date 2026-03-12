<script setup>
const features = [
  {
    icon: 'lock',
    title: 'Secure Booking',
    description: 'Your data is protected with end-to-end encryption and secure payment processing.',
  },
  {
    icon: 'headset_mic',
    title: '24/7 Support',
    description: 'Our support team is available around the clock to assist with your travel needs.',
  },
  {
    icon: 'credit_card',
    title: 'Best Price Guarantee',
    description: "Find a lower price elsewhere? We'll match it —no questions asked.",
  },
  {
    icon: 'accessibility_new',
    title: 'Accessible for All',
    description: 'Built-in accessibility features including colour vision deficiency modes and voice control.',
  },
];
</script>

<template>
  <section class="features-section" aria-labelledby="features-heading">
    <div class="container">
      <h2 id="features-heading" class="section-title">Why Flexi Book?</h2>
      <p class="section-subtitle">Travel planning made simple, affordable, and accessible for everyone.</p>

      <div class="cards-grid">
        <div v-for="feature in features" :key="feature.title" class="feature-card">
          <div class="icon-box" aria-hidden="true">
            <span class="material-icons">{{ feature.icon }}</span>
          </div>
          <h3 class="card-title">{{ feature.title }}</h3>
          <p class="card-desc">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped src="./FeaturesSection.css"></style>
