<script setup lang="ts">
    import { onBeforeMount } from 'vue';
    import Menu from './components/commons/Menu.vue';
    import { RoomService } from './services/RoomService';
    import stateManager from './composables/stateManager';

    const roomService = new RoomService()

    const { 
        roomsFloorsNumbers,
        roomsBuldings,
        authorizedUser
    } = stateManager()

    onBeforeMount(() => {
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
    #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  font-family: sans-serif;
  font-weight: 100;
  --grey-100: #e4e9f0;
  --grey-200: #cfd7e3;
  --grey-300: #b5c0cd;
  --grey-800: #3e4e63;
  --grid-gap: 1px;
  --day-label-size: 20px;
}

ol,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}

.calendar-month-header {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px;
}
</style>
