import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/app.css'
import { createRouter, createWebHistory } from 'vue-router'
import CreateAccount from './components/CreateAccount.vue'
import MainPage from './components/MainPage.vue'
import LoginPage from './components/LoginPage.vue'
import TermsConditions from './components/TermsConditions.vue'
import MyBookings from './components/MyBookings.vue'
import AddBooking from './components/AddBooking.vue'
import Help from './components/Help.vue'
import store from './store/store.ts'

const routes = [
  { path: '/', component: MainPage, meta: { requiresAuth: true } },
  { path: '/my_bookings', component: MyBookings, meta: { requiresAuth: true } },
  { path: '/add_booking', component: AddBooking, meta: { requiresAuth: true } },
  { path: '/help', component: Help, meta: { requiresAuth: true } },
  { path: '/register', component: CreateAccount },
  { path: '/login', component: LoginPage },
  { path: '/terms', component: TermsConditions }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (token) {
      next();
      store.state.authorized = true
    } else {
      next('/login');
      store.state.authorized = false
    }
  } else {
    if (token) {
      next('/');
      store.state.authorized = true
    } else {
      next();
      store.state.authorized = false
    }
  }
});

createApp(App)
.use(router)
.use(store)
.mount('#app')
