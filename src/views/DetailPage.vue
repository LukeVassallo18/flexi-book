<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import countriesData from '../data/countries.json';
import { useCart } from '../services/cartStore';
import { useToast } from '../services/toastStore';

const route = useRoute();
const router = useRouter();
const { addToCart } = useCart();
const { pushToast } = useToast();

const userLocation = ref({
  country: 'Your location',
  city: 'Nearby city',
});

const selectedFromLocation = ref('Your location');
const fromLocationOptions = computed(() => {
  const primary = selectedFromLocation.value || userLocation.value.country || 'Your location';
  return [primary, ...countriesData.filter((country) => country !== primary)];
});

const COUNTRY_CODE_TO_NAME = {
  AU: 'Australia',
  BR: 'Brazil',
  CA: 'Canada',
  CH: 'Switzerland',
  CN: 'China',
  DE: 'Germany',
  ES: 'Spain',
  FR: 'France',
  GB: 'United Kingdom',
  HK: 'Hong Kong',
  ID: 'Indonesia',
  IE: 'Ireland',
  IN: 'India',
  IT: 'Italy',
  JP: 'Japan',
  KR: 'South Korea',
  MX: 'Mexico',
  MY: 'Malaysia',
  NL: 'Netherlands',
  NZ: 'New Zealand',
  PH: 'Philippines',
  PT: 'Portugal',
  SA: 'Saudi Arabia',
  SE: 'Sweden',
  SG: 'Singapore',
  TH: 'Thailand',
  TR: 'Turkey',
  TW: 'Taiwan',
  UAE: 'United Arab Emirates',
  US: 'USA',
  ZA: 'South Africa',
};

const TIMEZONE_TO_COUNTRY = {
  'Europe/London': 'United Kingdom',
  'Europe/Paris': 'France',
  'Europe/Berlin': 'Germany',
  'Europe/Madrid': 'Spain',
  'Europe/Rome': 'Italy',
  'Europe/Amsterdam': 'Netherlands',
  'Europe/Zurich': 'Switzerland',
  'Asia/Tokyo': 'Japan',
  'Asia/Seoul': 'South Korea',
  'Asia/Singapore': 'Singapore',
  'Asia/Bangkok': 'Thailand',
  'Asia/Jakarta': 'Indonesia',
  'Asia/Kuala_Lumpur': 'Malaysia',
  'Asia/Manila': 'Philippines',
  'Asia/Dubai': 'United Arab Emirates',
  'Asia/Shanghai': 'China',
  'Asia/Hong_Kong': 'Hong Kong',
  'Asia/Kolkata': 'India',
  'America/New_York': 'USA',
  'America/Chicago': 'USA',
  'America/Denver': 'USA',
  'America/Los_Angeles': 'USA',
  'America/Toronto': 'Canada',
  'America/Vancouver': 'Canada',
  'America/Mexico_City': 'Mexico',
  'America/Sao_Paulo': 'Brazil',
  'Australia/Sydney': 'Australia',
  'Australia/Melbourne': 'Australia',
  'Pacific/Auckland': 'New Zealand',
};

function resolveCountryFromLocale() {
  const locales = [
    ...(Array.isArray(navigator.languages) ? navigator.languages : []),
    navigator.language,
  ].filter(Boolean);

  for (const locale of locales) {
    const parts = locale.split('-');
    const regionCode = parts.length > 1 ? parts[parts.length - 1].toUpperCase() : '';
    if (COUNTRY_CODE_TO_NAME[regionCode]) return COUNTRY_CODE_TO_NAME[regionCode];
  }

  return null;
}

function resolveCountryFromTimezone() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return TIMEZONE_TO_COUNTRY[timezone] || null;
}

function inferUserLocation() {
  const country = resolveCountryFromLocale() || resolveCountryFromTimezone() || 'Your location';
  userLocation.value = {
    country,
    city: country,
  };
  selectedFromLocation.value = country;
}

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getRecommendedDate(offsetDays) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split('T')[0];
}

const destinationFlightRecommendations = computed(() => {
  if (detailType.value !== 'destination' || !detailItem.value) return [];

  const fromCountry = selectedFromLocation.value || userLocation.value.country || 'Your location';
  const toCountry = detailItem.value.country || detailItem.value.city;
  const toCity = detailItem.value.city || detailItem.value.country;
  const airlines = ['SkyBridge Air', 'Global Wings', 'AeroWorld'];
  const cabins = ['Economy', 'Premium Economy', 'Business'];

  return airlines.map((airline, index) => {
    const seed = hashString(`${fromCountry}|${toCountry}|${airline}|${index}`);
    const stops = [0, 1, 0][index];
    const durationHours = 5 + (seed % 8);
    const durationMinutes = [10, 20, 35, 45][seed % 4];
    const price = 180 + (seed % 10) * 35;

    return {
      id: `dest-flight-${index}`,
      airline,
      route: `${fromCountry} → ${toCity}`,
      details: `${airline} • ${stops === 0 ? 'Non-stop' : '1 Stop'} • ${durationHours}h ${durationMinutes}m`,
      tags: [cabins[index], stops === 0 ? 'Non-stop' : '1 Stop'],
      rating: (4.5 + index * 0.1).toFixed(1),
      price,
      stops,
      from: fromCountry,
      to: toCountry,
      departDate: getRecommendedDate(7 + index * 3),
      icon: 'flight_takeoff',
    };
  });
});

