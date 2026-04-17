<script setup>
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import AppFooter from './components/Footer/Footer.vue';
import Navbar from './components/Navbar/Navbar.vue';

const route = useRoute();
const showSiteShell = computed(() => route.name !== 'welcome-disclaimer');
</script>

<template>
  <div id="app">
    <Navbar v-if="showSiteShell" />
    <RouterView />
    <AppFooter v-if="showSiteShell" />
  </div>
</template>

<style scoped></style>
