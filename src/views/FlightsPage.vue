<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCart } from '../services/cartStore';

const route = useRoute();
const router = useRouter();
const { addToCart } = useCart();

const allFlights = [
  {
    route: 'New York → Tokyo',
    details: 'Delta • 1 Stop (LAX) • 16h 30m',
    tags: ['Business', '1 Stop'],
    rating: '4.6',
    price: 649,
    icon: 'flight_takeoff',
    airline: 'Delta',
    stops: 1,
  },
  {
    route: 'Dubai → Singapore',
    details: 'Emirates • Non-stop • 7h 20m',
    tags: ['Premium Economy', 'Non-stop'],
    rating: '4.9',
    price: 420,
    icon: 'public',
    airline: 'Emirates',
    stops: 0,
  },
  {
    route: 'Los Angeles → Bali',
    details: 'Qatar Airways • 1 Stop (DOH) • 20h 45m',
    tags: ['Economy', '1 Stop'],
    rating: '4.7',
    price: 780,
    icon: 'beach_access',
    airline: 'Qatar Airways',
    stops: 1,
  },
  {
    route: 'Sydney → London',
    details: 'British Airways • 1 Stop (SIN) • 23h 10m',
    tags: ['Business', '1 Stop'],
    rating: '4.5',
    price: 890,
    icon: 'travel_explore',
    airline: 'British Airways',
    stops: 1,
  },
  {
    route: 'Berlin → Rome',
    details: 'Lufthansa • Non-stop • 1h 55m',
    tags: ['Economy', 'Non-stop'],
    rating: '4.6',
    price: 120,
    icon: 'map',
    airline: 'Lufthansa',
    stops: 0,
  },
  {
    route: 'Paris → Barcelona',
    details: 'Air France • Non-stop • 2h 15m',
    tags: ['Economy', 'Non-stop'],
    rating: '4.4',
    price: 95,
    icon: 'flight',
    airline: 'Air France',
    stops: 0,
  },
  {
    route: 'London → New York',
    details: 'British Airways • Non-stop • 7h 30m',
    tags: ['Premium', 'Non-stop'],
    rating: '4.8',
    price: 650,
    icon: 'flight_takeoff',
    airline: 'British Airways',
    stops: 0,
  },
  {
    route: 'Singapore → Bangkok',
    details: 'Thai Airways • Non-stop • 2h 10m',
    tags: ['Economy', 'Non-stop'],
    rating: '4.5',
    price: 85,
    icon: 'public',
    airline: 'Thai Airways',
    stops: 0,
  },
];

// Form state
const searchForm = ref({
  from: route.query.from || '',
  to: route.query.to || '',
  departDate: route.query.departDate || '',
  passengers: parseInt(route.query.travelers) || 1,
});

// Filter state
const filters = ref({
  maxPrice: 1000,
  stops: [],
  airlines: [],
});

// Get unique airlines for filter options
const availableAirlines = computed(() => {
  const airlines = new Set(allFlights.map(f => f.airline));
  return Array.from(airlines).sort();
});

// Filter flights based on selected criteria
const filteredFlights = computed(() => {
  return allFlights.filter(flight => {
    // Price filter
    if (flight.price > filters.value.maxPrice) return false;

    // Stops filter
    if (filters.value.stops.length > 0) {
      const matchesStops = filters.value.stops.some(stop => {
        if (stop === 'nonstop') return flight.stops === 0;
        if (stop === '1stop') return flight.stops === 1;
        if (stop === '2plus') return flight.stops >= 2;
        return false;
      });
      if (!matchesStops) return false;
    }

    // Airlines filter
    if (filters.value.airlines.length > 0) {
      if (!filters.value.airlines.includes(flight.airline)) return false;
    }

    return true;
  });
});

// Handle filter changes
function toggleStopFilter(stopType) {
  const index = filters.value.stops.indexOf(stopType);
  if (index > -1) {
    filters.value.stops.splice(index, 1);
  } else {
    filters.value.stops.push(stopType);
  }
}

function toggleAirlineFilter(airline) {
  const index = filters.value.airlines.indexOf(airline);
  if (index > -1) {
    filters.value.airlines.splice(index, 1);
  } else {
    filters.value.airlines.push(airline);
  }
}

function clearFilters() {
  filters.value = {
    maxPrice: 1000,
    stops: [],
    airlines: [],
  };
}

// Handle new search
function handleSearch() {
  if (!searchForm.value.from || !searchForm.value.to || !searchForm.value.departDate) {
    alert('Please fill in all search fields');
    return;
  }
  // In a real app, this would refetch data
  // For now, it just updates the local state
}

