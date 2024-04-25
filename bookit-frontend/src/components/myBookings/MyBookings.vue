    <script setup lang="ts">
    import Reservation from '../commons/Reservation.vue';
    import { ReservationService } from '../../services/ReservationService.ts'
    import { ref, onMounted } from 'vue'
    import { ReservationRequest } from '../../model/ReservationRequest.ts';
    import { DateParser } from '../../utils/dateParser.ts';
    import { Reservation as ReservationModel } from '../../model/Reservation.ts';
    import { Tabs } from '../../enums/tabs.ts';
import stateManager from '../../composables/stateManager.ts';

    const currentReservations = ref<[ReservationModel] | null>(null)
    const historyReservations = ref<[ReservationModel] | null>(null)
    const reservationService = new ReservationService()

    const { myCurrentBookingsEmpty, myHistoryBookingsEmpty, openTab } = stateManager()

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
        initCurrentReservations()
        initHistoryReservations()
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

    function showTab(tab: Tabs) {
        openTab.value = tab
    }
</script>

<template>
    <h1>My Reservations</h1>
    <p>Know when and where you will be at University.</p>
    <div>
        <button @click="showTab(Tabs.CURRENT)">My curent bookings</button>
        <button @click="showTab(Tabs.HISTORY)">My history bookings</button>
    </div>
    <div v-if="openTab == Tabs.HISTORY">
        <div v-if="myHistoryBookingsEmpty.value">
            <p>You don't have any past reservations.</p>
        </div>
        <div v-else>
            <div v-for="item in historyReservations">
                <Reservation @remove="remove" :reservation="item" :delete="true"/>
            </div>
        </div>
    </div>
    <div v-if="openTab == Tabs.CURRENT">
        <div v-if="myCurrentBookingsEmpty.value">
            <p>You don't have any current reservations.</p>
        </div>
        <div v-else>
            <div v-for="item in currentReservations">
                <Reservation @remove="remove" :reservation="item" :delete="true"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>