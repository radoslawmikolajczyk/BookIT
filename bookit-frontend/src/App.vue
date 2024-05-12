<script setup lang="ts">
    import { onBeforeMount } from 'vue';
    import Menu from './components/commons/Menu.vue';
    import { RoomService } from './services/RoomService';
    import stateManager from './composables/stateManager';

    const roomService = new RoomService()

    const { 
        rooms,
        roomsFloorsNumbers,
        roomsBuldings,
        roomsNumbers,
        authorizedUser
    } = stateManager()

    onBeforeMount(() => {
        roomService.getAllRooms()
        .then( result => {
            rooms.value = result.rooms

            var numbers = result.rooms?.map((r) => { return r.floorNumber })
            var names = result.rooms?.map((r) => { return r.buildingName })
            var roomNumbers = result.rooms?.map((r) => { return r.roomName })

            roomsNumbers.value = new Set<string>(roomNumbers)
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
