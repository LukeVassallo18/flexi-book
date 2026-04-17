<template>
  <div class="hotels-page">
    <div class="hotels-hero">
      <div class="hero-bubble bubble-1"></div>
      <div class="hero-bubble bubble-2"></div>

      <div class="hotels-hero-inner">
        <h1>Find Your Stay</h1>
        <p>Discover hotels, resorts, and unique accommodations worldwide</p>

        <SearchFormCard @submit="handleSearch">
          <SearchFormField
            v-model="searchForm.destination"
            label="Destination"
            icon="location_on"
            list="hotel-search-list"
            placeholder="Choose country or hotel"
          />

          <SearchFormField
            v-model="searchForm.checkIn"
            label="Check-in"
            icon="calendar_today"
            type="date"
            placeholder="Add date"
          />

          <SearchFormField
            v-model="searchForm.checkOut"
            label="Check-out"
            icon="calendar_today"
            type="date"
            placeholder="Add date"
          />

          <SearchFormField
            v-model="searchForm.guests"
            label="Guests"
            icon="group"
            type="number"
            :min="1"
            :max="9"
            placeholder="1 Guest"
          />
        </SearchFormCard>

        <datalist id="hotel-search-list">
          <option v-for="country in availableCountries" :key="`hotels-${country}`" :value="country" />
          <option v-for="hotel in hotelDirectory" :key="`hotel-${hotel.id}`" :value="hotel.name" :label="`${hotel.city}, ${hotel.country}`" />
        </datalist>
      </div>
    </div>

    <div class="hotels-content">
      <div class="hotels-container">
        <div class="filters">
          <h2>Filters</h2>

          <div class="filter-group">
            <h3>Price: ${{ filters.maxPrice }}/night</h3>
            <input type="range" v-model.number="filters.maxPrice" min="0" max="500" step="20" />
            <div class="price-range"></div>
          </div>

          <div class="filter-group">
            <h3>Star Rating</h3>
            <div style="display: grid; gap: 0.6rem;">
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;"><input type="checkbox" :checked="filters.stars.includes(5)" @change="toggleStarFilter(5)" /><span>5 Stars</span></label>
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;"><input type="checkbox" :checked="filters.stars.includes(4)" @change="toggleStarFilter(4)" /><span>4 Stars</span></label>
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;"><input type="checkbox" :checked="filters.stars.includes(3)" @change="toggleStarFilter(3)" /><span>3 Stars</span></label>
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;"><input type="checkbox" :checked="filters.stars.includes(2)" @change="toggleStarFilter(2)" /><span>2 Stars</span></label>
            </div>
          </div>

          <div class="filter-group" v-if="showAdvancedFilters">
            <h3>Amenities</h3>
            <div style="display: grid; gap: 0.6rem;">
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;"><input type="checkbox" :checked="filters.amenities.includes('Free WiFi')" @change="toggleAmenityFilter('Free WiFi')" /><span>Free WiFi</span></label>
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;"><input type="checkbox" :checked="filters.amenities.includes('Gym')" @change="toggleAmenityFilter('Gym')" /><span>Gym</span></label>
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;"><input type="checkbox" :checked="filters.amenities.includes('Restaurant')" @change="toggleAmenityFilter('Restaurant')" /><span>Restaurant</span></label>
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;"><input type="checkbox" :checked="filters.amenities.includes('Breakfast')" @change="toggleAmenityFilter('Breakfast')" /><span>Breakfast</span></label>
            </div>
          </div>

          <div class="filter-group" v-if="showAdvancedFilters">
            <h3>Property Type</h3>
            <div style="display: grid; gap: 0.6rem;">
              <label v-for="type in availablePropertyTypes" :key="type" style="display: inline-flex; gap: 0.5rem; align-items: center;">
                <input type="checkbox" :checked="filters.propertyTypes.includes(type)" @change="togglePropertyTypeFilter(type)" />
                <span>{{ type }}</span>
              </label>
            </div>
          </div>

          <button class="toggle-filters-btn" type="button" @click="showAdvancedFilters = !showAdvancedFilters">
            {{ showAdvancedFilters ? 'Show fewer filters' : 'Show more filters' }}
          </button>

          <button class="clear-btn" @click="clearFilters">Clear all filters</button>
        </div>

        <div class="results">
          <PaginatedResults :items="filteredHotels" :page-size="12" item-label="hotels">
            <template #default="{ items }">
              <div v-for="hotel in items" :key="hotel.id" class="hotel-card" @click="viewHotelDetails(hotel)" style="cursor: pointer;">
                <div class="hotel-thumb">
                  <span class="material-icons">hotel</span>
                </div>
                <div class="hotel-main">
                  <div class="hotel-top">
                    <h3>{{ hotel.name }}</h3>
                    <div class="rating">
                      <span class="material-icons">star</span>
                      {{ hotel.rating }}
                    </div>
                  </div>
                  <div class="hotel-details">{{ hotel.location }}</div>
                  <div class="hotel-tags">
                    <span v-for="tag in hotel.amenities" :key="tag">{{ tag }}</span>
                  </div>
                  <div class="hotel-amenities">
                    <div class="amenity" v-for="amenity in hotel.features" :key="amenity">
                      <span class="material-icons">{{ getAmenityIcon(amenity) }}</span>
                      <span>{{ amenity }}</span>
                    </div>
                  </div>
                  <div class="hotel-bottom">
                    <div>
                      <strong>${{ hotel.pricePerPerson }}/person/night</strong>
                      <div style="font-size: 0.8rem; opacity: 0.85; margin-top: 0.2rem;">
                        Total ${{ hotel.totalPrice }} for {{ hotel.stayNights }} night{{ hotel.stayNights > 1 ? 's' : '' }}
                      </div>
                    </div>
                    <button type="button" @click.stop="bookHotel(hotel)">Book Now</button>
                  </div>
                </div>
              </div>
            </template>

            <template #empty>
              <div class="no-results">
                <p>No hotels found. Try adjusting your filters.</p>
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
import SearchFormCard from '../components/Search/SearchFormCard.vue';
import SearchFormField from '../components/Search/SearchFormField.vue';
import countriesData from '../data/countries.json';
import hotelDirectoryData from '../data/hotelDirectory.json';
import hotelsData from '../data/hotels.json';
import { useCart } from '../services/cartStore';
import { useToast } from '../services/toastStore';

