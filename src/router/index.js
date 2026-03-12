import { createRouter, createWebHistory } from 'vue-router';
import FlightsPage from '../views/FlightsPage.vue';
import HomePage from '../views/HomePage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/flights', name: 'flights', component: FlightsPage },
  ],
});

export default router;
