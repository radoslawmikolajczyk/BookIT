<script setup>

import { onBeforeMount, ref } from 'vue'
import { GroupsService } from './services/groupsService'

    const dogs = ref("")
    const services = new GroupsService()


    onBeforeMount( async() => {
        dogs.value = services.getAllGroups().then( result => dogs.value = result)
    })

    function insertData(){
        services.createGroups().then( result => dogs.value = result)
    }

</script>

<template>
    <button @click="insertData">Click Me!</button>
</template>

<style scoped>
</style>