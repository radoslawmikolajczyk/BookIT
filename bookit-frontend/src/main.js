import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/app.css'
import './assets/css/main.css'
import { createRouter, createWebHistory } from 'vue-router'
import CreateAccount from './components/login/CreateAccount.vue'
import MainPage from './components/mainPage/MainPage.vue'
import LoginPage from './components/login/LoginPage.vue'
import TermsConditions from './components/login/TermsConditions.vue'
import AddBooking from './components/addBooking/AddBooking.vue'
import Help from './components/help/Help.vue'
import Groups from './components/groups/Groups.vue'
import stateManager from './composables/stateManager'
import { UserService } from './services/UserService'
import Bookings from './components/bookings/Bookings.vue'
import Schedule from './components/schedule/Schedule.vue'
import CalendarMonth from './components/calendar/CalendarMonth.vue'

const service = new UserService()

const routes = [
  { path: '/', component: MainPage, meta: { requiresAuth: true } },
  { path: '/bookings', component: CalendarMonth, meta: { requiresAuth: true } },
  { path: '/bookings/calendar', component: CalendarMonth, meta: { requiresAuth: true } },
  { path: '/bookings/schedule', component: Schedule, meta: { requiresAuth: true } },
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
