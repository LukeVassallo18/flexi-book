import { createRouter, createWebHistory } from 'vue-router';
import CarRentalDetailPage from "../views/CarRentalDetailPage.vue";
import CarRentalsPage from "../views/CarRentalsPage.vue";
import CartPage from "../views/CartPage.vue";
import FlightDetailPage from "../views/FlightDetailPage.vue";
import FlightsPage from '../views/FlightsPage.vue';
import HomePage from '../views/HomePage.vue';
import HotelDetailPage from "../views/HotelDetailPage.vue";
import HotelsPage from "../views/HotelsPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomePage },
    { path: "/flights", name: "flights", component: FlightsPage },
    {
      path: "/flight/:flight",
      name: "flight-detail",
      component: FlightDetailPage,
    },
    { path: "/hotels", name: "hotels", component: HotelsPage },
    { path: "/hotel/:hotel", name: "hotel-detail", component: HotelDetailPage },
    { path: "/car-rentals", name: "car-rentals", component: CarRentalsPage },
    { path: "/car/:car", name: "car-detail", component: CarRentalDetailPage },
    { path: "/cart", name: "cart", component: CartPage },
  ],
});

export default router;