// Handle booking
function bookFlight(flight) {
  addToCart({
    ...flight,
    type: 'Flight',
  });
  alert(`Flight booked: ${flight.route}`);
  router.push('/cart');
}

// View flight details on separate page
function viewFlightDetails(flight) {
  const flightEncoded = encodeURIComponent(JSON.stringify(flight));
  router.push({ name: 'flight-detail', params: { flight: flightEncoded } });
}
</script>

<template>
  <main>
    <section class="flights-hero">
      <div class="hero-bubble bubble-1" aria-hidden="true"></div>
      <div class="hero-bubble bubble-2" aria-hidden="true"></div>

      <div class="flights-hero-inner">
        <h1>Find Your Flight</h1>
        <p>Compare prices from hundreds of airline worldwide</p>

        <form class="search-form" @submit.prevent="handleSearch">
          <div class="search-grid">
            <label>
              <span>From</span>
              <div class="input-wrap">
                <span class="material-icons">location_on</span>
                <input v-model="searchForm.from" placeholder="Departure City" />
              </div>
            </label>
            <label>
              <span>To</span>
              <div class="input-wrap">
                <span class="material-icons">location_on</span>
                <input v-model="searchForm.to" placeholder="Destination" />
              </div>
            </label>
            <label>
              <span>Depart</span>
              <div class="input-wrap">
                <span class="material-icons">calendar_month</span>
                <input v-model="searchForm.departDate" type="date" placeholder="Date" />
              </div>
            </label>
            <label>
              <span>Passengers</span>
              <div class="input-wrap">
                <span class="material-icons">group</span>
                <input v-model.number="searchForm.passengers" type="number" min="1" max="9" placeholder="1 Adult" />
              </div>
            </label>
            <button type="submit" class="search-btn">
              <span class="material-icons">search</span>
              Search
            </button>
          </div>
        </form>
      </div>
    </section>

    <section class="flights-content">
      <div class="flights-container">
        <aside class="filters">
          <h2>Filters</h2>
          <div class="filter-group">
            <h3>Price: ${{ filters.maxPrice }}</h3>
            <input type="range" v-model.number="filters.maxPrice" min="0" max="1000" step="50" />
          </div>
          <div class="filter-group">
            <h3>Stops</h3>
            <label>
              <input 
                type="checkbox" 
                :checked="filters.stops.includes('nonstop')"
                @change="toggleStopFilter('nonstop')"
              /> 
              Non-stop
            </label>
            <label>
              <input 
                type="checkbox" 
                :checked="filters.stops.includes('1stop')"
                @change="toggleStopFilter('1stop')"
              /> 
              1 Stop
            </label>
            <label>
              <input 
                type="checkbox" 
                :checked="filters.stops.includes('2plus')"
                @change="toggleStopFilter('2plus')"
              /> 
              2+ Stops
            </label>
          </div>
          <div class="filter-group">
            <h3>Airlines</h3>
            <label v-for="airline in availableAirlines" :key="airline">
              <input 
                type="checkbox" 
                :checked="filters.airlines.includes(airline)"
                @change="toggleAirlineFilter(airline)"
              /> 
              {{ airline }}
            </label>
          </div>
          <button class="clear-btn" type="button" @click="clearFilters">Clear all filters</button>
        </aside>

        <div class="results">
          <div v-if="filteredFlights.length === 0" class="no-results">
            <p>No flights found. Try adjusting your filters.</p>
          </div>
          <article v-for="deal in filteredFlights" :key="deal.route" class="deal-card" @click="viewFlightDetails(deal)" style="cursor: pointer;">
            <div class="deal-thumb">
              <span class="material-icons">{{ deal.icon }}</span>
            </div>

            <div class="deal-main">
              <div class="deal-top">
                <h3>{{ deal.route }}</h3>
                <span class="rating">
                  <span class="material-icons">star</span>
                  {{ deal.rating }}
                </span>
              </div>

              <p class="deal-details">{{ deal.details }}</p>

              <div class="deal-tags">
                <span v-for="tag in deal.tags" :key="tag">{{ tag }}</span>
              </div>

              <p class="direct">
                <span class="material-icons">verified</span>
                Direct booking available
              </p>

              <div class="deal-bottom">
                <strong>${{ deal.price }}</strong>
                <button type="button" @click.stop="bookFlight(deal)">Book Now</button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped src="./FlightsPage.css"></style>
