import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Login from '../views/LoginView.vue';
import Signup from '../views/SignupView.vue';
import Create from '../views/CreateView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      auth: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
      auth: false,
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      title: 'Signup',
      auth: false,
    },
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    meta: {
      title: 'Create',
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
