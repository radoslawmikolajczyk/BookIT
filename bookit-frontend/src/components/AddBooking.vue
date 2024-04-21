<script setup  lang="ts">
import { ref } from 'vue'
import { RoomService } from '../services/RoomService.ts';
import Filters from './Filters.vue';
import { Reservation } from '../model/Reservation.ts';
import { useStore } from 'vuex';
import { Room } from '../model/Room.ts';
import { RoomRequest } from '../model/RoomRequest.ts';

const rooms = ref<[Room] | null>(null)
const reservations = ref<[Reservation] | null>(null)
const store = useStore()
const roomService = new RoomService()

function filterRooms() {
    rooms.value = [new Room()]
    rooms.value.pop()
    reservations.value = [new Reservation()]
    reservations.value.pop()

    if(store.state.roomsRequest != null && store.state.roomsRequest.endTime != null && store.state.roomsRequest.startTime != null){
        roomService.getAvailableRooms(store.state.roomsRequest)
        .then( result => {
            console.log(result)

            // result.rooms?.forEach((r) => {
            //     rooms.value?.push(r)
            //     // tutaj przerobić room na reservation i wepchnąć do komponentu
            // })
        })
    }
}

function reserve() {

}

</script>

<template>
    <h1>Add booking</h1>
    <div>
        <div>
            <Filters></Filters>
        </div>
        <div>
            <button v-on:click.prevent = "filterRooms()">
                Confirm
            </button>
        </div>
        <div v-for="item in reservations">
            <Reservation @reserve="reserve" :reservation="item" :delete="false"/>
        </div>
    </div>
</template>

<style scoped>
</style>