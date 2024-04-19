<script setup lang="ts">
import Reservation from './Reservation.vue';
import { ReservationService } from '../services/ReservationService.ts'
import { ref, onMounted } from 'vue'
import { RoomService } from '../services/RoomService.ts'
import { ReservationRequest } from '../model/ReservationRequest.ts';
import { DateParser } from '../utils/dateParser.ts';
import { Reservation as ReservationModel } from '../model/Reservation.ts';

    const reservations = ref<[ReservationModel] | null>(null)
    const reservationService = new ReservationService()
    const roomService = new RoomService()
    const empty = ref(true)

    function initValues() {
        reservations.value = [new ReservationModel()]
        reservations.value.pop()

        reservationService.getAllUserReservations(localStorage.getItem('token') ?? "")
        .then( result => {
            empty.value = !(result.reservations.length > 0)

            result.reservations.forEach((r) => {
                reservations.value?.push(r)
            })           
        })
    }

    onMounted (() => {
        initValues()
    })

    function remove(request: ReservationRequest) {
        var startTime = DateParser.parseDate(request.startTime)
        var endTime = DateParser.parseDate(request.endTime)
        const token = localStorage.getItem('token') ?? ""
        reservationService.deleteReservation(new ReservationRequest(token, request.roomId, startTime, endTime))
            .then( result => {
                console.log(result)
                initValues()
            })
    }

</script>

<template>
    <h1>My Reservations</h1>
    <div v-if="empty">
        <p>You don't have any reservations. Make your first reservation.</p>
        <!-- TUTAJ DODAĆ PRZYCISK DODAWANIA BOOKINGU-->
    </div>
    <div v-else>
        <p>Know when and where you will be at University.</p>
        <div v-for="item in reservations">
            <Reservation 
            @remove="remove"
            :reservation="item"
            :delete="true"
            />
        </div>
    </div>
</template>

<style scoped>
</style>