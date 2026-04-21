<script setup>
import { inject } from '@vercel/analytics';
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import AppFooter from './components/Footer/Footer.vue';
import Navbar from './components/Navbar/Navbar.vue';
import ToastContainer from './components/Toast/ToastContainer.vue';

const route = useRoute();
const showSiteShell = computed(() => route.name !== 'welcome-disclaimer');

inject();
</script>

<template>
  <div id="app">
    <Navbar v-if="showSiteShell" />
    <RouterView />
    <AppFooter v-if="showSiteShell" />
    <ToastContainer />
  </div>
</template>

<style scoped></style>
