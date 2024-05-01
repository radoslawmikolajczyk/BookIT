<template>
  <form name="login-form" >
    <div class="mb-3">
      <label for="email">Email: </label>
      <input type="email" id="email" v-model="email" />
    </div>
  <div class="mb-3">
     <label for="password">Password: </label>
     <input type="password" id="password" v-model="password" />
  </div>
    <button class="btn btn-outline-dark" type="submit" v-on:click.prevent = "login()">
      Login
    </button>
  </form>
  <p> Need an account? <router-link to="/register">SIGN UP</router-link></p>
  <p>{{ message }}</p>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import { UserService } from '../../services/UserService.ts';
import { User } from '../../model/User.ts'
import { useRouter } from 'vue-router';

const message = ref("")
const password = ref("")
const email = ref("")
const service = new UserService()
const router = useRouter()

function login() {
  const user = new User().create("", "", email.value, password.value)
    service.login(user)
    .then( result =>{
      if(result.isSuccess){
        localStorage.setItem('token', email.value)
        router.push("/")
      } else {
        message.value = "Wrong email or password!"
      }
    })
}
  
</script>