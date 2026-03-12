<template>
  <div class="car-rentals-page">
    <!-- Hero Section -->
    <div class="rentals-hero">
      <div class="hero-bubble bubble-1"></div>
      <div class="hero-bubble bubble-2"></div>
      
      <div class="rentals-hero-inner">
        <h1>Rent a Car</h1>
        <p>Find the perfect vehicle for your trip at the best prices</p>
        
        <form class="search-form" @submit.prevent="handleSearch">
          <div class="search-grid">
            <label>
              <span>Pick-up Location</span>
              <div class="input-wrap">
                <span class="material-icons">location_on</span>
                <input v-model="searchForm.pickupLocation" type="text" placeholder="City or airport" />
              </div>
            </label>
            
            <label>
              <span>Pick-up Date</span>
              <div class="input-wrap">
                <span class="material-icons">calendar_today</span>
                <input v-model="searchForm.pickupDate" type="date" placeholder="Add date" />
              </div>
            </label>
            
            <label>
              <span>Drop-off Date</span>
              <div class="input-wrap">
                <span class="material-icons">calendar_today</span>
                <input v-model="searchForm.dropoffDate" type="date" placeholder="Add date" />
              </div>
            </label>
            
            <button type="submit" class="search-btn">
              <span class="material-icons">search</span>
              Search
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Content Section -->
    <div class="rentals-content">
      <div class="rentals-container">
        <!-- Filters Sidebar -->
        <div class="filters">
          <h2>Filters</h2>
          
          <div class="filter-group">
            <h3>Price: ${{ filters.maxPrice }}/day</h3>
            <input type="range" v-model.number="filters.maxPrice" min="0" max="150" step="10" />
            <div class="price-range">
            </div>
          </div>

          <div class="filter-group">
            <h3>Car Type</h3>
            <div style="display: grid; gap: 0.6rem;">
              <label v-for="type in availableCarTypes" :key="type" style="display: inline-flex; gap: 0.5rem; align-items: center;">
                <input 
                  type="checkbox"
                  :checked="filters.carTypes.includes(type)"
                  @change="toggleCarTypeFilter(type)"
                />
                <span>{{ type }}</span>
              </label>
            </div>
          </div>

          <div class="filter-group">
            <h3>Transmission</h3>
            <div style="display: grid; gap: 0.6rem;">
              <label v-for="transmission in availableTransmissions" :key="transmission" style="display: inline-flex; gap: 0.5rem; align-items: center;">
                <input 
                  type="checkbox"
                  :checked="filters.transmission.includes(transmission)"
                  @change="toggleTransmissionFilter(transmission)"
                />
                <span>{{ transmission }}</span>
              </label>
            </div>
          </div>

          <div class="filter-group">
            <h3>Fuel Type</h3>
            <div style="display: grid; gap: 0.6rem;">
              <label v-for="fuel in availableFuelTypes" :key="fuel" style="display: inline-flex; gap: 0.5rem; align-items: center;">
                <input 
                  type="checkbox"
                  :checked="filters.fuelTypes.includes(fuel)"
                  @change="toggleFuelTypeFilter(fuel)"
                />
                <span>{{ fuel }}</span>
              </label>
            </div>
          </div>

          <div class="filter-group">
            <h3>Features</h3>
            <div style="display: grid; gap: 0.6rem;">
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;">
                <input 
                  type="checkbox"
                  :checked="filters.features.includes('GPS')"
                  @change="toggleFeatureFilter('GPS')"
                />
                <span>GPS</span>
              </label>
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;">
                <input 
                  type="checkbox"
                  :checked="filters.features.includes('Unlimited Mileage')"
                  @change="toggleFeatureFilter('Unlimited Mileage')"
                />
                <span>Unlimited Mileage</span>
              </label>
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;">
                <input 
                  type="checkbox"
                  :checked="filters.features.includes('Leather Seats')"
                  @change="toggleFeatureFilter('Leather Seats')"
                />
                <span>Leather Seats</span>
              </label>
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;">
                <input 
                  type="checkbox"
                  :checked="filters.features.includes('Autopilot')"
                  @change="toggleFeatureFilter('Autopilot')"
                />
                <span>Autopilot</span>
              </label>
            </div>
          </div>

          <button class="clear-btn" @click="clearFilters">Clear all filters</button>
        </div>

        <!-- Results -->
        <div class="results">
          <div v-if="filteredCars.length === 0" class="no-results">
            <p>No cars found. Try adjusting your filters.</p>
          </div>
          <div v-for="car in filteredCars" :key="car.id" class="rental-card" @click="viewCarDetails(car)" style="cursor: pointer;">
            <div class="rental-thumb">
              <span class="material-icons">directions_car</span>
            </div>
            <div class="rental-main">
              <div class="rental-top">
                <h3>{{ car.name }}</h3>
                <div class="rating">
                  <span class="material-icons">star</span>
                  {{ car.rating }}
                </div>
              </div>
              <div class="rental-specs">{{ car.specs }}</div>
              <div class="rental-features">
                <span v-for="feature in car.features" :key="feature">{{ feature }}</span>
              </div>
              <div class="rental-details">
                <div class="detail-item">
                  <span class="material-icons">local_gas_station</span>
                  <span>{{ car.fuel }}</span>
                </div>
                <div class="detail-item">
                  <span class="material-icons">settings</span>
                  <span>{{ car.transmission }}</span>
                </div>
                <div class="detail-item">
                  <span class="material-icons">people</span>
                  <span>{{ car.seats }} Seats</span>
                </div>
              </div>
              <div class="rental-bottom">
                <strong>${{ car.price }}/day</strong>
                <button type="button" @click.stop="bookCar(car)">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCart } from '../services/cartStore';

