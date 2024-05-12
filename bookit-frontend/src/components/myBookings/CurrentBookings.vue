<script setup lang="ts">
import Reservation from '../commons/Reservation.vue';
import { ReservationService } from '../../services/ReservationService.ts'
import { ref, onMounted, onBeforeMount } from 'vue'
import { ReservationRequest } from '../../model/ReservationRequest.ts';
import { DateParser } from '../../utils/dateParser.ts';
import { Reservation as ReservationModel } from '../../model/Reservation.ts';
import stateManager from '../../composables/stateManager.ts';
import ReservationClosed from '../commons/ReservationClosed.vue';
import TableRow from '../commons/TableRow.vue';
import { Section } from '../../enums/section.ts';

const currentReservations = ref<ReservationModel[] | null>(null)
const reservationService = new ReservationService()
const { myCurrentBookingsEmpty, openSection, authorizedUser, mostRecentReservation } = stateManager()

function initCurrentReservations() {
    currentReservations.value = []
    reservationService.getCurrentReservations(localStorage.getItem('token') ?? "")
    .then( result => {
        result.reservations?.forEach((r) => {
            currentReservations.value?.push(r)
        })

        myCurrentBookingsEmpty.value = !(currentReservations.value?.length ?? 0 > 0)

        var sorted =  currentReservations.value?.sort((a,b) : number => {
            var aDate = new Date(a.startTime)
            var bDate = new Date(b.startTime)

            if (aDate < bDate) {
                return -1;
            }
            if (aDate > bDate) {
                return 1;
            }

            return 0;
        })

        mostRecentReservation.value = sorted?.[0]
    })
}

onBeforeMount (() => {
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
    <div class="current-reservations-container">
        <div v-if="myCurrentBookingsEmpty" class="no-reservations">
            <p>You don't have any current reservations.</p>
        </div>
        <div v-else>
            <p> {{ openSection }}</p>
            <div v-if='openSection == Section.MAINPAGE'>
                <TableRow>
                    <template #closedContent>
                        <ReservationClosed :reservation="mostRecentReservation" />
                    </template>
                    
                    <template #openContent>
                        <Reservation @remove="remove" :reservation="mostRecentReservation" :delete="false"/>
                    </template>
            
                    <template #arrow>
                        <p>▼</p>
                    </template>
                </TableRow>
            </div>
            <div v-else>
                <TableRow v-for="item in currentReservations" :key="item.id">
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
        </div>
    </div>
</template>

<style scoped>
.current-reservations-container {
    margin: 0 auto;
}

.no-reservations {
    text-align: center;
    margin-top: 20px;
    border: 2px solid #ccc;
    padding: 20px;
    border-radius: 10px;
}

.no-reservations p {
    color: red;
    font-style: italic;
}
</style>