function goToRecommendedFlights() {
  const destination = detailItem.value?.country || detailItem.value?.city || '';
  router.push({
    path: '/flights',
    query: {
      from: selectedFromLocation.value || userLocation.value.country,
      to: destination,
      departDate: getRecommendedDate(7),
      travelers: '1',
    },
  });
}

onMounted(() => {
  inferUserLocation();
});

function decodePayload(value) {
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return null;
  }
}

const detailType = computed(() => {
  if (route.params.type) return String(route.params.type);
  if (route.params.flight) return 'flight';
  if (route.params.hotel) return 'hotel';
  if (route.params.car) return 'car';
  if (route.params.destination) return 'destination';
  return 'unknown';
});

const detailItem = computed(() => {
  if (route.params.item) return decodePayload(route.params.item);
  if (route.params.flight) return decodePayload(route.params.flight);
  if (route.params.hotel) return decodePayload(route.params.hotel);
  if (route.params.car) return decodePayload(route.params.car);
  if (route.params.destination) return decodePayload(route.params.destination);
  return null;
});

const pageTitle = computed(() => {
  if (detailType.value === 'flight') return 'Flight Details';
  if (detailType.value === 'hotel') return 'Hotel Details';
  if (detailType.value === 'car') return 'Car Details';
  if (detailType.value === 'destination') return 'Destination Details';
  return 'Details';
});

const heroIcon = computed(() => {
  if (!detailItem.value) return 'info';
  if (detailType.value === 'flight') return detailItem.value.icon || 'flight_takeoff';
  if (detailType.value === 'hotel') return 'hotel';
  if (detailType.value === 'car') return 'directions_car';
  if (detailType.value === 'destination') return 'explore';
  return 'info';
});

const heading = computed(() => {
  if (!detailItem.value) return 'No details available';
  if (detailType.value === 'flight') return detailItem.value.route;
  if (detailType.value === 'hotel') return detailItem.value.name;
  if (detailType.value === 'car') return detailItem.value.name;
  if (detailType.value === 'destination') return detailItem.value.city;
  return detailItem.value.name || detailItem.value.route || 'Details';
});

const subtitle = computed(() => {
  if (!detailItem.value) return '';
  if (detailType.value === 'flight') return detailItem.value.details;
  if (detailType.value === 'hotel') return detailItem.value.location;
  if (detailType.value === 'car') return detailItem.value.type || detailItem.value.specs;
  if (detailType.value === 'destination') return detailItem.value.country;
  return '';
});

const ratingText = computed(() => {
  const rating = detailItem.value?.rating;
  return rating ? `${rating}/5.0` : 'N/A';
});

const ratingLabel = computed(() => {
  if (detailType.value === 'flight') return 'Excellent Rating';
  if (detailType.value === 'hotel') return `${detailItem.value?.stars || 4}-Star Hotel`;
  if (detailType.value === 'car') return 'Great Choice';
  if (detailType.value === 'destination') return 'Trending Destination';
  return '';
});

const infoItems = computed(() => {
  const item = detailItem.value;
  if (!item) return [];

  if (detailType.value === 'flight') {
    return [
      { icon: 'airline_seat_recline_normal', label: 'Airline', value: item.airline || 'Various' },
      { icon: 'stop', label: 'Stops', value: item.stops === 0 ? 'Non-stop' : `${item.stops} Stop(s)` },
      { icon: 'event', label: 'Departure', value: item.departDate || 'Flexible' },
    ];
  }

  if (detailType.value === 'hotel') {
    return [
      { icon: 'star', label: 'Rating', value: `${item.rating || 'N/A'}/5.0` },
      { icon: 'grade', label: 'Stars', value: `${item.stars || 4} Stars` },
      { icon: 'location_city', label: 'City', value: item.city || 'N/A' },
    ];
  }

  if (detailType.value === 'car') {
    return [
      { icon: 'local_gas_station', label: 'Fuel Type', value: item.fuel || 'N/A' },
      { icon: 'settings', label: 'Transmission', value: item.transmission || 'N/A' },
      { icon: 'people', label: 'Seats', value: `${item.seats || 'N/A'}` },
      { icon: 'star', label: 'Rating', value: `${item.rating || 'N/A'}/5.0` },
    ];
  }

  if (detailType.value === 'destination') {
    return [
      { icon: 'public', label: 'Country', value: item.country || 'N/A' },
      { icon: 'location_city', label: 'City', value: item.city || 'N/A' },
      { icon: 'attach_money', label: 'Starting From', value: item.price || 'N/A' },
    ];
  }

  return [];
});

