<script setup lang="ts">
    import { onBeforeMount} from 'vue'
    import  stateManager from '../../composables/stateManager';
    import { RoomRequest } from '../../model/RoomRequest';

    const emit = defineEmits(['makeReservation'])

    const { roomsFloorsNumbers, roomsBuldings, roomsNumbers, floorSelected, buildingSelected, roomNumberSelected, userReservationsChecked, isCreateReservationBlocked,reservationTimeMax,reservationTimeMin  } = stateManager()

    function clearFilters() {
        floorSelected.value = 0
        buildingSelected.value = ""
        roomNumberSelected.value = ""
        userReservationsChecked.value = false
        reservationTimeMax.value = ""
        reservationTimeMin.value = ""
    }

    function makeReservation() {
        emit("makeReservation");
    }

</script>

<template>
    <div class="container">
        <div class="filter">
            <label for="building">Building</label>
            <select id="building" v-model="buildingSelected">
                <option v-for="option in roomsBuldings" :value="option">{{ option }}</option>
            </select>
        </div>

        <div class="filter">
            <label for="floor">Room</label>
            <select id="floor" v-model="roomNumberSelected">
                <option v-for="option in roomsNumbers" :value="option">{{ option }}</option>
            </select>
        </div>

        <div class="filter">
            <label for="floor">Floor</label>
            <select id="floor" v-model="floorSelected">
                <option v-for="option in roomsFloorsNumbers" :value="option">{{ option }}</option>
            </select>
        </div>

        <div class="filter">
            <label for="timeMin">Start time</label>
            <input type="time" id="timeMin" v-model="reservationTimeMin" />
        </div>

        <div class="filter">
            <label for="timeMax">End time</label>
            <input type="time" id="timeMax" v-model="reservationTimeMax" />
        </div>

        <div class="filter">
            <button :disabled="isCreateReservationBlocked" @click="makeReservation">Make reservation</button>
        </div>

        <div class="filter">
            <button @click="clearFilters">Reset</button>
        </div>

    </div>
</template>

<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        font-size: 30px;
        color: green;
        padding: 5px;
        overflow: auto;
    }
    
    .main div {
        border: 2px solid rgb(209, 190, 190);
        margin: 10px 20px;
        width: 100px;
    }

    .filter {
         padding: 20px 20px 20px 20px; 
    }

</style>