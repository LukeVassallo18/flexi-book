<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PaginatedResults from '../components/Cards/PaginatedResults.vue';
import countriesData from '../data/countries.json';
import flightsData from '../data/flights.json';
import { useCart } from '../services/cartStore';

const route = useRoute();
const router = useRouter();
const { addToCart } = useCart();
const availableCountries = [...countriesData].sort((a, b) => a.localeCompare(b));

function normalizeCountry(value) {
  return (value || '')
    .toLowerCase()
    .replace('united states', 'usa')
    .replace('united arab emirates', 'uae')
    .trim();
}

const generatedFlights = availableCountries.map((country, index) => {
  const nextCountry = availableCountries[(index + 7) % availableCountries.length];
  const airlines = [
    'SkyBridge Air',
    'Global Wings',
    'Blue Horizon Airlines',
    'Continental Express',
    'AeroWorld',
    'TransAtlas',
  ];
  const stopsByIndex = [0, 1, 1, 0, 2, 1];
  const cabinByIndex = ['Economy', 'Premium Economy', 'Business', 'Economy', 'Business', 'Premium'];

  return {
    id: 5000 + index,
    route: `${country} → ${nextCountry}`,
    details: `${airlines[index % airlines.length]} • ${stopsByIndex[index % stopsByIndex.length] === 0 ? 'Non-stop' : `${stopsByIndex[index % stopsByIndex.length]} Stop`} • ${3 + (index % 15)}h ${10 + (index % 5) * 10}m`,
    tags: [cabinByIndex[index % cabinByIndex.length], stopsByIndex[index % stopsByIndex.length] === 0 ? 'Non-stop' : `${stopsByIndex[index % stopsByIndex.length]} Stop`],
    rating: Number((4.2 + (index % 7) * 0.1).toFixed(1)).toString(),
    price: 95 + (index % 20) * 35,
    icon: index % 2 === 0 ? 'flight_takeoff' : 'travel_explore',
    airline: airlines[index % airlines.length],
    stops: stopsByIndex[index % stopsByIndex.length],
    from: country,
    to: nextCountry,
    departDate: `2026-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 27) + 1).padStart(2, '0')}`,
  };
});

const allFlights = [...flightsData, ...generatedFlights];

// Form state
const searchForm = ref({
  from: route.query.from || '',
  to: route.query.to || '',
  departDate: route.query.departDate || '',
  passengers: parseInt(route.query.travelers) || 1,
});

const activeSearch = ref({
  from: searchForm.value.from,
  to: searchForm.value.to,
  departDate: searchForm.value.departDate,
  passengers: searchForm.value.passengers,
});

// Filter state
const filters = ref({
  maxPrice: 1000,
  stops: [],
  airlines: [],
});

const showAdvancedFilters = ref(false);

// Get unique airlines for filter options
const availableAirlines = computed(() => {
  const airlines = new Set(allFlights.map(f => f.airline));
  return Array.from(airlines).sort();
});

const appliedFilterChips = computed(() => {
  const chips = [];
  if (filters.value.maxPrice < 1000) {
    chips.push({ type: 'price', value: filters.value.maxPrice, label: `Max $${filters.value.maxPrice}` });
  }

  filters.value.stops.forEach((stop) => {
    const stopLabel = stop === 'nonstop' ? 'Non-stop' : stop === '1stop' ? '1 Stop' : '2+ Stops';
    chips.push({ type: 'stop', value: stop, label: stopLabel });
  });

  filters.value.airlines.forEach((airline) => {
    chips.push({ type: 'airline', value: airline, label: airline });
  });

  return chips;
});

