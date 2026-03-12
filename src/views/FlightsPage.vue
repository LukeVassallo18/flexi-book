<script setup>
const flightDeals = [
  {
    route: 'New York → Tokyo',
    details: 'Delta • 1 Stop (LAX) • 16h 30m',
    tags: ['Business', '1 Stop'],
    rating: '4.6',
    price: '$649',
    icon: 'flight_takeoff',
  },
  {
    route: 'Dubai → Singapore',
    details: 'Emirates • Non-stop • 7h 20m',
    tags: ['Premium Economy', 'Non-stop'],
    rating: '4.9',
    price: '$420',
    icon: 'public',
  },
  {
    route: 'Los Angeles → Bali',
    details: 'Qatar Airways • 1 Stop (DOH) • 20h 45m',
    tags: ['Economy', '1 Stop'],
    rating: '4.7',
    price: '$780',
    icon: 'beach_access',
  },
  {
    route: 'Sydney → London',
    details: 'British Airways • 1 Stop (SIN) • 23h 10m',
    tags: ['Business', '1 Stop'],
    rating: '4.5',
    price: '$890',
    icon: 'travel_explore',
  },
  {
    route: 'Berlin → Rome',
    details: 'Lufthansa • Non-stop • 1h 55m',
    tags: ['Economy', 'Non-stop'],
    rating: '4.6',
    price: '$120',
    icon: 'map',
  },
];
</script>

<template>
  <main>
    <section class="flights-hero">
      <div class="hero-bubble bubble-1" aria-hidden="true"></div>
      <div class="hero-bubble bubble-2" aria-hidden="true"></div>

      <div class="flights-hero-inner">
        <h1>Find Your Flight</h1>
        <p>Compare prices from hundreds of airline worldwide</p>

        <form class="search-form" @submit.prevent>
          <div class="search-grid">
            <label>
              <span>From</span>
              <div class="input-wrap">
                <span class="material-icons">location_on</span>
                <input placeholder="Departure City" />
              </div>
            </label>
            <label>
              <span>To</span>
              <div class="input-wrap">
                <span class="material-icons">location_on</span>
                <input placeholder="Destination" />
              </div>
            </label>
            <label>
              <span>Depart</span>
              <div class="input-wrap">
                <span class="material-icons">calendar_month</span>
                <input placeholder="Date" />
              </div>
            </label>
            <label>
              <span>Passengers</span>
              <div class="input-wrap">
                <span class="material-icons">group</span>
                <input placeholder="1 Adult" />
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
            <h3>Price</h3>
            <p>Low to High</p>
          </div>
          <div class="filter-group">
            <h3>Stops</h3>
            <label><input type="checkbox" /> Non-stop</label>
            <label><input type="checkbox" /> 1 Stop</label>
            <label><input type="checkbox" /> 2+ Stops</label>
          </div>
          <div class="filter-group">
            <h3>Airlines</h3>
            <label><input type="checkbox" /> Emirates</label>
            <label><input type="checkbox" /> Delta</label>
            <label><input type="checkbox" /> British Airways</label>
            <label><input type="checkbox" /> Qatar Airways</label>
            <label><input type="checkbox" /> Lufthansa</label>
          </div>
          <button class="clear-btn" type="button">Clear all filters</button>
        </aside>

        <div class="results">
          <article v-for="deal in flightDeals" :key="deal.route" class="deal-card">
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
                <strong>{{ deal.price }}</strong>
                <button type="button">Book Now</button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped src="./FlightsPage.css"></style>
