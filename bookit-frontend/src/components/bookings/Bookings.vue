<script setup  lang="ts">
import { ref, watch } from 'vue'
import { RoomService } from '../../services/RoomService.ts';
import { Reservation } from '../../model/Reservation.ts';
import { Room } from '../../model/Room.ts';
import { DateParser } from '../../utils/dateParser.ts';
import { ReservationRequest } from '../../model/ReservationRequest.ts';
import stateManager from '../../composables/stateManager.ts';
import { ReservationService } from '../../services/ReservationService.ts';
import CalendarMonth from '../calendar/CalendarMonth.vue';
import Schedule from '../schedule/Schedule.vue';

const rooms = ref<[Room] | null>(null)
const reservations = ref<[Reservation] | null>(null)
const roomService = new RoomService()
const reservationService = new ReservationService()
const { roomsRequest } = stateManager()
const { calendarDisplayed, scheduleDisplayed } = stateManager()

watch(roomsRequest, () => {
    filterRooms()
    },
    { deep: true }
)

function filterRooms() {
    // initialization purpose only
    rooms.value = [new Room()]
    rooms.value.pop()
    // initialization purpose only
    reservations.value = [new Reservation()]
    reservations.value.pop()

    console.log(roomsRequest)

    if(roomsRequest.value != null && roomsRequest.value.endTime != null && roomsRequest.value.startTime != null){
        roomService.getAvailableRooms(roomsRequest.value)
        .then( result => {
            console.log(result)
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
        //console.log(result)
    })
}

function showCalendar() {
  calendarDisplayed.value = true
  scheduleDisplayed.value = false
}

function showSchedule() {
  calendarDisplayed.value = false
  scheduleDisplayed.value = true
}

</script>

<template>
    <div class="container">
        <div>
            <button v-on:click.prevent = "showCalendar()">Calendar</button>
            <button v-on:click.prevent = "showSchedule()">Schedule</button>
        </div>
        <div class="filter">
            <div v-if="calendarDisplayed">
                <CalendarMonth/>
            </div>
            <div v-if="scheduleDisplayed">
                <Schedule/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.filter {
    display: inline;
    flex-direction: row;
    font-size: 30px;
    color: green;
    padding: 5px;
}
 
.main div {
    border: 2px solid red;
    margin: 10px 20px;
    width: 100px;
}
</style>