function createFallbackFlights() {
  const from = activeSearch.value.from?.trim() || 'Anywhere';
  const to = activeSearch.value.to?.trim() || 'Anywhere';
  const departDate = activeSearch.value.departDate || '2026-06-15';

  return [
    {
      id: 9001,
      route: `${from} → ${to}`,
      details: `Global Wings • Non-stop • 6h 20m`,
      tags: ['Economy', 'Non-stop'],
      rating: '4.6',
      price: 299,
      icon: 'flight_takeoff',
      airline: 'Global Wings',
      stops: 0,
      from,
      to,
      departDate,
    },
    {
      id: 9002,
      route: `${from} → ${to}`,
      details: `SkyBridge Air • 1 Stop • 9h 15m`,
      tags: ['Premium Economy', '1 Stop'],
      rating: '4.5',
      price: 249,
      icon: 'travel_explore',
      airline: 'SkyBridge Air',
      stops: 1,
      from,
      to,
      departDate,
    },
    {
      id: 9003,
      route: `${from} → ${to}`,
      details: `AeroWorld • 2 Stops • 12h 40m`,
      tags: ['Economy', '2 Stops'],
      rating: '4.3',
      price: 199,
      icon: 'public',
      airline: 'AeroWorld',
      stops: 2,
      from,
      to,
      departDate,
    },
  ];
}

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getDateDemandFactor(dateValue) {
  if (!dateValue) return 1;
  const date = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(date.getTime())) return 1;

  const day = date.getDay();
  const weekendFactor = day === 5 || day === 6 ? 1.08 : 1;
  const monthFactor = [0.97, 0.95, 0.98, 1, 1.03, 1.08, 1.12, 1.1, 1.04, 1.01, 0.99, 1.02][date.getMonth()];
  return weekendFactor * monthFactor;
}

function calculateFlightPrice(flight) {
  const passengers = Math.max(1, Number(activeSearch.value.passengers) || 1);
  const from = normalizeCountry(activeSearch.value.from || flight.from);
  const to = normalizeCountry(activeSearch.value.to || flight.to);
  const departDate = activeSearch.value.departDate || flight.departDate || '2026-06-15';

  const basePrice = Number(flight.basePrice ?? flight.price);
  const routeSeed = hashString(`${normalizeCountry(flight.from)}|${normalizeCountry(flight.to)}|${flight.airline}|${flight.id || flight.route}`);
  const searchSeed = hashString(`${from}|${to}|${departDate}|${passengers}|${flight.id || flight.route}`);

  const routeFactor = 0.94 + (routeSeed % 18) / 100;
  const searchFactor = 0.95 + (searchSeed % 14) / 100;
  const dateFactor = getDateDemandFactor(departDate);

  const perPassenger = basePrice * routeFactor * searchFactor * dateFactor;
  const totalPrice = Math.round(perPassenger * passengers);

  return Math.max(60, totalPrice);
}

