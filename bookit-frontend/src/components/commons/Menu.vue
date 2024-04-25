<script setup>
import { useRouter } from 'vue-router';
import stateManager from '../../composables/stateManager';
    const router = useRouter()

    const { authorizedUser } = stateManager()

    function wrapNavigate(navigate, event) {
        localStorage.removeItem('token')
        authorizedUser.value = null
        router.back()
    }
</script>

<template >
    <div>
        <div class="nav-menu"> 
            <div class="nav-content" >
                <ul class="nav-items">
                    <li><router-link to="/">BookIT</router-link></li>
                    <li><router-link to="/my_bookings">My bookings</router-link></li>
                    <li><router-link to="/add_booking">Add booking</router-link></li>
                    <li><router-link to="/groups">Groups</router-link></li>
                    <li><router-link to="/help">Help</router-link></li>
                    <li>
                        <router-link to="/login" custom v-slot="{ href, navigate}">
                            <a :href="href" @click="wrapNavigate(navigate, $event)">Log out</a>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
    .nav-menu {
    background-color: rgb(206, 84, 84);
    }

    .nav-content {
    display: flex;
    justify-content: space-between;
    padding: 10px 30px;
    align-items: center;
    }
    
    .nav-items {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    li {
    padding: 0 10px;
    }
    }
    i {
    display: none;
    }
    
    @media screen and (max-width: 768px) {
    .nav-menu {
    padding-top: 10px;
    position: absolute;
    width: 100%;
    }
    .open-menu {
    opacity: 1;
    height: 105px;
    }
    .closed-menu {
    opacity: 0;
    height: 0;
    padding: 0;
    }
    .nav-content {
    flex-direction: column;
    z-index: 100;
    position: relative;
    transition: all 0.2s ease-out;
    }
    .nav-items {
    flex-direction: column;
    }
    i {
    display: block;
    text-align: right;
    padding: 0 10px 10px 0;
    }
    }
</style>