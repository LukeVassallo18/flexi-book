<script setup>
import { useRoute, useRouter } from 'vue-router';
import { trackDisclaimerAccepted } from '../services/analytics';

const DISCLAIMER_STORAGE_KEY = 'flexi-book-disclaimer-accepted';

const route = useRoute();
const router = useRouter();

function proceedToSite() {
  trackDisclaimerAccepted();
  window.localStorage.setItem(DISCLAIMER_STORAGE_KEY, 'true');
  const redirectPath = typeof route.query.redirect === 'string' ? route.query.redirect : '/';
  router.replace(redirectPath);
}
</script>

<template>
  <main class="welcome-disclaimer" aria-labelledby="welcome-title">
    <section class="welcome-card" role="region" aria-label="Important disclaimer">
      <span class="badge">
        <span class="material-icons" aria-hidden="true">accessibility_new</span>
        Disclaimer
      </span>

      <h1 id="welcome-title">Welcome to Flexi Book</h1>
      <p class="intro">Please review and agree before entering the website.</p>

      <ul class="disclaimer-list">
        <li>
          <span class="material-icons" aria-hidden="true">privacy_tip</span>
          <span>No personal data is collected through this website.</span>
        </li>
        <li>
          <span class="material-icons" aria-hidden="true">campaign</span>
          <span>This is a demo website with fictional flights, hotels, and car rentals.</span>
        </li>
        <li>
          <span class="material-icons" aria-hidden="true">payments</span>
          <span>No real bookings are made and no payments are processed.</span>
        </li>
      </ul>

      <button class="proceed-btn" type="button" @click="proceedToSite">
        <span class="material-icons" aria-hidden="true">arrow_forward</span>
        I understand and want to continue
      </button>
    </section>
  </main>
</template>

<style scoped src="./WelcomeDisclaimerPage.css"></style>