// Filter flights based on selected criteria
const filteredFlights = computed(() => {
  const matchesSearch = (flight) => {
    const fromValue = activeSearch.value.from.trim().toLowerCase();
    const toValue = activeSearch.value.to.trim().toLowerCase();
    const departDateValue = activeSearch.value.departDate;

    const normalizedFrom = normalizeCountry(flight.from);
    const normalizedSearchFrom = normalizeCountry(fromValue);
    if (fromValue && !flight.from.toLowerCase().includes(fromValue) && !normalizedFrom.includes(normalizedSearchFrom)) return false;

    const normalizedTo = normalizeCountry(flight.to);
    const normalizedSearchTo = normalizeCountry(toValue);
    if (toValue && !flight.to.toLowerCase().includes(toValue) && !normalizedTo.includes(normalizedSearchTo)) return false;

    if (departDateValue && flight.departDate !== departDateValue) return false;

    return true;
  };

  const matchesFilters = (flight) => {

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
  };

  const searchMatches = allFlights.filter(matchesSearch);
  const hasAnySearchField = Boolean(
    activeSearch.value.from.trim() || activeSearch.value.to.trim() || activeSearch.value.departDate
  );
  const sourceFlights = searchMatches.length > 0 || !hasAnySearchField
    ? searchMatches
    : createFallbackFlights();

  const pricedFlights = sourceFlights.map((flight) => ({
    ...flight,
    price: calculateFlightPrice(flight),
  }));

  return pricedFlights.filter(matchesFilters);
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

function removeAppliedFilter(chip) {
  if (chip.type === 'price') {
    filters.value.maxPrice = 1000;
    return;
  }
  if (chip.type === 'stop') {
    filters.value.stops = filters.value.stops.filter((stop) => stop !== chip.value);
    return;
  }
  if (chip.type === 'airline') {
    filters.value.airlines = filters.value.airlines.filter((airline) => airline !== chip.value);
  }
}

function hasAtLeastOneSearchField() {
  return Boolean(
    searchForm.value.from.trim() || searchForm.value.to.trim() || searchForm.value.departDate
  );
}

// Handle new search
function handleSearch() {
  if (!hasAtLeastOneSearchField()) {
    alert('Please fill in at least one search field');
    return;
  }

  activeSearch.value = {
    from: searchForm.value.from,
    to: searchForm.value.to,
    departDate: searchForm.value.departDate,
    passengers: searchForm.value.passengers,
  };

  router.replace({
    path: '/flights',
    query: {
      ...(searchForm.value.from && { from: searchForm.value.from }),
      ...(searchForm.value.to && { to: searchForm.value.to }),
      ...(searchForm.value.departDate && { departDate: searchForm.value.departDate }),
      travelers: String(searchForm.value.passengers),
    },
  });
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
                <input v-model="searchForm.from" list="countries-list-flights" placeholder="Departure Country" />
              </div>
            </label>
            <label>
              <span>To</span>
              <div class="input-wrap">
                <span class="material-icons">location_on</span>
                <input v-model="searchForm.to" list="countries-list-flights" placeholder="Destination Country" />
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

        <datalist id="countries-list-flights">
          <option v-for="country in availableCountries" :key="`flights-${country}`" :value="country" />
        </datalist>
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
            <label class="filter-option">
              <input
                type="checkbox"
                :checked="filters.stops.includes('nonstop')"
                @change="toggleStopFilter('nonstop')"
              />
              <span>Non-stop</span>
            </label>

            <label class="filter-option">
              <input
                type="checkbox"
                :checked="filters.stops.includes('1stop')"
                @change="toggleStopFilter('1stop')"
              />
              <span>1 Stop</span>
            </label>

            <label class="filter-option">
              <input
                type="checkbox"
                :checked="filters.stops.includes('2plus')"
                @change="toggleStopFilter('2plus')"
              />
              <span>2+ Stops</span>
            </label>
          </div>

          <div class="filter-group" v-if="showAdvancedFilters">
            <h3>Airlines</h3>
            <label v-for="airline in availableAirlines" :key="airline" class="filter-option">
              <input 
                type="checkbox" 
                :checked="filters.airlines.includes(airline)"
                @change="toggleAirlineFilter(airline)"
              />
              <span>{{ airline }}</span>
            </label>
          </div>

          <button class="toggle-filters-btn" type="button" @click="showAdvancedFilters = !showAdvancedFilters">
            {{ showAdvancedFilters ? 'Show fewer filters' : 'Show more filters' }}
          </button>

          <button class="clear-btn" type="button" @click="clearFilters">Clear all filters</button>
        </aside>

        <div class="results">
          <div class="applied-filters" v-if="appliedFilterChips.length">
            <p>Applied filters:</p>
            <div class="chips-wrap">
              <button
                v-for="chip in appliedFilterChips"
                :key="`${chip.type}-${chip.value}`"
                type="button"
                class="filter-chip"
                @click="removeAppliedFilter(chip)"
              >
                {{ chip.label }} <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>

          <PaginatedResults :items="filteredFlights" :page-size="12" item-label="flights">
            <template #default="{ items }">
              <article v-for="deal in items" :key="deal.id || deal.route" class="deal-card" @click="viewFlightDetails(deal)" style="cursor: pointer;">
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
            </template>

            <template #empty>
              <div class="no-results">
                <p>No flights found. Try adjusting your filters.</p>
              </div>
            </template>
          </PaginatedResults>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped src="./FlightsPage.css"></style>
