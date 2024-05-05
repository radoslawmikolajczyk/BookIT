<template>
    <div class="group-add-form-container">
        <div class="message">{{ message }}</div>
        <div class="input-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name"/>
        </div>
        <div class="input-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password"/>
        </div>
        <div class="button-group">
            <button @click.prevent="create()">Create</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { GroupsService } from '../../services/GroupsService';
    import { Group } from '../../model/Group';

    const password = ref("")
    const name = ref("")
    const groupsService = new GroupsService()
    const message = ref("")

    function create() {
        if(name.value.length == 0){
            message.value = "Name is empty. Fill the input!"
            return
        }

        if(password.value.length == 0){
            message.value = "Password is empty. Fill the input!"
            return
        }

        groupsService.createGroups([new Group(name.value, password.value)])
        .then((result) => {
            if(result.isSuccess){
                message.value = "Group has been created!"
            } else 
            {
                message.value = "Errors occurred during group creation!"
            }
        })
    }

</script>

<style scoped>
    .group-add-form-container {
        border: 2px solid #ccc;
        border-radius: 5px;
        padding: 20px;
        max-width: 400px;
        margin: 0 auto;
    }

    .input-group {
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    input[type="text"],
    input[type="password"],
    button {
        width: 100%;
        padding: 8px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .button-group button {
        background-color: #007bff;
        color: #fff;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .button-group button:hover {
        background-color: #0056b3;
    }

    .message {
        margin-bottom: 20px;
        color: #dc3545; /* Kolor czerwony */
    }
</style>
