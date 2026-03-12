<template>
  <div class="hotels-page">
    <!-- Hero Section -->
    <div class="hotels-hero">
      <div class="hero-bubble bubble-1"></div>
      <div class="hero-bubble bubble-2"></div>
      
      <div class="hotels-hero-inner">
        <h1>Find Your Stay</h1>
        <p>Discover hotels, resorts, and unique accommodations worldwide</p>
        
        <form class="search-form" @submit.prevent="handleSearch">
          <div class="search-grid">
            <label>
              <span>Destination</span>
              <div class="input-wrap">
                <span class="material-icons">location_on</span>
                <input v-model="searchForm.destination" type="text" placeholder="City or hotel name" />
              </div>
            </label>
            
            <label>
              <span>Check-in</span>
              <div class="input-wrap">
                <span class="material-icons">calendar_today</span>
                <input v-model="searchForm.checkIn" type="date" placeholder="Add date" />
              </div>
            </label>
            
            <label>
              <span>Check-out</span>
              <div class="input-wrap">
                <span class="material-icons">calendar_today</span>
                <input v-model="searchForm.checkOut" type="date" placeholder="Add date" />
              </div>
            </label>
            
            <label>
              <span>Guests</span>
              <div class="input-wrap">
                <span class="material-icons">group</span>
                <input v-model.number="searchForm.guests" type="number" min="1" max="9" placeholder="1 Guest" />
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
    <div class="hotels-content">
      <div class="hotels-container">
        <!-- Filters Sidebar -->
        <div class="filters">
          <h2>Filters</h2>
          
          <div class="filter-group">
            <h3>Price: ${{ filters.maxPrice }}/night</h3>
            <input type="range" v-model.number="filters.maxPrice" min="0" max="500" step="20" />
            <div class="price-range">
            </div>
          </div>

          <div class="filter-group">
            <h3>Star Rating</h3>
            <div style="display: grid; gap: 0.6rem;">
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;">
                <input 
                  type="checkbox"
                  :checked="filters.stars.includes(5)"
                  @change="toggleStarFilter(5)"
                />
                <span>5 Stars</span>
              </label>
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;">
                <input 
                  type="checkbox"
                  :checked="filters.stars.includes(4)"
                  @change="toggleStarFilter(4)"
                />
                <span>4 Stars</span>
              </label>
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;">
                <input 
                  type="checkbox"
                  :checked="filters.stars.includes(3)"
                  @change="toggleStarFilter(3)"
                />
                <span>3 Stars</span>
              </label>
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;">
                <input 
                  type="checkbox"
                  :checked="filters.stars.includes(2)"
                  @change="toggleStarFilter(2)"
                />
                <span>2 Stars</span>
              </label>
            </div>
          </div>

          <div class="filter-group">
            <h3>Amenities</h3>
            <div style="display: grid; gap: 0.6rem;">
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;">
                <input 
                  type="checkbox"
                  :checked="filters.amenities.includes('Free WiFi')"
                  @change="toggleAmenityFilter('Free WiFi')"
                />
                <span>Free WiFi</span>
              </label>
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;">
                <input 
                  type="checkbox"
                  :checked="filters.amenities.includes('Gym')"
                  @change="toggleAmenityFilter('Gym')"
                />
                <span>Gym</span>
              </label>
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;">
                <input 
                  type="checkbox"
                  :checked="filters.amenities.includes('Restaurant')"
                  @change="toggleAmenityFilter('Restaurant')"
                />
                <span>Restaurant</span>
              </label>
              <label style="display: inline-flex; gap: 0.5rem; align-items: center;">
                <input 
                  type="checkbox"
                  :checked="filters.amenities.includes('Breakfast')"
                  @change="toggleAmenityFilter('Breakfast')"
                />
                <span>Breakfast</span>
              </label>
            </div>
          </div>

          <div class="filter-group">
            <h3>Property Type</h3>
            <div style="display: grid; gap: 0.6rem;">
              <label v-for="type in availablePropertyTypes" :key="type" style="display: inline-flex; gap: 0.5rem; align-items: center;">
                <input 
                  type="checkbox"
                  :checked="filters.propertyTypes.includes(type)"
                  @change="togglePropertyTypeFilter(type)"
                />
                <span>{{ type }}</span>
              </label>
            </div>
          </div>

          <button class="clear-btn" @click="clearFilters">Clear all filters</button>
        </div>

        <!-- Results -->
        <div class="results">
          <div v-if="filteredHotels.length === 0" class="no-results">
            <p>No hotels found. Try adjusting your filters.</p>
          </div>
          <div v-for="hotel in filteredHotels" :key="hotel.id" class="hotel-card" @click="viewHotelDetails(hotel)" style="cursor: pointer;">
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
                <strong>${{ hotel.price }}/night</strong>
                <button type="button" @click.stop="bookHotel(hotel)">Book Now</button>
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

