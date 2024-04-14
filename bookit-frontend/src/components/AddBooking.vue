<script setup>

import { ref } from 'vue'
import { GroupsService } from '../services/GroupsService.ts'
import { Group } from '../model/Group.ts';

    const groups = ref("")
    const group = ref<InstanceType<typeof Group>>("")
    const services = new GroupsService()

    function getAllGroups() {
        services.getAllGroups()
        .then( result => {
                groups.value = result
            }
        )
    }




</script>

<template>
    <h1>Add booking</h1>

    <p>Get all groups</p>

    <button @click="getAllGroups()">Click Me!</button>
    <a> {{ groups }}</a>

    <p>Get group</p>

    <button @click="getAllGroups()">Click Me!</button>
    <a> {{ group }}</a>
</template>

<style scoped>
</style>