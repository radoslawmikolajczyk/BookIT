<template>
  <div class="register-container">
    <div class="background-image"></div>
    <form @submit.prevent="register" class="register-form">
      <p>Create Account</p>
      <p>Fill in this form to create an account</p>
      <div class="form-group">
        <label for="first-name">First name:</label>
        <input type="text" id="first-name" v-model="firstName" required />
      </div>
      <div class="form-group">
        <label for="last-name">Last name:</label>
        <input type="text" id="last-name" v-model="lastName" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="rpassword">Repeat password:</label>
        <input type="password" id="rpassword" v-model="rpassword" required />
      </div>
      <p>By creating an account you agree to our <router-link to="/terms">TERMS & CONDITIONS</router-link></p>
      <button type="submit" class="btn btn-primary">SIGN UP</button>
      <p>Already have an account? <router-link to="/login">SIGN IN</router-link></p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UserService } from '../../services/UserService.ts';
import { User } from '../../model/User.ts';
import { useRouter } from 'vue-router';

const service = new UserService();
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const rpassword = ref('');
const requestResult = ref('');
const router = useRouter();

const register = async () => {
  try {
    if (password.value !== rpassword.value) {
      throw new Error('Passwords do not match');
    }
    const userRequest = new User().create(firstName.value, lastName.value, email.value, password.value);
    const result = await service.createUser(userRequest);
    requestResult.value = '';
    if (result.isSuccess) {
      router.push('/login');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    requestResult.value = 'An error occurred during registration. Please try again later.';
  }
};
</script>

<style scoped>

.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #f4f4f4;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.background-image {
  position: absolute; /* Ustawienie pozycji absolutnej, aby tło z obrazkiem było na tyle */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/img/background.jpg'); /* Dodanie tła z obrazkiem */
  background-size: cover; /* Dopasowanie rozmiaru tła do kontenera */
  border-radius: 10px; /* Zaokrąglenie rogów, aby pasowało do kontenera */
  z-index: -1; /* Ustawienie niższego indeksu warstwy, aby tło było pod formularzem */
}

.register-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="password"],
.btn {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

.btn {
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
}

.btn:hover {
  background-color: #0056b3;
}

p {
  margin-bottom: 0.5rem;
}

p:last-child {
  margin-bottom: 0;
}
</style>
