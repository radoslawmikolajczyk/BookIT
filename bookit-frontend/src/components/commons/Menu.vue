<template>
    <div class="navbar">
      <div class="nav-menu">
        <div class="nav-content">
          <router-link to="/" class="logo">BookIT</router-link>
          <i v-if="isBurgerVisible" class="fas fa-bars" @click="toggleMenu"></i>
        </div>
        <ul :class="{ 'nav-items': true, 'open-menu': isMenuOpen }">
          <li><router-link to="/bookings">Bookings</router-link></li>
          <!-- <li><router-link to="/my_bookings">My bookings</router-link></li>
          <li><router-link to="/add_booking">Add booking</router-link></li> -->
          <li><router-link to="/groups">Groups</router-link></li>
          <li><router-link to="/help">Help</router-link></li>
          <li>
            <router-link to="/login" custom v-slot="{ href, navigate }">
              <a :href="href" @click="wrapNavigate(navigate, $event)">Log out</a>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import stateManager from '../../composables/stateManager';
  
  const router = useRouter();
  const { authorizedUser } = stateManager();
  
  const isMenuOpen = ref(false);
  const isBurgerVisible = ref(false);
  
  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
  }
  
  function wrapNavigate(navigate, event) {
    localStorage.removeItem('token');
    authorizedUser.value = null;
    navigate(event);
  }
  
  onMounted(() => {
    const checkBurgerVisibility = () => {
      const navMenuWidth = document.querySelector('.nav-menu').offsetWidth;
      const navItemsWidth = document.querySelector('.nav-items').offsetWidth;
      isBurgerVisible.value = navMenuWidth < navItemsWidth;
    };
    checkBurgerVisibility();
    window.addEventListener('resize', checkBurgerVisibility);
  });
  </script>
  
  <style scoped>
  .navbar {
    background-color: rgb(206, 84, 84);
  }
  
  .nav-menu {
    padding: 10px 30px;
  }
  
  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    color: #fff;
    text-decoration: none;
    font-size: 1.5rem;
  }
  
  .fa-bars {
    font-size: 1.5rem;
    color: #fff;
    cursor: pointer;
  }
  
  .nav-items {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }
  
  .nav-items li {
    margin-right: 10px;
  }
  
  .nav-items li:last-child {
    margin-right: 0;
  }
  
  .nav-items li a {
    color: #fff;
    text-decoration: none;
  }
  
  .open-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  @media screen and (max-width: 768px) {
    .nav-items {
      display: none;
    }
  }
  </style>
  