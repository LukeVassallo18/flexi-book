<template>
  <div class="car-rentals-page">
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
                <input v-model="searchForm.pickupLocation" type="text" list="countries-list-cars" placeholder="Choose country" />
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

        <datalist id="countries-list-cars">
          <option v-for="country in availableCountries" :key="`cars-${country}`" :value="country" />
        </datalist>
      </div>
    </div>

    <div class="rentals-content">
      <div class="rentals-container">
        <div class="filters">
          <h2>Filters</h2>

          <div class="filter-group">
            <h3>Price: ${{ filters.maxPrice }}/day</h3>
            <input type="range" v-model.number="filters.maxPrice" min="0" max="150" step="10" />
          </div>

          <div class="filter-group">
            <h3>Car Type</h3>
            <div style="display: grid; gap: 0.6rem;">
              <label v-for="type in availableCarTypes" :key="type" style="display: inline-flex; gap: 0.5rem; align-items: center;">
                <input type="checkbox" :checked="filters.carTypes.includes(type)" @change="toggleCarTypeFilter(type)" />
                <span>{{ type }}</span>
              </label>
            </div>
          </div>

          <div class="filter-group" v-if="showAdvancedFilters">
            <h3>Transmission</h3>
            <div style="display: grid; gap: 0.6rem;">
              <label v-for="transmission in availableTransmissions" :key="transmission" style="display: inline-flex; gap: 0.5rem; align-items: center;">
                <input type="checkbox" :checked="filters.transmission.includes(transmission)" @change="toggleTransmissionFilter(transmission)" />
                <span>{{ transmission }}</span>
              </label>
            </div>
          </div>

          <div class="filter-group" v-if="showAdvancedFilters">
            <h3>Fuel Type</h3>
            <div style="display: grid; gap: 0.6rem;">
              <label v-for="fuel in availableFuelTypes" :key="fuel" style="display: inline-flex; gap: 0.5rem; align-items: center;">
                <input type="checkbox" :checked="filters.fuelTypes.includes(fuel)" @change="toggleFuelTypeFilter(fuel)" />
                <span>{{ fuel }}</span>
              </label>
            </div>
          </div>

          <div class="filter-group" v-if="showAdvancedFilters">
            <h3>Features</h3>
            <div style="display: grid; gap: 0.6rem;">
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;"><input type="checkbox" :checked="filters.features.includes('GPS')" @change="toggleFeatureFilter('GPS')" /><span>GPS</span></label>
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;"><input type="checkbox" :checked="filters.features.includes('Unlimited Mileage')" @change="toggleFeatureFilter('Unlimited Mileage')" /><span>Unlimited Mileage</span></label>
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;"><input type="checkbox" :checked="filters.features.includes('Leather Seats')" @change="toggleFeatureFilter('Leather Seats')" /><span>Leather Seats</span></label>
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;"><input type="checkbox" :checked="filters.features.includes('Autopilot')" @change="toggleFeatureFilter('Autopilot')" /><span>Autopilot</span></label>
            </div>
          </div>

          <button class="toggle-filters-btn" type="button" @click="showAdvancedFilters = !showAdvancedFilters">
            {{ showAdvancedFilters ? 'Show fewer filters' : 'Show more filters' }}
          </button>

          <button class="clear-btn" @click="clearFilters">Clear all filters</button>
        </div>

        <div class="results">
          <PaginatedResults :items="filteredCars" :page-size="12" item-label="cars">
            <template #default="{ items }">
              <div v-for="car in items" :key="car.id" class="rental-card" @click="viewCarDetails(car)" style="cursor: pointer;">
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
                    <div class="detail-item"><span class="material-icons">local_gas_station</span><span>{{ car.fuel }}</span></div>
                    <div class="detail-item"><span class="material-icons">settings</span><span>{{ car.transmission }}</span></div>
                    <div class="detail-item"><span class="material-icons">people</span><span>{{ car.seats }} Seats</span></div>
                  </div>
                  <div class="rental-bottom">
                    <div>
                      <strong>${{ car.price }}/day</strong>
                      <div style="font-size: 0.8rem; opacity: 0.85; margin-top: 0.2rem;">
                        ~${{ car.pricePerPerson }}/person/day • Total ${{ car.totalPrice }} for {{ car.rentalDays }} day{{ car.rentalDays > 1 ? 's' : '' }}
                      </div>
                    </div>
                    <button type="button" @click.stop="bookCar(car)">Book Now</button>
                  </div>
                </div>
              </div>
            </template>

            <template #empty>
              <div class="no-results">
                <p>No cars found. Try adjusting your filters.</p>
              </div>
            </template>
          </PaginatedResults>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PaginatedResults from '../components/Cards/PaginatedResults.vue';
