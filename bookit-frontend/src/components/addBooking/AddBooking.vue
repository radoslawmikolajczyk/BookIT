<script setup  lang="ts">
import { ref } from 'vue'
import { RoomService } from '../../services/RoomService.ts';
import Filters from './Filters.vue';
import { Reservation } from '../../model/Reservation.ts';
import { Room } from '../../model/Room.ts';
import { RoomRequest } from '../../model/RoomRequest.ts';
import { DateParser } from '../../utils/dateParser.ts';
import { ReservationRequest } from '../../model/ReservationRequest.ts';
import stateManager from '../../composables/stateManager.ts';
import { ReservationService } from '../../services/ReservationService.ts';

const rooms = ref<[Room] | null>(null)
const reservations = ref<[Reservation] | null>(null)
const roomService = new RoomService()
const reservationService = new ReservationService()

const { roomsRequest } = stateManager()

function filterRooms() {
    // initialization purpose only
    rooms.value = [new Room()]
    rooms.value.pop()
    // initialization purpose only
    reservations.value = [new Reservation()]
    reservations.value.pop()

    if(roomsRequest.value != null && roomsRequest.value.endTime != null && roomsRequest.value.startTime != null){
        roomService.getAvailableRooms(roomsRequest.value)
        .then( result => {
            console.log(result) // zobaczy co dostaje

            result.rooms?.forEach((r) => {
                rooms.value?.push(r)
            })

            // reservations.value = rooms.value?.map((r) => { 
            //     var reservation = new Reservation()
            //     reservation.endTime = r.
            // })
        })
    }
}

function reserve(request: ReservationRequest) {
    const startTime = DateParser.parseDate(request.startTime)
    const endTime = DateParser.parseDate(request.endTime)
    const token = localStorage.getItem('token') ?? ""

    reservationService.createReservation(new ReservationRequest(token, request.roomId, startTime, endTime))
    .then( result => {
        console.log(result)
    })
}

</script>

<template>
    <h1>Add booking</h1>
    <div>
        <div>
            <Filters @filter="filterRooms"></Filters>
        </div>
        <div v-for="item in reservations">
            <Reservation @reserve="reserve" :reservation="item" :delete="false"/>
        </div>
    </div>
</template>

<style scoped>
</style>