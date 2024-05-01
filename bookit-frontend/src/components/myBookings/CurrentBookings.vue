<script setup lang="ts">
import Reservation from '../commons/Reservation.vue';
import { ReservationService } from '../../services/ReservationService.ts'
import { ref, onMounted } from 'vue'
import { ReservationRequest } from '../../model/ReservationRequest.ts';
import { DateParser } from '../../utils/dateParser.ts';
import { Reservation as ReservationModel } from '../../model/Reservation.ts';
import stateManager from '../../composables/stateManager.ts';
import ReservationClosed from '../commons/ReservationClosed.vue';
import TableRow from '../commons/TableRow.vue';

const currentReservations = ref<[ReservationModel] | null>(null)
const reservationService = new ReservationService()
const { myCurrentBookingsEmpty } = stateManager()

function initCurrentReservations() {
    currentReservations.value = [new ReservationModel()]
    currentReservations.value.pop()

    reservationService.getCurrentReservations(localStorage.getItem('token') ?? "")
    .then( result => {
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
            initCurrentReservations()
        })
}

</script>

<template>
    <div v-if="myCurrentBookingsEmpty">
        <p>You don't have any current reservations.</p>
    </div>

    <div v-else>
        <TableRow v-for="item in currentReservations">
            
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