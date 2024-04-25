<script setup>
    import { ref } from 'vue'
    import { GroupsService } from '../../services/GroupsService.ts'
    import { UserGroupRequest } from '../../model/UserGroupRequest.ts';

    const service = new GroupsService()
    const groupName = ref("")
    const password = ref("")

    function submit() {
        const email = localStorage.getItem('token');
        const groupRequest = new UserGroupRequest(email, groupName.value, password.value)
        
        service.addUserToGroup(groupRequest)
            .then( result => requestResult.value = result)
    }
</script>

<template>
    <div id="app">
        <form v-on:submit.prevent="submit">
            <p>Group name <input type="text" required v-model="groupName"></p>
            <p>Password <input type="text" required v-model="password"></p>
            <button type="submit">SIGN UP</button>
        </form>
        div
    </div>
</template>

<style scoped>
</style>