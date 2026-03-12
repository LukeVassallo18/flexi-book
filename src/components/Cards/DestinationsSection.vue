<script setup>
const destinations = [
  {
    country: 'France',
    city: 'Paris',
    price: '$299',
    rating: '4.8',
    image: 'Eiffel.png',
  },
  {
    country: 'Japan',
    city: 'Tokyo',
    price: '$449',
    rating: '4.9',
    image: 'Tokyo.png',
  },
  {
    country: 'USA',
    city: 'New York',
    price: '$199',
    rating: '4.7',
    image: 'NewYork.png',
  },
  {
    country: 'Indonesia',
    city: 'Bali',
    price: '$349',
    rating: '4.9',
    image: 'Bali.png',
  },
];
</script>

<template>
  <section class="destinations-section" aria-labelledby="destinations-heading">
    <div class="container">
      <h2 id="destinations-heading" class="section-title">Popular Destinations</h2>
      <p class="section-subtitle">Explore trending destinations with the best deals this season.</p>

      <div class="cards-grid">
        <article v-for="dest in destinations" :key="dest.city" class="dest-card">
          <div class="card-image">
            <img :src="dest.image" :alt="`${dest.city}, ${dest.country}`" loading="lazy"/>
            <div class="rating-badge" aria-label="Rating">
              <span class="material-icons star-icon" aria-hidden="true">star</span>
              <span class="rating-text">{{ dest.rating }}</span>
            </div>
          </div>
          <div class="card-info">
            <div class="card-location">
              <span class="material-icons location-icon" aria-hidden="true">location_on</span>
              <span class="card-country">{{ dest.country }}</span>
            </div>
            <div class="card-footer">
              <h3 class="card-city">{{ dest.city }}</h3>
              <span class="card-price">from {{ dest.price }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped src="./DestinationsSection.css"></style>
