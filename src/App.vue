<script setup>
import { RouterView } from 'vue-router';
import AppFooter from './components/Footer/Footer.vue';
import Navbar from './components/Navbar/Navbar.vue';
</script>

<template>
  <div id="app">
    <Navbar />
    <RouterView />
    <AppFooter />
  </div>
</template>

<style scoped></style>
