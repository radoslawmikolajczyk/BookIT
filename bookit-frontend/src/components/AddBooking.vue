<script setup>
import { ref } from 'vue'
import { GroupsService } from '../services/GroupsService.ts'
import { Group } from '../model/Group.ts';
import { UserGroupRequest } from '../model/UserGroupRequest.ts';
import MakeReservation from './MakeReservation.vue';
import Filters from './Filters.vue';

    // const groups = ref([""])
    // let group = ref("")
    
    // const services = new GroupsService()

    // function getAllGroups() {
    //     services.getAllGroups()
    //     .then( result => {
    //             groups.value = result
    //         }
    //     )
    // }

    // function getGroupById(id) {
    //     services.getGroupById(id)
    //     .then( result => {
    //             console.log(result)
    //         }
    //     )
    // }

    // function createGroups() {
    //     services.createGroups()
    //     .then( result => {
    //             group.value = result
    //         }
    //     )
    // }

    // function addUserToGroup() {
    //     services.addUserToGroup()
    //     .then( result => {
    //             group.value = result
    //         }
    //     )
    // }

</script>

<template>
    <h1>Add booking</h1>
    <Filters></Filters>
    <!-- <button v-on:click.prevent = "getGroupById(1)">
            add
    </button> -->
</template>

<style scoped>
</style>