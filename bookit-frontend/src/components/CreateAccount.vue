<script setup>
    import { ref } from 'vue'
    import { UserService } from '../services/UserService.ts'
    import { User } from '../model/User.ts'

    const service = new UserService()
    const firstName = ref("")
    const lastName = ref("")
    const email = ref("")
    const password = ref("")
    const rpassword = ref("")
    const requestResult = ref("")

    function register() {
        const userRequest = new User(firstName.value, lastName.value, email.value, password.value)
        service.createUser(userRequest)
        .then( result => requestResult.value = result)
    }

</script>

<template>
    <div id="app">
        <form v-on:submit.prevent="register">
            <p>Creat Account</p>
            <p>Fill in this form to create an account</p>
            <p>First name: <input type="text" required v-model="firstName"></p>
            <p>Last name: <input type="text" v-model="lastName"></p>
            <p>Email: <input type="text" v-model="email"></p>
            <p>Password: <input type="text" v-model="password"></p>
            <p>Repeat password: <input type="text" v-model="rpassword"></p>
            <p>By creating an account you agree to our TERMS & CONDITIONS</p>
            <button type="submit">SIGN UP</button>
            <p>Already have an account? SIGN IN</p>
        </form>
    </div>
</template>

<style scoped>
</style>