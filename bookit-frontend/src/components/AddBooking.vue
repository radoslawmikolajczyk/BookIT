<script setup>

import { onBeforeMount, ref } from 'vue'
import { GroupsService } from '../services/GroupsService.ts'
import { Group } from '../model/Group.ts'
import { UserGroupRequest } from '../model/UserGroupRequest.ts';

    const dogs = ref("")
    const services = new GroupsService()


    onBeforeMount( async() => {
        dogs.value = services.getAllGroups()
        .then( result => dogs.value = result)
    })

    function getGroupById() {async() => {
        dogs.value = services.getAllGroups()
        .then( result => dogs.value = result)
    }
    }

    function getAllGroups() { async() => {
        dogs.value = services.getAllGroups()
        .then( result => dogs.value = result)
    }
    }

    function createGroups(){
        const array = []

        const g = new Group()
        g.name = "admin8"
        g.password = "admin_test"
        
        array.push(g)

        services.createGroups(array)
        .then( result => dogs.value = result)
    }

    function addUserToGroup(){
        const array = []
        const request = new UserGroupRequest()
        request.groupName = 
        request.groupPassword = 
        request.userEmail = 

        array.push(g)

        services.addUserToGroup()
        .then( result => dogs.value = result)
    }


</script>

<template>
    <button @click="insertData">Click Me!</button>
    <button @click="insertData">Click Me!</button>
    <button @click="insertData">Click Me!</button>
    <button @click="insertData">Click Me!</button>
    <a> {{ dogs }}</a>
</template>

<style scoped>
</style>