const allHotels = [
  {
    id: 1,
    name: 'The Grand Palace Hotel',
    location: 'Paris, France',
    city: 'Paris',
    rating: 4.9,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Restaurant'],
    features: ['Free WiFi', 'Gym', 'Restaurant', 'Breakfast'],
    price: 320,
    type: 'Hotel',
  },
  {
    id: 2,
    name: 'Oceanfront Bali Villas',
    location: 'Bali, Indonesia',
    city: 'Bali',
    rating: 4.9,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Private Beach'],
    features: ['Free WiFi', 'Gym', 'Restaurant', 'Breakfast'],
    price: 280,
    type: 'Villa',
  },
  {
    id: 3,
    name: 'Manhattan Central Inn',
    location: 'New York, USA',
    city: 'New York',
    rating: 4.4,
    stars: 3,
    amenities: ['Free WiFi', 'Central Location'],
    features: ['Free WiFi', 'Gym', 'Restaurant', 'Breakfast'],
    price: 149,
    type: 'Hotel',
  },
  {
    id: 4,
    name: 'Lake Como Retreat',
    location: 'Como, Italy',
    city: 'Como',
    rating: 4.8,
    stars: 5,
    amenities: ['Spa', 'Restaurant', 'Lake View'],
    features: ['Free WiFi', 'Gym', 'Restaurant', 'Breakfast'],
    price: 450,
    type: 'Resort',
  },
  {
    id: 5,
    name: 'Dubai Marina Towers',
    location: 'Dubai, UAE',
    city: 'Dubai',
    rating: 4.6,
    stars: 4,
    amenities: ['Pool', 'Gym', 'Free WiFi'],
    features: ['Free WiFi', 'Gym', 'Restaurant', 'Breakfast'],
    price: 210,
    type: 'Hotel',
  },
];

// Form state
const searchForm = ref({
  destination: route.query.destination || '',
  checkIn: route.query.checkIn || '',
  checkOut: route.query.checkOut || '',
  guests: parseInt(route.query.guests) || 1,
});

// Filter state
const filters = ref({
  maxPrice: 500,
  stars: [],
  amenities: [],
  propertyTypes: [],
});

// Get available property types
const availablePropertyTypes = computed(() => {
  const types = new Set(allHotels.map(h => h.type));
  return Array.from(types).sort();
});

// Filter hotels based on criteria
const filteredHotels = computed(() => {
  return allHotels.filter(hotel => {
    // Price filter
    if (hotel.price > filters.value.maxPrice) return false;

    // Star rating filter
    if (filters.value.stars.length > 0) {
      if (!filters.value.stars.includes(hotel.stars)) return false;
    }

    // Amenities filter
    if (filters.value.amenities.length > 0) {
      const hasAmenities = filters.value.amenities.some(amenity =>
        hotel.features.includes(amenity)
      );
      if (!hasAmenities) return false;
    }

    // Property type filter
    if (filters.value.propertyTypes.length > 0) {
      if (!filters.value.propertyTypes.includes(hotel.type)) return false;
    }

    return true;
  });
});

// Filter toggle functions
function toggleStarFilter(stars) {
  const index = filters.value.stars.indexOf(stars);
  if (index > -1) {
    filters.value.stars.splice(index, 1);
  } else {
    filters.value.stars.push(stars);
  }
}

function toggleAmenityFilter(amenity) {
  const index = filters.value.amenities.indexOf(amenity);
  if (index > -1) {
    filters.value.amenities.splice(index, 1);
  } else {
    filters.value.amenities.push(amenity);
  }
}

function togglePropertyTypeFilter(type) {
  const index = filters.value.propertyTypes.indexOf(type);
  if (index > -1) {
    filters.value.propertyTypes.splice(index, 1);
  } else {
    filters.value.propertyTypes.push(type);
  }
}

function clearFilters() {
  filters.value = {
    maxPrice: 500,
    stars: [],
    amenities: [],
    propertyTypes: [],
  };
}

function handleSearch() {
  if (!searchForm.value.destination || !searchForm.value.checkIn || !searchForm.value.checkOut) {
    alert('Please fill in all search fields');
    return;
  }
}

function bookHotel(hotel) {
  addToCart({ ...hotel, type: 'Hotel' });
  alert(`Hotel booked: ${hotel.name}`);
  router.push('/cart');
}

// View hotel details on separate page
function viewHotelDetails(hotel) {
  const hotelEncoded = encodeURIComponent(JSON.stringify(hotel));
  router.push({ name: 'hotel-detail', params: { hotel: hotelEncoded } });
}

const getAmenityIcon = (amenity) => {
  const icons = {
    'Free WiFi': 'wifi',
    'Gym': 'fitness_center',
    'Restaurant': 'restaurant',
    'Breakfast': 'dining',
  };
  return icons[amenity] || 'check_circle';
};
</script>

<style scoped src="./HotelsPage.css"></style>