const featureItems = computed(() => {
  if (detailType.value === 'hotel') return detailItem.value?.features || [];
  return [];
});

const reviewSummary = computed(() => {
  if (detailType.value !== 'hotel' || !detailItem.value) return null;

  const item = detailItem.value;
  const rating = Number(item.rating || 4.4);
  const count = Math.max(28, Math.round(rating * 42 + (item.stars || 4) * 16));
  const highlights = (item.features || item.amenities || []).slice(0, 3);

  return {
    average: rating.toFixed(1),
    count,
    highlights: highlights.length ? highlights : ['Clean rooms', 'Great location', 'Friendly staff'],
    summary: `Guests highlight ${highlights.join(', ') || 'clean rooms and helpful staff'} during their stay.`,
  };
});

const reviewItems = computed(() => {
  if (detailType.value !== 'hotel' || !detailItem.value) return [];

  const item = detailItem.value;
  const features = item.features || [];
  const locationName = item.location || item.city || 'this hotel';
  const hasAC = features.includes('AC');
  const hasBalcony = features.includes('Balcony');
  const hasFridge = features.includes('Fridge');
  const hasRoomService = features.includes('Room Service');

  return [
    {
      author: 'Mia R.',
      role: 'Family traveller',
      date: '2 days ago',
      rating: Math.min(5, Number(item.rating || 4.4) + 0.2).toFixed(1),
      comment: `${locationName} felt very comfortable for our stay. ${hasAC ? 'The AC kept the room cool all day.' : 'The room stayed pleasantly comfortable.'} ${hasBalcony ? 'The balcony was a lovely bonus in the evenings.' : 'We especially liked the quiet room layout.'}`,
    },
    {
      author: 'Daniel K.',
      role: 'Couple stay',
      date: '1 week ago',
      rating: Math.min(5, Number(item.rating || 4.4) + 0.1).toFixed(1),
      comment: `${locationName} was ideal for a short break. ${hasFridge ? 'Having a fridge made it easy to keep drinks and snacks ready.' : 'The essentials were all there and well maintained.'} ${hasRoomService ? 'Room service was quick and convenient.' : 'Staff were attentive and check-in was smooth.'}`,
    },
    {
      author: 'Sara P.',
      role: 'Business traveller',
      date: '2 weeks ago',
      rating: Math.max(4.0, Number(item.rating || 4.4) - 0.1).toFixed(1),
      comment: `A reliable stay in ${item.city || item.country || 'a great location'}. Clean rooms, practical amenities, and an easy booking experience made it an easy recommendation.`,
    },
  ];
});

function getFeatureIcon(feature) {
  const icons = {
    'Free WiFi': 'wifi',
    AC: 'ac_unit',
    Balcony: 'balcony',
    Fridge: 'kitchen',
    'Room Service': 'room_service',
    Gym: 'fitness_center',
    Restaurant: 'restaurant',
    Breakfast: 'free_breakfast',
  };
  return icons[feature] || 'check_circle';
}

const priceText = computed(() => {
  const item = detailItem.value;
  if (!item) return '$0';

  if (detailType.value === 'flight') return `$${item.price || 0}`;
  if (detailType.value === 'hotel') return `$${item.price || item.pricePerPerson || 0}`;
  if (detailType.value === 'car') return `$${item.price || 0}`;
  if (detailType.value === 'destination') return item.price || '$0';

  return '$0';
});

const priceLabel = computed(() => {
  if (detailType.value === 'hotel') return '/night';
  if (detailType.value === 'car') return '/day';
  if (detailType.value === 'destination') return ' starting price';
  return '';
});

function goBack() {
  router.back();
}

function handlePrimaryAction() {
  const item = detailItem.value;
  if (!item) return;

  if (detailType.value === 'destination') {
    goToRecommendedFlights();
    return;
  }

  const typeMap = {
    flight: 'Flight',
    hotel: 'Hotel',
    car: 'Car',
  };

  addToCart({
    ...item,
    type: typeMap[detailType.value] || 'Item',
  });

  const itemName = item.route || item.name || item.city || 'Item';
  pushToast(`Added to cart: ${itemName}`, { type: 'success' });
  router.push('/cart');
}
</script>

