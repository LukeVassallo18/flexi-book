<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import AccessibilityMenu from './AccessibilityMenu.vue';
import CartIcon from './CartIcon.vue';

const mobileMenuOpen = ref(false);

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

function closeMobileMenu() {
  mobileMenuOpen.value = false;
}
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

      <ul class="nav-center" :class="{ active: mobileMenuOpen }" role="list">
        <li>
          <RouterLink to="/flights" class="nav-link" @click="closeMobileMenu">
            <span class="material-icons" aria-hidden="true">flight_takeoff</span>
            <span>Flights</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/hotels" class="nav-link" @click="closeMobileMenu">
            <span class="material-icons" aria-hidden="true">hotel</span>
            <span>Hotels</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/car-rentals" class="nav-link" @click="closeMobileMenu">
            <span class="material-icons" aria-hidden="true">directions_car</span>
            <span>Car Rentals</span>
          </RouterLink>
        </li>
      </ul>

      <div class="nav-right">
        <AccessibilityMenu />
        <CartIcon />
        <button 
          class="hamburger" 
          @click="toggleMobileMenu"
          :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
        >
          <span class="material-icons" aria-hidden="true">
            {{ mobileMenuOpen ? 'close' : 'menu' }}
          </span>
        </button>
      </div>

    </div>
  </nav>
</template>

<style scoped src="./Navbar.css"></style>
