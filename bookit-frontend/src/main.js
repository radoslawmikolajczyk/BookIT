import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/app.css'
import './assets/css/main.css'
import { createRouter, createWebHistory } from 'vue-router'
import CreateAccount from './components/CreateAccount.vue'
import MainPage from './components/MainPage.vue'
import LoginPage from './components/LoginPage.vue'
import TermsConditions from './components/TermsConditions.vue'
import MyBookings from './components/MyBookings.vue'
import AddBooking from './components/AddBooking.vue'
import Help from './components/Help.vue'
import Groups from './components/Groups.vue'
import stateManager from './composables/stateManager'
import { UserService } from './services/UserService'

const service = new UserService()

const routes = [
  { path: '/', component: MainPage, meta: { requiresAuth: true } },
  { path: '/my_bookings', component: MyBookings, meta: { requiresAuth: true } },
  { path: '/add_booking', component: AddBooking, meta: { requiresAuth: true } },
  { path: '/groups', component: Groups, meta: { requiresAuth: true } },
  { path: '/help', component: Help, meta: { requiresAuth: true } },
  { path: '/register', component: CreateAccount },
  { path: '/login', component: LoginPage },
  { path: '/terms', component: TermsConditions }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const { authorizedUser } = stateManager()

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');


  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (token) {
      if(authorizedUser.value == null) {
        service.getUserByEmail(token)
        .then( result =>{
            authorizedUser.value = result.user
            next()
        })
      } else {
        next();
      }
    } else {
      next('/login');
      authorizedUser.value = null
    }
  } else {
    if (token) {
      if(authorizedUser.value == null) {
        service.getUserByEmail(token)
        .then( result =>{
            authorizedUser.value = result.user
            next('/');
        })
      } else {
        next('/');
      }
    } else {
      next();
      authorizedUser.value = null
    }
  }
});

createApp(App)
.use(router)
.mount('#app')
