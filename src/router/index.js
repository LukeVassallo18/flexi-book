import { createRouter, createWebHistory } from "vue-router";
import CarRentalsPage from "../views/CarRentalsPage.vue";
import CartPage from "../views/CartPage.vue";
import DetailPage from "../views/DetailPage.vue";
import FlightsPage from "../views/FlightsPage.vue";
import HomePage from "../views/HomePage.vue";
import HotelsPage from "../views/HotelsPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomePage },
    { path: "/flights", name: "flights", component: FlightsPage },
    {
      path: "/flight/:flight",
      name: "flight-detail",
      component: DetailPage,
    },
    { path: "/hotels", name: "hotels", component: HotelsPage },
    { path: "/hotel/:hotel", name: "hotel-detail", component: DetailPage },
    { path: "/car-rentals", name: "car-rentals", component: CarRentalsPage },
    { path: "/car/:car", name: "car-detail", component: DetailPage },
    {
      path: "/destination/:destination",
      name: "destination-detail",
      component: DetailPage,
    },
    { path: "/cart", name: "cart", component: CartPage },
  ],
});

export default router;