const route = useRoute();
const router = useRouter();
const { addToCart } = useCart();
const { pushToast } = useToast();

const availableCountries = [...countriesData].sort((a, b) => a.localeCompare(b));
const hotelDirectory = [...hotelDirectoryData].sort((a, b) => a.name.localeCompare(b.name));

function normalizeCountry(value) {
  return (value || '')
    .toLowerCase()
    .replace('united states', 'usa')
    .replace('united arab emirates', 'uae')
    .trim();
}

const generatedHotels = hotelDirectory.map((hotel, index) => {
  const propertyTypes = ['Hotel', 'Resort', 'Boutique Hotel', 'Luxury Hotel', 'Apart Hotel'];
  const amenitySets = [
    ['Pool', 'Spa', 'Restaurant'],
    ['City View', 'Bar', 'Restaurant'],
    ['Garden', 'Lounge', 'Cafe'],
    ['Beach Access', 'Pool', 'Gym'],
    ['Mountain View', 'Spa', 'Restaurant'],
  ];
  const featureSets = [
    ['Free WiFi', 'AC', 'Restaurant', 'Breakfast'],
    ['Free WiFi', 'AC', 'Balcony', 'Breakfast'],
    ['Free WiFi', 'AC', 'Fridge', 'Breakfast'],
    ['Free WiFi', 'AC', 'Balcony', 'Fridge'],
    ['Free WiFi', 'AC', 'Room Service', 'Breakfast'],
  ];

  return {
    id: 1000 + index,
    name: hotel.name,
    location: `${hotel.city}, ${hotel.country}`,
    city: hotel.city,
    country: hotel.country,
    rating: Number((4.2 + (index % 8) * 0.1).toFixed(1)),
    stars: 3 + (index % 3),
    amenities: amenitySets[index % amenitySets.length],
    features: featureSets[index % featureSets.length],
    price: 90 + (index % 10) * 18,
    type: propertyTypes[index % propertyTypes.length],
    availableFrom: '2026-01-01',
    availableTo: '2027-12-31',
  };
});

const allHotels = [...hotelsData, ...generatedHotels];

const searchForm = ref({
  destination: route.query.destination || '',
  checkIn: route.query.checkIn || '',
  checkOut: route.query.checkOut || '',
  guests: parseInt(route.query.guests) || 1,
});