import carBrandsData from '../data/carBrands.json';
import carsData from '../data/cars.json';
import countriesData from '../data/countries.json';
import { useCart } from '../services/cartStore';

const route = useRoute();
const router = useRouter();
const { addToCart } = useCart();

const availableCountries = [...countriesData].sort((a, b) => a.localeCompare(b));
const carBrands = [...carBrandsData];

function normalizeCountry(value) {
  return (value || '').toLowerCase().replace('united states', 'usa').replace('united arab emirates', 'uae').trim();
}

const generatedBrandCars = carBrands.map((brand, index) => {
  const types = ['Economy', 'Compact', 'SUV', 'Luxury', 'Sedan', 'Van'];
  const fuels = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const transmissions = ['Automatic', 'Manual'];

  return {
    id: 2000 + index,
    name: `${brand} ${types[index % types.length]}`,
    rating: Number((4.2 + (index % 7) * 0.1).toFixed(1)),
    specs: `${types[index % types.length]} • ${transmissions[index % transmissions.length]} • ${4 + (index % 4)} Seats`,
    features: ['GPS', 'Unlimited Mileage', 'Bluetooth'],
    fuel: fuels[index % fuels.length],
    transmission: transmissions[index % transmissions.length],
    seats: 4 + (index % 4),
    price: 35 + (index % 11) * 8,
    type: types[index % types.length],
    brand,
    location: availableCountries[index % availableCountries.length],
    availableFrom: '2026-01-01',
    availableTo: '2027-12-31',
  };
});

const generatedCountryCars = availableCountries.map((country, index) => {
  const brand = carBrands[index % carBrands.length];
  const types = ['Economy', 'Compact', 'SUV', 'Luxury', 'Sedan', 'Van'];
  const fuels = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const transmissions = ['Automatic', 'Manual'];

  return {
    id: 3000 + index,
    name: `${brand} ${country} Edition`,
    rating: Number((4.1 + (index % 8) * 0.1).toFixed(1)),
    specs: `${types[index % types.length]} • ${transmissions[index % transmissions.length]} • ${5 + (index % 3)} Seats`,
    features: ['GPS', 'Bluetooth', 'Unlimited Mileage'],
    fuel: fuels[index % fuels.length],
    transmission: transmissions[index % transmissions.length],
    seats: 5 + (index % 3),
    price: 30 + (index % 12) * 7,
    type: types[index % types.length],
    brand,
    location: country,
    availableFrom: '2026-01-01',
    availableTo: '2027-12-31',
  };
});

const allCars = [...carsData, ...generatedBrandCars, ...generatedCountryCars];

const searchForm = ref({
  pickupLocation: route.query.pickupLocation || '',
  pickupDate: route.query.pickupDate || '',
  dropoffDate: route.query.dropoffDate || '',
});

const activeSearch = ref({
  pickupLocation: searchForm.value.pickupLocation,
  pickupDate: searchForm.value.pickupDate,
  dropoffDate: searchForm.value.dropoffDate,
});

const filters = ref({
  maxPrice: 150,
  carTypes: [],
  transmission: [],
  fuelTypes: [],
  features: [],
});

const showAdvancedFilters = ref(false);

const availableCarTypes = computed(() => Array.from(new Set(allCars.map((c) => c.type))).sort());
const availableTransmissions = computed(() => Array.from(new Set(allCars.map((c) => c.transmission))).sort());
const availableFuelTypes = computed(() => Array.from(new Set(allCars.map((c) => c.fuel))).sort());

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getRentalDays(pickupDateValue, dropoffDateValue) {
  if (!pickupDateValue || !dropoffDateValue) return 1;
  const pickupDate = new Date(`${pickupDateValue}T00:00:00`);
  const dropoffDate = new Date(`${dropoffDateValue}T00:00:00`);
  const diffMs = dropoffDate.getTime() - pickupDate.getTime();
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return Number.isFinite(days) && days > 0 ? days : 1;
}

