<template>
  <div class="login-container">
    <div class="background-image"></div>
    <form @submit.prevent="login" name="login-form" class="login-form">
      <div class="form-group">
        <label for="email" class="input-label">Email:</label>
        <input type="email" id="email" v-model="email" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="password" class="input-label">Password:</label>
        <input type="password" id="password" v-model="password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <p class="register-link">Need an account? <router-link to="/register">SIGN UP</router-link></p>
    <p class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UserService } from '../../services/UserService.ts';
import { User } from '../../model/User.ts';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const userService = new UserService();
const router = useRouter();

const login = async () => {
  try {
    const user = new User().create('', '', email.value, password.value);
    const result = await userService.login(user);
    if (result.isSuccess) {
      localStorage.setItem('token', email.value);
      router.push('/');
    } else {
      errorMessage.value = 'Wrong email or password!';
    }
  } catch (error) {
    console.error('Error during login:', error);
    errorMessage.value = 'An error occurred during login. Please try again later.';
  }
};
</script>

<style scoped>
.login-container {
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


.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-control {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

.btn {
  cursor: pointer;
  padding: 0.5rem 0; /* Ustawienie paddingu poziomego na 0, aby dopasować szerokość */
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  width: 100%;
}

.btn:hover {
  background-color: #0056b3;
}

.register-link {
  margin-top: 1rem;
  text-align: center;
}

.error-message {
  color: red;
  margin-top: 1rem;
  text-align: center;
}

@media screen and (max-width: 600px) {
  .login-container {
    max-width: 300px;
  }
}

.input-label {
  margin-bottom: 0.5rem; /* Dodanie odstępu między polem tekstowym a jego etykietą */
}

</style>