const activeSearch = ref({
  destination: searchForm.value.destination,
  checkIn: searchForm.value.checkIn,
  checkOut: searchForm.value.checkOut,
  guests: searchForm.value.guests,
});

const filters = ref({
  maxPrice: 500,
  stars: [],
  amenities: [],
  propertyTypes: [],
});

const showAdvancedFilters = ref(false);

const availablePropertyTypes = computed(() => {
  const types = new Set(allHotels.map((h) => h.type));
  return Array.from(types).sort();
});

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getStayNights(checkInValue, checkOutValue) {
  if (!checkInValue || !checkOutValue) return 1;
  const checkInDate = new Date(`${checkInValue}T00:00:00`);
  const checkOutDate = new Date(`${checkOutValue}T00:00:00`);
  const diffMs = checkOutDate.getTime() - checkInDate.getTime();
  const nights = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return Number.isFinite(nights) && nights > 0 ? nights : 1;
}

function getHotelDateDemandFactor(checkInValue) {
  if (!checkInValue) return 1;
  const date = new Date(`${checkInValue}T00:00:00`);
  if (Number.isNaN(date.getTime())) return 1;
  return [0.95, 0.94, 0.98, 1, 1.04, 1.1, 1.13, 1.11, 1.05, 1.01, 0.99, 1.03][date.getMonth()];
}

function calculateHotelPricing(hotel) {
  const guests = Math.max(1, Number(activeSearch.value.guests) || 1);
  const stayNights = getStayNights(activeSearch.value.checkIn, activeSearch.value.checkOut);
  const checkIn = activeSearch.value.checkIn || hotel.availableFrom || '2026-06-15';
  const destination = normalizeCountry(activeSearch.value.destination || hotel.city || hotel.location);

  const baseNightly = Number(hotel.basePrice ?? hotel.price);
  const hotelSeed = hashString(`${hotel.id}|${hotel.name}|${normalizeCountry(hotel.city)}|${hotel.stars}`);
  const searchSeed = hashString(`${destination}|${checkIn}|${guests}|${stayNights}|${hotel.id}`);

  const propertyFactor = 0.95 + (hotelSeed % 14) / 100;
  const searchFactor = 0.96 + (searchSeed % 12) / 100;
  const dateFactor = getHotelDateDemandFactor(checkIn);

  const perPersonPerNight = Math.max(25, Math.round(baseNightly * propertyFactor * searchFactor * dateFactor));
  const totalPrice = Math.max(60, Math.round(perPersonPerNight * guests * stayNights));

  return { perPersonPerNight, totalPrice, stayNights };
}

function createFallbackHotels() {
  const destination = activeSearch.value.destination?.trim() || 'Global';
  const checkIn = activeSearch.value.checkIn || '2026-06-15';
  const checkOut = activeSearch.value.checkOut || '2026-06-20';

  return [
    {
      id: 9901,
      name: `${destination} Grand Hotel`,
      location: `${destination} City, ${destination}`,
      city: `${destination} City`,
      rating: 4.6,
      stars: 5,
      amenities: ['Pool', 'Spa', 'Restaurant'],
      features: ['Free WiFi', 'AC', 'Balcony', 'Breakfast'],
      price: 220,
      type: 'Hotel',
      availableFrom: checkIn,
      availableTo: checkOut,
    },
    {
      id: 9902,
      name: `${destination} Central Suites`,
      location: `${destination} City, ${destination}`,
      city: `${destination} City`,
      rating: 4.4,
      stars: 4,
      amenities: ['City View', 'Restaurant'],
      features: ['Free WiFi', 'AC', 'Fridge', 'Breakfast'],
      price: 170,
      type: 'Apartment',
      availableFrom: checkIn,
      availableTo: checkOut,
    },
    {
      id: 9903,
      name: `${destination} Budget Inn`,
      location: `${destination} City, ${destination}`,
      city: `${destination} City`,
      rating: 4.2,
      stars: 3,
      amenities: ['Lounge', 'Cafe'],
      features: ['Free WiFi', 'AC', 'Room Service'],
      price: 120,
      type: 'Boutique Hotel',
      availableFrom: checkIn,
      availableTo: checkOut,
    },
  ];
}

