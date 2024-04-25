<script setup>
    // repeat password checking
    // email validation
    // email exists in db
    // strong password validation 
    // redirect to login page after register

    import { ref } from 'vue'
    import { UserService } from '../../services/UserService.ts'
    import { User } from '../../model/User.ts'

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
            <p>Last name: <input type="text" required v-model="lastName"></p>
            <p>Email: <input type="text" required v-model="email"></p>
            <p>Password: <input type="text" required v-model="password"></p>
            <p>Repeat password: <input type="text" required v-model="rpassword"></p>
            <p>By creating an account you agree to our 
                <router-link to="/terms">TERMS & CONDITIONS</router-link>
            </p>
            <button type="submit">SIGN UP</button>
            <p>Already have an account?
                <router-link to="/login">SIGN IN</router-link>
            </p>
        </form>
    </div>
</template>

<style scoped>
</style>