function getCarDateDemandFactor(pickupDateValue) {
  if (!pickupDateValue) return 1;
  const date = new Date(`${pickupDateValue}T00:00:00`);
  if (Number.isNaN(date.getTime())) return 1;
  const day = date.getDay();
  const weekendFactor = day === 5 || day === 6 ? 1.06 : 1;
  const monthFactor = [0.97, 0.96, 0.98, 1, 1.02, 1.06, 1.09, 1.08, 1.03, 1.01, 0.99, 1.02][date.getMonth()];
  return weekendFactor * monthFactor;
}

function calculateCarPricing(car) {
  const pickupDate = activeSearch.value.pickupDate || car.availableFrom || '2026-06-15';
  const dropoffDate = activeSearch.value.dropoffDate || '2026-06-16';
  const rentalDays = getRentalDays(pickupDate, dropoffDate);
  const location = normalizeCountry(activeSearch.value.pickupLocation || car.location);

  const baseDaily = Number(car.basePrice ?? car.price);
  const carSeed = hashString(`${car.id}|${car.name}|${car.brand || ''}|${car.type}|${car.transmission}|${car.fuel}`);
  const searchSeed = hashString(`${location}|${pickupDate}|${dropoffDate}|${rentalDays}|${car.id}`);

  const categoryFactor = 0.94 + (carSeed % 16) / 100;
  const searchFactor = 0.96 + (searchSeed % 10) / 100;
  const dateFactor = getCarDateDemandFactor(pickupDate);

  const dailyPrice = Math.max(20, Math.round(baseDaily * categoryFactor * searchFactor * dateFactor));
  const totalPrice = Math.max(dailyPrice, Math.round(dailyPrice * rentalDays));
  const pricePerPerson = Math.max(5, Math.round(dailyPrice / Math.max(1, car.seats)));

  return {
    dailyPrice,
    totalPrice,
    rentalDays,
    pricePerPerson,
  };
}

// Filter cars based on criteria
const filteredCars = computed(() => {
  const matchesSearch = (car) => {
    const locationValue = activeSearch.value.pickupLocation.trim().toLowerCase();
    const pickupDateValue = activeSearch.value.pickupDate;
    const dropoffDateValue = activeSearch.value.dropoffDate;

    const normalizedLocation = normalizeCountry(car.location);
    const normalizedSearchLocation = normalizeCountry(locationValue);
    if (locationValue && !car.location.toLowerCase().includes(locationValue) && !normalizedLocation.includes(normalizedSearchLocation)) return false;
    if (pickupDateValue && pickupDateValue < car.availableFrom) return false;
    if (dropoffDateValue && dropoffDateValue > car.availableTo) return false;

    return true;
  };

  const matchesFilters = (car) => {

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
  };

  const searchMatches = allCars.filter(matchesSearch);
  const pricedCars = searchMatches.map((car) => {
    const pricing = calculateCarPricing(car);
    return {
      ...car,
      price: pricing.dailyPrice,
      pricePerPerson: pricing.pricePerPerson,
      totalPrice: pricing.totalPrice,
      rentalDays: pricing.rentalDays,
    };
  });

  return pricedCars.filter(matchesFilters);
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
  filters.value = { maxPrice: 150, carTypes: [], transmission: [], fuelTypes: [], features: [] };
}

function hasAtLeastOneSearchField() {
  return Boolean(
    searchForm.value.pickupLocation.trim() || searchForm.value.pickupDate || searchForm.value.dropoffDate
  );
}

function handleSearch() {
  if (!hasAtLeastOneSearchField()) {
    alert('Please fill in at least one search field');
    return;
  }

  activeSearch.value = {
    pickupLocation: searchForm.value.pickupLocation,
    pickupDate: searchForm.value.pickupDate,
    dropoffDate: searchForm.value.dropoffDate,
  };

  router.replace({
    path: '/car-rentals',
    query: {
      ...(searchForm.value.pickupLocation && { pickupLocation: searchForm.value.pickupLocation }),
      ...(searchForm.value.pickupDate && { pickupDate: searchForm.value.pickupDate }),
      ...(searchForm.value.dropoffDate && { dropoffDate: searchForm.value.dropoffDate }),
    },
  });
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
