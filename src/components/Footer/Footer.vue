<script setup>
const company = ['About', 'Careers', 'Press', 'Blog'];
const support = ['Help Centre', 'Contact', 'Accessibility', 'FAQs'];
const legal   = ['Privacy', 'Terms', 'Cookies', 'Licenses'];
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top">

        <div class="brand-col">
          <a href="#" class="footer-logo" aria-label="Flexi Book home">
            <span class="logo-icon" aria-hidden="true">
              <span class="material-icons">flight</span>
            </span>
            <span class="logo-text">Flexi Book</span>
          </a>
          <p class="tagline">Your accessible travel companion. Book flights,<br />hotels, and car rentals with confidence.</p>
        </div>

        <div class="links-col">
          <h4 class="col-title">Company</h4>
          <ul role="list">
            <li v-for="item in company" :key="item">
              <a href="#" class="footer-link">{{ item }}</a>
            </li>
          </ul>
        </div>

        <div class="links-col">
          <h4 class="col-title">Support</h4>
          <ul role="list">
            <li v-for="item in support" :key="item">
              <a href="#" class="footer-link">{{ item }}</a>
            </li>
          </ul>
        </div>

        <div class="links-col">
          <h4 class="col-title">Legal</h4>
          <ul role="list">
            <li v-for="item in legal" :key="item">
              <a href="#" class="footer-link">{{ item }}</a>
            </li>
          </ul>
        </div>

      </div>

      <div class="footer-bottom">
        <p class="copyright">© 2026 Flexi Book. All rights reserved. Built with accessibility in mind.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped src="./Footer.css"></style>
