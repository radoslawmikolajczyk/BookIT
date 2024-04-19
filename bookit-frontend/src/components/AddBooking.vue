<script setup>

// 

import { ref } from 'vue'
import { GroupsService } from '../services/GroupsService.ts'
import { Group } from '../model/Group.ts';
import { UserGroupRequest } from '../model/UserGroupRequest.ts';

    const groups = ref([""])
    let group = ref("")
    

    const services = new GroupsService()

    function getAllGroups() {
        services.getAllGroups()
        .then( result => {
                groups.value = result
            }
        )
    }

    function getGroupById(id) {
        services.getGroupById(id)
        .then( result => {
                group.value = result
            }
        )
    }

    function createGroups() {
        services.createGroups()
        .then( result => {
                group.value = result
            }
        )
    }

    function addUserToGroup() {
        services.addUserToGroup()
        .then( result => {
                group.value = result
            }
        )
    }

</script>

<template>
    <h1>Add booking</h1>
</template>

<style scoped>
</style>