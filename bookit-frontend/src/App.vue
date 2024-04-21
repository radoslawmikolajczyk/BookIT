<script setup lang="ts">
    import { onBeforeMount } from 'vue';
    import Menu from './components/Menu.vue';
    import { RoomService } from './services/RoomService';
    import stateManager from './composables/stateManager';

    const roomService = new RoomService()

    const { 
        roomsFloorsNumbers,
        roomsBuldings,
        authorizedUser
    } = stateManager()

    onBeforeMount(() => {
        console.log("how many times?")
        roomService.getAllRooms()
        .then( result => {
            var numbers = result.rooms?.map((r) => { return r.floorNumber })
            var names = result.rooms?.map((r) => { return r.buildingName })

            roomsFloorsNumbers.value = new Set<number>(numbers)
            roomsBuldings.value = new Set<string>(names)

        })
    })

</script>

<template>
    <Menu v-if="authorizedUser != null"></Menu>
    <router-view></router-view>
    
</template>

<style scoped>
</style>
