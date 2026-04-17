import { createRouter, createWebHistory } from "vue-router";
import BookingSuccessPage from "../views/BookingSuccessPage.vue";
import CarRentalsPage from "../views/CarRentalsPage.vue";
import CartPage from "../views/CartPage.vue";
import CheckoutPage from "../views/CheckoutPage.vue";
import DetailPage from "../views/DetailPage.vue";
import FlightsPage from "../views/FlightsPage.vue";
import HomePage from "../views/HomePage.vue";
import HotelsPage from "../views/HotelsPage.vue";
import WelcomeDisclaimerPage from "../views/WelcomeDisclaimerPage.vue";

const DISCLAIMER_STORAGE_KEY = "flexi-book-disclaimer-accepted";

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
  routes: [
    {
      path: "/welcome",
      name: "welcome-disclaimer",
      component: WelcomeDisclaimerPage,
    },
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
    { path: "/checkout", name: "checkout", component: CheckoutPage },
    {
      path: "/booking-success",
      name: "booking-success",
      component: BookingSuccessPage,
    },
  ],
});

router.beforeEach((to) => {
  if (typeof window === "undefined") return true;

  const hasAcceptedDisclaimer = window.localStorage.getItem(DISCLAIMER_STORAGE_KEY) === "true";
  if (to.name === "welcome-disclaimer") {
    if (hasAcceptedDisclaimer) {
      const redirect = typeof to.query.redirect === "string" ? to.query.redirect : "/";
      return redirect;
    }
    return true;
  }

  if (!hasAcceptedDisclaimer) {
    return {
      name: "welcome-disclaimer",
      query: { redirect: to.fullPath },
    };
  }

  return true;
});

router.afterEach(() => {
  if (typeof window === "undefined") return;

  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
});

export default router;
