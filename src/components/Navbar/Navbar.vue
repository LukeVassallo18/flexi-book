<script setup>
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="left">
        <a href="#" class="navbar-logo">
          <span class="navbar-logo-icon">
            <span class="material-icons">flight</span>
          </span>
          <span class="navbar-logo-text">Flexi Book</span>
        </a>
      </div>

      <ul class="center">
        <li><a href="#">Flights</a></li>
        <li><a href="#">Hotels</a></li>
        <li><a href="#">Car Rentals</a></li>
      </ul>

      <ul class="right">
        <li>
          <a href="#" class="navbar-link with-icon">
            <span class="material-icons" aria-hidden="true">accessibility_new</span>
            <span>Accessibility</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped src="./Navbar.css"></style>