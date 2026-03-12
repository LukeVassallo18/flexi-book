<script setup>
import AccessibilityMenu from './AccessibilityMenu.vue';
</script>

<template>
  <nav class="navbar" aria-label="Main navigation">
    <div class="navbar-container">

      <div class="nav-left">
        <a href="#" class="navbar-logo" aria-label="Flexi Book home">
          <span class="logo-icon" aria-hidden="true">
            <span class="material-icons">flight</span>
          </span>
          <span class="logo-text">Flexi Book</span>
        </a>
      </div>

      <ul class="nav-center" role="list">
        <li><a href="#" class="nav-link">Flights</a></li>
        <li><a href="#" class="nav-link">Hotels</a></li>
        <li><a href="#" class="nav-link">Car Rentals</a></li>
      </ul>

      <div class="nav-right">
        <AccessibilityMenu />
      </div>

    </div>
  </nav>
</template>

<style scoped src="./Navbar.css"></style>
