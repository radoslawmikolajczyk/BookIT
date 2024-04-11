<template>
  <form name="login-form" >
    <div class="mb-3">
      <label for="username">Username: </label>
      <input type="text" id="username" v-model="username" />
    </div>
  <div class="mb-3">
     <label for="password">Password: </label>
     <input type="password" id="password" v-model="password" />
  </div>
    <button class="btn btn-outline-dark" type="submit" v-on:click.prevent = "login()">
      Login
    </button>
  </form>
</template>

<script setup>

import { ref } from 'vue'

const message = ref("")

function login(){

  if(username.value != "" || password.value != ""){
        console.log("authenticated")
      }else{
        console.log("Username and Password can not be empty")
      }

}
  
</script>