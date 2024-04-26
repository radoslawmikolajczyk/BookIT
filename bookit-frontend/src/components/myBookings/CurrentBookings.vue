<script setup lang="ts">
import Reservation from '../commons/Reservation.vue';
import { ReservationService } from '../../services/ReservationService.ts'
import { ref, onMounted } from 'vue'
import { ReservationRequest } from '../../model/ReservationRequest.ts';
import { DateParser } from '../../utils/dateParser.ts';
import { Reservation as ReservationModel } from '../../model/Reservation.ts';
import stateManager from '../../composables/stateManager.ts';

const currentReservations = ref<[ReservationModel] | null>(null)
const reservationService = new ReservationService()
const { myCurrentBookingsEmpty } = stateManager()

function initCurrentReservations() {
    currentReservations.value = [new ReservationModel()]
    currentReservations.value.pop()

    reservationService.getCurrentReservations(localStorage.getItem('token') ?? "")
    .then( result => {
        console.log(result)
        myCurrentBookingsEmpty.value = !(result.reservations?.length ?? 0 > 0)
        result.reservations?.forEach((r) => {
            currentReservations.value?.push(r)
        })
    })
}

onMounted (() => {
    initCurrentReservations()
})

function remove(request: ReservationRequest) {
    var startTime = DateParser.parseDate(request.startTime)
    var endTime = DateParser.parseDate(request.endTime)
    const token = localStorage.getItem('token') ?? ""
    reservationService.deleteReservation(new ReservationRequest(token, request.roomId, startTime, endTime))
        .then( result => {
            console.log(result)
            initCurrentReservations()
        })
}

</script>

<template>
    <div v-if="myCurrentBookingsEmpty">
        <p>You don't have any current reservations.</p>
    </div>

    <div v-else>
        <div v-for="item in currentReservations">
            <Reservation @remove="remove" :reservation="item" :delete="true"/>
        </div>
    </div>
</template>

<style scoped>
</style>