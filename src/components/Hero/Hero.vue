<script setup>
import { ref } from 'vue';

const activeTab = ref('flights');

const tabs = [
  { id: 'flights',     label: 'Flights',     icon: 'flight' },
  { id: 'hotels',      label: 'Hotels',      icon: 'apartment' },
  { id: 'car-rentals', label: 'Car Rentals', icon: 'directions_car' },
];
</script>

<template>
  <section class="hero" aria-label="Search travel">
    <div class="overlay overlay-tr" aria-hidden="true"></div>
    <div class="overlay overlay-bl" aria-hidden="true"></div>

    <div class="hero-content">
      <h1 class="heading">Your Next Adventure<br />Starts Here</h1>
      <p class="subtitle">Search flights, hotels, and car rentals in one place. Accessible to everyone.</p>

      <div class="search-shell">
        <div class="travel-tabs" role="tablist" aria-label="Travel type">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="tab"
            :class="{ active: activeTab === tab.id }"
            type="button"
            role="tab"
            :aria-selected="activeTab === tab.id"
            @click="activeTab = tab.id"
          >
            <span class="material-icons tab-icon" aria-hidden="true">{{ tab.icon }}</span>
            <span>{{ tab.label }}</span>
          </button>
        </div>

        <form class="search-card" @submit.prevent>
          <div class="field-grid">
            <label class="field">
              <span class="field-label">From</span>
              <span class="input-wrap">
                <span class="material-icons field-icon" aria-hidden="true">location_on</span>
                <input type="text" placeholder="Departure city" aria-label="Departure city" />
              </span>
            </label>

            <label class="field">
              <span class="field-label">To</span>
              <span class="input-wrap">
                <span class="material-icons field-icon" aria-hidden="true">location_on</span>
                <input type="text" placeholder="Destination" aria-label="Destination" />
              </span>
            </label>

            <label class="field">
              <span class="field-label">Dates</span>
              <span class="input-wrap">
                <span class="material-icons field-icon" aria-hidden="true">calendar_month</span>
                <input type="text" placeholder="Select dates" aria-label="Select dates" />
              </span>
            </label>

            <label class="field">
              <span class="field-label">Travellers</span>
              <span class="input-wrap">
                <span class="material-icons field-icon" aria-hidden="true">group</span>
                <input type="text" placeholder="1 Adult" aria-label="Number of travellers" />
              </span>
            </label>
          </div>

          <button class="search-btn" type="submit">
            <span class="material-icons" aria-hidden="true">search</span>
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped src="./Hero.css"></style>