const route = useRoute();
const router = useRouter();
const { addToCart } = useCart();

const allCars = [
  {
    id: 1,
    name: 'Toyota Corolla',
    rating: 4.6,
    specs: 'Economy • Automatic • 5 Seats',
    features: ['GPS', 'Unlimited Mileage'],
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    price: 35,
    type: 'Economy',
  },
  {
    id: 2,
    name: 'BMW 3 Series',
    rating: 4.8,
    specs: 'Luxury • Automatic • 5 Seats',
    features: ['GPS', 'Leather Seats', 'Bluetooth'],
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    price: 95,
    type: 'Luxury',
  },
  {
    id: 3,
    name: 'Jeep Wrangler',
    rating: 4.7,
    specs: 'SUV • Automatic • 5 Seats',
    features: ['4WD', 'GPS', 'Adventure Ready'],
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    price: 75,
    type: 'SUV',
  },
  {
    id: 4,
    name: 'Tesla Model 3',
    rating: 4.9,
    specs: 'Electric • Automatic • 5 Seats',
    features: ['Electric', 'Autopilot', 'GPS'],
    fuel: 'Electric',
    transmission: 'Automatic',
    seats: 5,
    price: 85,
    type: 'Compact',
  },
  {
    id: 5,
    name: 'Mercedes-Benz V-Class',
    rating: 4.5,
    specs: 'Van • Automatic • 7 Seats',
    features: ['Spacious', 'GPS', 'Family Friendly'],
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 7,
    price: 110,
    type: 'Van',
  },
];

// Form state
const searchForm = ref({
  pickupLocation: route.query.pickupLocation || '',
  pickupDate: route.query.pickupDate || '',
  dropoffDate: route.query.dropoffDate || '',
});

// Filter state
const filters = ref({
  maxPrice: 150,
  carTypes: [],
  transmission: [],
  fuelTypes: [],
  features: [],
});

// Get unique values for filter options
const availableCarTypes = computed(() => {
  const types = new Set(allCars.map(c => c.type));
  return Array.from(types).sort();
});

const availableTransmissions = computed(() => {
  const transmissions = new Set(allCars.map(c => c.transmission));
  return Array.from(transmissions).sort();
});

const availableFuelTypes = computed(() => {
  const fuels = new Set(allCars.map(c => c.fuel));
  return Array.from(fuels).sort();
});

// Filter cars based on criteria
const filteredCars = computed(() => {
  return allCars.filter(car => {
    // Price filter
    if (car.price > filters.value.maxPrice) return false;

    // Car type filter
    if (filters.value.carTypes.length > 0) {
      if (!filters.value.carTypes.includes(car.type)) return false;
    }

    // Transmission filter
    if (filters.value.transmission.length > 0) {
      if (!filters.value.transmission.includes(car.transmission)) return false;
    }

    // Fuel type filter
    if (filters.value.fuelTypes.length > 0) {
      if (!filters.value.fuelTypes.includes(car.fuel)) return false;
    }

    // Features filter
    if (filters.value.features.length > 0) {
      const hasFeatures = filters.value.features.some(feature =>
        car.features.includes(feature)
      );
      if (!hasFeatures) return false;
    }

    return true;
  });
});

// Filter toggle functions
function toggleCarTypeFilter(type) {
  const index = filters.value.carTypes.indexOf(type);
  if (index > -1) {
    filters.value.carTypes.splice(index, 1);
  } else {
    filters.value.carTypes.push(type);
  }
}

function toggleTransmissionFilter(transmission) {
  const index = filters.value.transmission.indexOf(transmission);
  if (index > -1) {
    filters.value.transmission.splice(index, 1);
  } else {
    filters.value.transmission.push(transmission);
  }
}

function toggleFuelTypeFilter(fuel) {
  const index = filters.value.fuelTypes.indexOf(fuel);
  if (index > -1) {
    filters.value.fuelTypes.splice(index, 1);
  } else {
    filters.value.fuelTypes.push(fuel);
  }
}

function toggleFeatureFilter(feature) {
  const index = filters.value.features.indexOf(feature);
  if (index > -1) {
    filters.value.features.splice(index, 1);
  } else {
    filters.value.features.push(feature);
  }
}

function clearFilters() {
  filters.value = {
    maxPrice: 150,
    carTypes: [],
    transmission: [],
    fuelTypes: [],
    features: [],
  };
}

function handleSearch() {
  if (!searchForm.value.pickupLocation || !searchForm.value.pickupDate || !searchForm.value.dropoffDate) {
    alert('Please fill in all search fields');
    return;
  }
}

function bookCar(car) {
  addToCart({ ...car, type: 'Car' });
  alert(`Car booked: ${car.name}`);
  router.push('/cart');
}

// View car details on separate page
function viewCarDetails(car) {
  const carEncoded = encodeURIComponent(JSON.stringify(car));
  router.push({ name: 'car-detail', params: { car: carEncoded } });
}
</script>

<style scoped src="./CarRentalsPage.css"></style>
