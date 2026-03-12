<script setup>
import Navbar from './components/Navbar/Navbar.vue';
import Hero from './components/Hero/Hero.vue';
import FeaturesSection from './components/Cards/FeaturesSection.vue';
import DestinationsSection from './components/Cards/DestinationsSection.vue';
import AppFooter from './components/Footer/Footer.vue';
</script>

<template>
  <div id="app">
    <Navbar />
    <main>
      <Hero />
      <FeaturesSection />
      <DestinationsSection />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped></style>