<template>
  <div class="hotel-detail-page">
    <div class="detail-header">
      <button class="back-btn" @click="goBack">
        <span class="material-icons">arrow_back</span>
        Back
      </button>
      <h1>{{ pageTitle }}</h1>
      <div></div>
    </div>

    <div class="detail-container" v-if="detailItem">
      <div class="detail-hero">
        <span class="material-icons detail-icon">{{ heroIcon }}</span>
        <div class="hero-copy">
          <h2>{{ heading }}</h2>
          <p class="subtitle">{{ subtitle }}</p>
        </div>
      </div>

      <div class="detail-layout">
        <div class="detail-main-column">
          <div class="detail-stack">
            <section class="detail-card section-card" v-if="infoItems.length">
              <div class="section-content">
              <h3>Quick Info</h3>
              <div class="info-grid">
                <div class="info-item" v-for="info in infoItems" :key="info.label">
                  <span class="material-icons">{{ info.icon }}</span>
                  <div>
                    <p class="info-label">{{ info.label }}</p>
                    <p class="info-value">{{ info.value }}</p>
                  </div>
                </div>
              </div>
              </div>
            </section>

            <section class="detail-card section-card" v-if="featureItems.length">
              <div class="section-content">
              <h3>Features Included</h3>
              <div class="features-list">
                <div v-for="feature in featureItems" :key="feature" class="feature-item">
                  <span class="material-icons">{{ getFeatureIcon(feature) }}</span>
                  {{ feature }}
                </div>
              </div>
              </div>
            </section>

            <section class="detail-card section-card" v-if="detailType === 'destination' && destinationFlightRecommendations.length">
              <div class="section-content">
                <div class="recommend-header">
                  <h3>Recommended Flights</h3>
                  <label class="from-select-wrap">
                    <span>From</span>
                    <select v-model="selectedFromLocation">
                      <option v-for="country in fromLocationOptions" :key="country" :value="country">
                        {{ country }}
                      </option>
                    </select>
                  </label>
                </div>
                <p class="subtitle flights-from">From {{ selectedFromLocation }} to {{ detailItem.city }}</p>

                <div class="recommended-flights-list">
                  <article v-for="flight in destinationFlightRecommendations" :key="flight.id" class="recommended-flight-card">
                    <div class="recommended-flight-top">
                      <strong>{{ flight.route }}</strong>
                      <span class="recommended-flight-price">${{ flight.price }}</span>
                    </div>
                    <p>{{ flight.details }}</p>
                    <div class="recommended-flight-tags">
                      <span v-for="tag in flight.tags" :key="tag">{{ tag }}</span>
                    </div>
                  </article>
                </div>

                <button class="btn-primary recommend-btn" @click="goToRecommendedFlights">View Flights</button>
              </div>
            </section>
          </div>
        </div>

        <aside class="detail-sidebar">
          <div class="detail-card sidebar-card">
            <div class="section section-tight">
              <div class="rating-box">
                <span class="material-icons">star</span>
                <span class="rating-value">{{ ratingText }}</span>
                <span class="rating-label">{{ ratingLabel }}</span>
              </div>
            </div>

            <div class="section section-tight">
              <h3>Price</h3>
              <p class="price">{{ priceText }}<span class="price-label">{{ priceLabel }}</span></p>
            </div>

            <div class="action-buttons">
              <button class="btn-secondary" @click="goBack">Continue Browsing</button>
              <button class="btn-primary" @click="handlePrimaryAction">
                {{ detailType === 'destination' ? 'See Flights' : 'Book Now' }}
              </button>
            </div>
          </div>
        </aside>
      </div>

      <section class="detail-card section-card full-width-section" v-if="reviewSummary">
        <div class="section-content">
        <h3>Customer Reviews</h3>
        <div class="review-summary">
          <div class="review-score-block">
            <p class="review-score">{{ reviewSummary.average }}</p>
            <p class="review-count">{{ reviewSummary.count }} verified reviews</p>
          </div>
          <div class="review-summary-copy">
            <p class="review-summary-text">{{ reviewSummary.summary }}</p>
            <div class="tags review-tags">
              <span v-for="highlight in reviewSummary.highlights" :key="highlight" class="tag review-tag">{{ highlight }}</span>
            </div>
          </div>
        </div>

        <div class="review-list">
          <article v-for="review in reviewItems" :key="review.author" class="review-card">
            <div class="review-top">
              <div>
                <p class="review-author">{{ review.author }}</p>
                <p class="review-meta">{{ review.role }} · {{ review.date }}</p>
              </div>
              <div class="review-rating">
                <span class="material-icons">star</span>
                {{ review.rating }}/5
              </div>
            </div>
            <p class="review-text">{{ review.comment }}</p>
          </article>
        </div>
        </div>
      </section>
    </div>

    <div class="detail-container" v-else>
      <div class="detail-card">
        <div class="section">
          <h2>Details not found</h2>
          <p class="subtitle">The selected item could not be loaded.</p>
        </div>
        <div class="action-buttons">
          <button class="btn-secondary" @click="goBack">Go Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./DetailPage.css"></style>
