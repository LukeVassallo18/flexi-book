<script setup>
import { RouterLink } from 'vue-router';
import AccessibilityMenu from './AccessibilityMenu.vue';
</script>

<template>
  <nav class="navbar" aria-label="Main navigation">
    <div class="navbar-container">

      <div class="nav-left">
        <RouterLink to="/" class="navbar-logo" aria-label="Flexi Book home">
          <span class="logo-icon" aria-hidden="true">
            <span class="material-icons">flight</span>
          </span>
          <span class="logo-text">Flexi Book</span>
        </RouterLink>
      </div>

      <ul class="nav-center" role="list">
        <li><RouterLink to="/flights" class="nav-link">Flights</RouterLink></li>
        <li><RouterLink to="/" class="nav-link">Hotels</RouterLink></li>
        <li><RouterLink to="/" class="nav-link">Car Rentals</RouterLink></li>
      </ul>

      <div class="nav-right">
        <AccessibilityMenu />
      </div>

    </div>
  </nav>
</template>

<style scoped src="./Navbar.css"></style>
