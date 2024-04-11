import { createApp } from 'vue'
import App from './App.vue'
import './assets/app.css'

import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import CreateAccount from './components/CreateAccount.vue'
import MainPage from './components/MainPage.vue'
import LoginPage from './components/LoginPage.vue'
import TermsConditions from './components/TermsConditions.vue'

const routes = [
  { path: '/', component: MainPage, meta: { requiresAuth: true } },
  { path: '/register', component: CreateAccount },
  { path: '/login', component: LoginPage },
  { path: '/terms', component: TermsConditions}
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
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

createApp(App)
.use(router)
.mount('#app')
