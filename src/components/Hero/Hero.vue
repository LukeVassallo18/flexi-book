<script setup>
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import countriesData from '../../data/countries.json';

const router = useRouter();
const activeTab = ref('flights');
const availableCountries = [...countriesData].sort((a, b) => a.localeCompare(b));

const tabs = [
  { id: 'flights',     label: 'Flights',     icon: 'flight' },
  { id: 'hotels',      label: 'Hotels',      icon: 'apartment' },
  { id: 'car-rentals', label: 'Car Rentals', icon: 'directions_car' },
];

const activeTabIndex = computed(() => {
  const index = tabs.findIndex((tab) => tab.id === activeTab.value);
  return index >= 0 ? index : 0;
});

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
    if (!searchForm.from.trim() && !searchForm.to.trim() && !searchForm.departDate) {
      alert('Please fill in at least one flight search field');
      return;
    }
    router.push({
      path: '/flights',
      query: {
        ...(searchForm.from && { from: searchForm.from }),
        ...(searchForm.to && { to: searchForm.to }),
        ...(searchForm.departDate && { departDate: searchForm.departDate }),
        travelers: searchForm.travelers,
      },
    });
  } else if (activeTab.value === 'hotels') {
    if (!searchForm.destination.trim() && !searchForm.checkIn && !searchForm.checkOut) {
      alert('Please fill in at least one hotel search field');
      return;
    }
    router.push({
      path: '/hotels',
      query: {
        ...(searchForm.destination && { destination: searchForm.destination }),
        ...(searchForm.checkIn && { checkIn: searchForm.checkIn }),
        ...(searchForm.checkOut && { checkOut: searchForm.checkOut }),
        guests: searchForm.guests,
      },
    });
  } else if (activeTab.value === 'car-rentals') {
    if (!searchForm.pickupLocation.trim() && !searchForm.pickupDate && !searchForm.dropoffDate) {
      alert('Please fill in at least one car rental search field');
      return;
    }
    router.push({
      path: '/car-rentals',
      query: {
        ...(searchForm.pickupLocation && { pickupLocation: searchForm.pickupLocation }),
        ...(searchForm.pickupDate && { pickupDate: searchForm.pickupDate }),
        ...(searchForm.dropoffDate && { dropoffDate: searchForm.dropoffDate }),
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

      <div class="search-shell" data-a11y-target="form-shell">
        <div
          class="travel-tabs"
          data-a11y-target="form-tabs"
          role="tablist"
          aria-label="Travel type"
          :style="{ '--active-index': activeTabIndex }"
        >
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="tab"
            :class="{ active: activeTab === tab.id }"
            type="button"
            role="tab"
            :aria-selected="activeTab === tab.id"
            data-a11y-target="tab-background"
            @click="activeTab = tab.id"
          >
            <span class="material-icons tab-icon" aria-hidden="true" data-a11y-target="tab-text">{{ tab.icon }}</span>
            <span class="tab-label" data-a11y-target="tab-text">{{ tab.label }}</span>
          </button>
        </div>

        <form class="search-card" data-a11y-target="form-card" @submit="handleSearch">
          <Transition name="tab-panel" mode="out-in">
            <!-- FLIGHTS TAB -->
            <div v-if="activeTab === 'flights'" key="flights" class="field-grid" data-a11y-target="form-fields">
              <label class="field">
                <span class="field-label">From</span>
                <span class="input-wrap" data-a11y-target="input-background">
                  <span class="material-icons field-icon" aria-hidden="true">location_on</span>
                  <input 
                    v-model="searchForm.from" 
                    class="hero-city-input"
                    type="text" 
                    list="countries-list-home"
                    placeholder="Departure city" 
                    aria-label="Departure city" 
                    data-a11y-target="input-text"
                  />
                </span>
              </label>

              <label class="field">
                <span class="field-label">To</span>
                <span class="input-wrap" data-a11y-target="input-background">
                  <span class="material-icons field-icon" aria-hidden="true">location_on</span>
                  <input 
                    v-model="searchForm.to" 
                    class="hero-city-input"
                    type="text" 
                    list="countries-list-home"
                    placeholder="Destination" 
                    aria-label="Destination" 
                    data-a11y-target="input-text"
                  />
                </span>
              </label>

              <label class="field">
                <span class="field-label">Depart</span>
                <span class="input-wrap" data-a11y-target="input-background">
                  <span class="material-icons field-icon" aria-hidden="true">calendar_month</span>
                  <input 
                    v-model="searchForm.departDate" 
                    type="date" 
                    aria-label="Departure date" 
                    data-a11y-target="input-text"
                  />
                </span>
              </label>

              <label class="field">
                <span class="field-label">Travellers</span>
                <span class="input-wrap" data-a11y-target="input-background">
                  <span class="material-icons field-icon" aria-hidden="true">group</span>
                  <select v-model.number="searchForm.travelers" aria-label="Number of travellers" data-a11y-target="input-text">
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
            <div v-else-if="activeTab === 'hotels'" key="hotels" class="field-grid" data-a11y-target="form-fields">
              <label class="field">
                <span class="field-label">Destination</span>
                <span class="input-wrap" data-a11y-target="input-background">
                  <span class="material-icons field-icon" aria-hidden="true">location_on</span>
                  <input
                    v-model="searchForm.destination"
                    type="text"
                    list="countries-list-home"
                    placeholder="Choose country"
                    aria-label="Hotel destination country"
                    data-a11y-target="input-text"
                  />
                </span>
              </label>

              <label class="field">
                <span class="field-label">Check-in</span>
                <span class="input-wrap" data-a11y-target="input-background">
                  <span class="material-icons field-icon" aria-hidden="true">calendar_month</span>
                  <input 
                    v-model="searchForm.checkIn" 
                    type="date" 
                    aria-label="Check-in date" 
                    data-a11y-target="input-text"
                  />
                </span>
              </label>

              <label class="field">
                <span class="field-label">Check-out</span>
                <span class="input-wrap" data-a11y-target="input-background">
                  <span class="material-icons field-icon" aria-hidden="true">calendar_month</span>
                  <input 
                    v-model="searchForm.checkOut" 
                    type="date" 
                    aria-label="Check-out date" 
                    data-a11y-target="input-text"
                  />
                </span>
              </label>

              <label class="field">
                <span class="field-label">Guests</span>
                <span class="input-wrap" data-a11y-target="input-background">
                  <span class="material-icons field-icon" aria-hidden="true">group</span>
                  <select v-model.number="searchForm.guests" aria-label="Number of guests" data-a11y-target="input-text">
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
            <div v-else key="car-rentals" class="field-grid" data-a11y-target="form-fields">
              <label class="field">
                <span class="field-label">Pick-up Location</span>
                <span class="input-wrap" data-a11y-target="input-background">
                  <span class="material-icons field-icon" aria-hidden="true">location_on</span>
                  <input
                    v-model="searchForm.pickupLocation"
                    type="text"
                    list="countries-list-home"
                    placeholder="Choose country"
                    aria-label="Pick-up country"
                    data-a11y-target="input-text"
                  />
                </span>
              </label>

              <label class="field">
                <span class="field-label">Pick-up Date</span>
                <span class="input-wrap" data-a11y-target="input-background">
                  <span class="material-icons field-icon" aria-hidden="true">calendar_month</span>
                  <input 
                    v-model="searchForm.pickupDate" 
                    type="date" 
                    aria-label="Pick-up date" 
                    data-a11y-target="input-text"
                  />
                </span>
              </label>

              <label class="field">
                <span class="field-label">Drop-off Date</span>
                <span class="input-wrap" data-a11y-target="input-background">
                  <span class="material-icons field-icon" aria-hidden="true">calendar_month</span>
                  <input 
                    v-model="searchForm.dropoffDate" 
                    type="date" 
                    aria-label="Drop-off date" 
                    data-a11y-target="input-text"
                  />
                </span>
              </label>

              <label class="field" style="visibility: hidden;">
                <span class="field-label">Placeholder</span>
                <span class="input-wrap" data-a11y-target="input-background">
                  <input type="text" data-a11y-target="input-text" />
                </span>
              </label>
            </div>
          </Transition>

          <button class="search-btn" type="submit" data-a11y-target="search-button">
            <span class="material-icons search-btn-icon" aria-hidden="true" data-a11y-target="search-button-text">search</span>
            <span class="search-btn-label" data-a11y-target="search-button-text">Search</span>
          </button>
        </form>

        <datalist id="countries-list-home">
          <option v-for="country in availableCountries" :key="`home-${country}`" :value="country" />
        </datalist>
      </div>
    </div>
  </section>
</template>

<style scoped src="./Hero.css"></style>
