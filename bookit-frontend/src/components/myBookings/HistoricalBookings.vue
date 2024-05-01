<script setup lang="ts">
import Reservation from '../commons/Reservation.vue';
import ReservationClosed from '../commons/ReservationClosed.vue';
import { ReservationService } from '../../services/ReservationService.ts'
import { ref, onMounted } from 'vue'
import { Reservation as ReservationModel } from '../../model/Reservation.ts';
import stateManager from '../../composables/stateManager.ts';
import { DateParser } from '../../utils/dateParser.ts';
import { ReservationRequest } from '../../model/ReservationRequest.ts';
import TableRow from '../commons/TableRow.vue';

const historyReservations = ref<[ReservationModel] | null>(null)
const reservationService = new ReservationService()
const { myHistoryBookingsEmpty } = stateManager()

function initHistoryReservations() {
    historyReservations.value = [new ReservationModel()]
    historyReservations.value.pop()

    reservationService.getHistoryReservations(localStorage.getItem('token') ?? "")
    .then( result => {
        myHistoryBookingsEmpty.value = !(result.reservations.length > 0)
        result.reservations.forEach((r) => {
            historyReservations.value?.push(r)
        })
    })
}

onMounted (() => {
    initHistoryReservations()
})

function remove(request: ReservationRequest) {
    var startTime = DateParser.parseDate(request.startTime)
    var endTime = DateParser.parseDate(request.endTime)
    const token = localStorage.getItem('token') ?? ""
    reservationService.deleteReservation(new ReservationRequest(token, request.roomId, startTime, endTime))
        .then( result => {

        })
}

</script>

<template>
    <div v-if="myHistoryBookingsEmpty">

        <p>You don't have any past reservations.</p>

    </div>

    <div v-else>
        <TableRow v-for="item in historyReservations">
            
            <template #closedContent>
                <ReservationClosed :reservation="item" />
            </template>
            
            <template #openContent>
                <Reservation @remove="remove" :reservation="item" :delete="true"/>
            </template>
    
            <template #arrow>
                <p>▼</p>
            </template>
    
        </TableRow>
    </div>
</template>

<style scoped>
</style>