const filteredHotels = computed(() => {
  const matchesSearch = (hotel) => {
    const destinationValue = activeSearch.value.destination.trim().toLowerCase();
    const checkInValue = activeSearch.value.checkIn;
    const checkOutValue = activeSearch.value.checkOut;

    const destinationText = `${hotel.name} ${hotel.city} ${hotel.location}`.toLowerCase();
    const normalizedDestination = normalizeCountry(destinationValue);
    const normalizedLocation = normalizeCountry(hotel.location);
    if (destinationValue && !destinationText.includes(destinationValue) && !normalizedLocation.includes(normalizedDestination)) return false;
    if (checkInValue && checkInValue < hotel.availableFrom) return false;
    if (checkOutValue && checkOutValue > hotel.availableTo) return false;
    return true;
  };

  const matchesFilters = (hotel) => {
    if (hotel.price > filters.value.maxPrice) return false;
    if (filters.value.stars.length > 0 && !filters.value.stars.includes(hotel.stars)) return false;
    if (filters.value.amenities.length > 0) {
      const hasAmenities = filters.value.amenities.some((amenity) => hotel.features.includes(amenity));
      if (!hasAmenities) return false;
    }
    if (filters.value.propertyTypes.length > 0 && !filters.value.propertyTypes.includes(hotel.type)) return false;
    return true;
  };

  const searchMatches = allHotels.filter(matchesSearch);
  const hasDestination = Boolean(activeSearch.value.destination.trim());
  const sourceHotels = searchMatches.length > 0 || !hasDestination ? searchMatches : createFallbackHotels();

  const pricedHotels = sourceHotels.map((hotel) => {
    const pricing = calculateHotelPricing(hotel);
    return {
      ...hotel,
      price: pricing.perPersonPerNight,
      pricePerPerson: pricing.perPersonPerNight,
      totalPrice: pricing.totalPrice,
      stayNights: pricing.stayNights,
    };
  });

  return pricedHotels.filter(matchesFilters);
});

function toggleStarFilter(stars) {
  const index = filters.value.stars.indexOf(stars);
  if (index > -1) filters.value.stars.splice(index, 1);
  else filters.value.stars.push(stars);
}

function toggleAmenityFilter(amenity) {
  const index = filters.value.amenities.indexOf(amenity);
  if (index > -1) filters.value.amenities.splice(index, 1);
  else filters.value.amenities.push(amenity);
}

function togglePropertyTypeFilter(type) {
  const index = filters.value.propertyTypes.indexOf(type);
  if (index > -1) filters.value.propertyTypes.splice(index, 1);
  else filters.value.propertyTypes.push(type);
}

function clearFilters() {
  filters.value = {
    maxPrice: 500,
    stars: [],
    amenities: [],
    propertyTypes: [],
  };
}

function hasAtLeastOneSearchField() {
  return Boolean(searchForm.value.destination.trim() || searchForm.value.checkIn || searchForm.value.checkOut);
}

function handleSearch() {
  if (!hasAtLeastOneSearchField()) {
    alert('Please fill in at least one search field');
    return;
  }

  activeSearch.value = {
    destination: searchForm.value.destination,
    checkIn: searchForm.value.checkIn,
    checkOut: searchForm.value.checkOut,
    guests: searchForm.value.guests,
  };

  router.replace({
    path: '/hotels',
    query: {
      ...(searchForm.value.destination && { destination: searchForm.value.destination }),
      ...(searchForm.value.checkIn && { checkIn: searchForm.value.checkIn }),
      ...(searchForm.value.checkOut && { checkOut: searchForm.value.checkOut }),
      guests: String(searchForm.value.guests),
    },
  });
}

function bookHotel(hotel) {
  addToCart({ ...hotel, type: 'Hotel' });
  pushToast(`Added to cart: ${hotel.name}`, { type: 'success' });
  router.push('/cart');
}

function viewHotelDetails(hotel) {
  const hotelEncoded = encodeURIComponent(JSON.stringify(hotel));
  router.push({ name: 'hotel-detail', params: { hotel: hotelEncoded } });
}

const getAmenityIcon = (amenity) => {
  const icons = {
    'Free WiFi': 'wifi',
    Gym: 'fitness_center',
    Restaurant: 'restaurant',
    Breakfast: 'dining',
  };
  return icons[amenity] || 'check_circle';
};
</script>

<style scoped src="./HotelsPage.css"></style>
