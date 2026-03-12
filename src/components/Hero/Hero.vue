<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeTab = ref('flights');

const tabs = [
  { id: 'flights',     label: 'Flights',     icon: 'flight' },
  { id: 'hotels',      label: 'Hotels',      icon: 'apartment' },
  { id: 'car-rentals', label: 'Car Rentals', icon: 'directions_car' },
];

// Form state
const searchForm = reactive({
  from: '',
  to: '',
  departDate: '',
  returnDate: '',
  travelers: 1,
  destination: '',
  checkIn: '',
  checkOut: '',
  guests: 1,
  pickupLocation: '',
  pickupDate: '',
  dropoffDate: '',
  rentalDays: 1,
});

// Handle form submission
function handleSearch(e) {
  e.preventDefault();

  if (activeTab.value === 'flights') {
    if (!searchForm.from || !searchForm.to || !searchForm.departDate) {
      alert('Please fill in all flight search fields');
      return;
    }
    router.push({
      path: '/flights',
      query: {
        from: searchForm.from,
        to: searchForm.to,
        departDate: searchForm.departDate,
        travelers: searchForm.travelers,
      },
    });
  } else if (activeTab.value === 'hotels') {
    if (!searchForm.destination || !searchForm.checkIn || !searchForm.checkOut) {
      alert('Please fill in all hotel search fields');
      return;
    }
    router.push({
      path: '/hotels',
      query: {
        destination: searchForm.destination,
        checkIn: searchForm.checkIn,
        checkOut: searchForm.checkOut,
        guests: searchForm.guests,
      },
    });
  } else if (activeTab.value === 'car-rentals') {
    if (!searchForm.pickupLocation || !searchForm.pickupDate || !searchForm.dropoffDate) {
      alert('Please fill in all car rental search fields');
      return;
    }
    router.push({
      path: '/car-rentals',
      query: {
        location: searchForm.pickupLocation,
        pickupDate: searchForm.pickupDate,
        dropoffDate: searchForm.dropoffDate,
      },
    });
  }
}
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

        <form class="search-card" @submit="handleSearch">
          <!-- FLIGHTS TAB -->
          <div v-show="activeTab === 'flights'" class="field-grid">
            <label class="field">
              <span class="field-label">From</span>
              <span class="input-wrap">
                <span class="material-icons field-icon" aria-hidden="true">location_on</span>
                <input 
                  v-model="searchForm.from" 
                  type="text" 
                  placeholder="Departure city" 
                  aria-label="Departure city" 
                />
              </span>
            </label>

            <label class="field">
              <span class="field-label">To</span>
              <span class="input-wrap">
                <span class="material-icons field-icon" aria-hidden="true">location_on</span>
                <input 
                  v-model="searchForm.to" 
                  type="text" 
                  placeholder="Destination" 
                  aria-label="Destination" 
                />
              </span>
            </label>

            <label class="field">
              <span class="field-label">Depart</span>
              <span class="input-wrap">
                <span class="material-icons field-icon" aria-hidden="true">calendar_month</span>
                <input 
                  v-model="searchForm.departDate" 
                  type="date" 
                  aria-label="Departure date" 
                />
              </span>
            </label>

            <label class="field">
              <span class="field-label">Travellers</span>
              <span class="input-wrap">
                <span class="material-icons field-icon" aria-hidden="true">group</span>
                <select v-model.number="searchForm.travelers" aria-label="Number of travellers">
                  <option value="1">1 Adult</option>
                  <option value="2">2 Adults</option>
                  <option value="3">3 Adults</option>
                  <option value="4">4 Adults</option>
                  <option value="5">5 Adults</option>
                  <option value="6">6+ Adults</option>
                </select>
              </span>
            </label>
          </div>

          <!-- HOTELS TAB -->
          <div v-show="activeTab === 'hotels'" class="field-grid">
            <label class="field">
              <span class="field-label">Destination</span>
              <span class="input-wrap">
                <span class="material-icons field-icon" aria-hidden="true">location_on</span>
                <input 
                  v-model="searchForm.destination" 
                  type="text" 
                  placeholder="City or hotel name" 
                  aria-label="Hotel destination" 
                />
              </span>
            </label>

            <label class="field">
              <span class="field-label">Check-in</span>
              <span class="input-wrap">
                <span class="material-icons field-icon" aria-hidden="true">calendar_month</span>
                <input 
                  v-model="searchForm.checkIn" 
                  type="date" 
                  aria-label="Check-in date" 
                />
              </span>
            </label>

            <label class="field">
              <span class="field-label">Check-out</span>
              <span class="input-wrap">
                <span class="material-icons field-icon" aria-hidden="true">calendar_month</span>
                <input 
                  v-model="searchForm.checkOut" 
                  type="date" 
                  aria-label="Check-out date" 
                />
              </span>
            </label>

            <label class="field">
              <span class="field-label">Guests</span>
              <span class="input-wrap">
                <span class="material-icons field-icon" aria-hidden="true">group</span>
                <select v-model.number="searchForm.guests" aria-label="Number of guests">
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5+ Guests</option>
                </select>
              </span>
            </label>
          </div>

          <!-- CAR RENTALS TAB -->
          <div v-show="activeTab === 'car-rentals'" class="field-grid">
            <label class="field">
              <span class="field-label">Pick-up Location</span>
              <span class="input-wrap">
                <span class="material-icons field-icon" aria-hidden="true">location_on</span>
                <input 
                  v-model="searchForm.pickupLocation" 
                  type="text" 
                  placeholder="City or airport" 
                  aria-label="Pick-up location" 
                />
              </span>
            </label>

            <label class="field">
              <span class="field-label">Pick-up Date</span>
              <span class="input-wrap">
                <span class="material-icons field-icon" aria-hidden="true">calendar_month</span>
                <input 
                  v-model="searchForm.pickupDate" 
                  type="date" 
                  aria-label="Pick-up date" 
                />
              </span>
            </label>

            <label class="field">
              <span class="field-label">Drop-off Date</span>
              <span class="input-wrap">
                <span class="material-icons field-icon" aria-hidden="true">calendar_month</span>
                <input 
                  v-model="searchForm.dropoffDate" 
                  type="date" 
                  aria-label="Drop-off date" 
                />
              </span>
            </label>

            <label class="field" style="visibility: hidden;">
              <span class="field-label">Placeholder</span>
              <span class="input-wrap">
                <input type="text" />
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
