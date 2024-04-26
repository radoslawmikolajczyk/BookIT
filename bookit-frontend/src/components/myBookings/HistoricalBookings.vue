<script setup lang="ts">
import Reservation from '../commons/Reservation.vue';
import { ReservationService } from '../../services/ReservationService.ts'
import { ref, onMounted } from 'vue'
import { ReservationRequest } from '../../model/ReservationRequest.ts';
import { DateParser } from '../../utils/dateParser.ts';
import { Reservation as ReservationModel } from '../../model/Reservation.ts';
import { Tabs } from '../../enums/tabs.ts';
import stateManager from '../../composables/stateManager.ts';

const historyReservations = ref<[ReservationModel] | null>(null)
const reservationService = new ReservationService()
const { myHistoryBookingsEmpty } = stateManager()

function initHistoryReservations() {
    historyReservations.value = [new ReservationModel()]
    historyReservations.value.pop()

    reservationService.getHistoryReservations(localStorage.getItem('token') ?? "")
    .then( result => {
        console.log(result)
        myHistoryBookingsEmpty.value = !(result.reservations.length > 0)
        result.reservations.forEach((r) => {
            historyReservations.value?.push(r)
        })
    })
}

onMounted (() => {
    initHistoryReservations()
})

</script>

<template>


    <div v-if="myHistoryBookingsEmpty">
        <p>You don't have any past reservations.</p>
    </div>

    <div v-else>
        
        <div v-for="item in historyReservations">
            <Reservation @remove="remove" :reservation="item" :delete="true"/>
        </div>

    </div>


</template>

<style scoped>
</style>