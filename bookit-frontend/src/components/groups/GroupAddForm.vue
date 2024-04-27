<script setup lang="ts">
    import { ref } from 'vue';
    import { GroupsService } from '../../services/GroupsService';
    import { Group } from '../../model/Group';

    const password = ref("")
    const name = ref("")
    const groupsService = new GroupsService()
    const message = ref("sdfs")

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
                message.value = "Errors occured during group creation!"
            }
        })
    }

</script>

<template>
    <div class="container">
        <div>
            <p> {{ message.value }} </p>
        </div>
        <div>
            <input type="text" id="name" v-model="name"/>
        </div>
        <div>
            <input type="password" id="password" v-model="password"/>
        </div>
        <div>
            <button v-on:click.prevent="create()">Create</button>
        </div>
        <div>
            <p> {{ message }} </p>
        </div>
    </div>
</template>

<style scoped>
    .arrow {
        display: block;
        color: black;
        text-align: center;
        font-size: 17px;
    }

    .container {
        border-style: solid;
        border-width: 2px;
    }
</style>