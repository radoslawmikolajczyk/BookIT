<script setup lang="ts">
import Reservation from './Reservation.vue';
import { ReservationService } from '../services/ReservationService.ts'
import { ref, onMounted } from 'vue'
import { RoomService } from '../services/RoomService.ts'
import { Room } from '../model/Room.ts';
import { ReservationRequest } from '../model/ReservationRequest.ts';
import { DateParser } from '../utils/dateParser.ts';

    interface iReservation {
        date: string,
        buildingName: string,
        roomName: number,
        startTime: string,
        endTime: string,
        roomId: number
    }

    class iReservationImpl implements iReservation {
        date: string;
        buildingName: string;
        roomName: number;
        startTime: string;
        endTime: string;
        roomId: number;

        constructor(date: string, buildingName: string, roomName: number, startTime: string, endTime: string, roomId: number) {
            this.date = date
            this.buildingName = buildingName
            this.roomName = roomName
            this.startTime = startTime
            this.endTime = endTime
            this.roomId = roomId
        }
    }

    const reservations = ref<[iReservation] | null>(null)
    const reservationService = new ReservationService()
    const roomService = new RoomService()
    const empty = ref(true)

    function initValues() {
        roomService.getAllRooms()
        .then( result => {
            var rooms = result.rooms
            reservations.value = [new iReservationImpl("","",-1,"","",-1)]
            reservations.value.pop()

            reservationService.getAllUserReservations(localStorage.getItem('token') ?? "")
            .then( result => {
                empty.value = !(result.reservations.length > 0)
                result.reservations.forEach((reservation) => {
                    var room = rooms.find((room) => {
                            return reservation.room.id == room.id
                        }
                    )
                    var r = new iReservationImpl(reservation.endTime, room?.buildingName ?? "", room?.floorNumber ?? 0, reservation.startTime, reservation.endTime, room?.id ?? 0)
                    reservations.value?.push(r)
                })
            })
        })
    }

    onMounted (() => {
        initValues()
    })

    function remove(reequest: ReservationRequest) {
        console.log(reequest)
        var startTime = DateParser.parseDate(reequest.startTime)
        var endTime = DateParser.parseDate(reequest.endTime)
        const request = new ReservationRequest(reequest.userEmail, reequest.roomId, startTime, endTime)
        reservationService.deleteReservation(request)
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
            <Reservation @remove="remove" :date="item.date" :building-name="item.buildingName" :room-name="item.roomName" :start-time="item.startTime" :end-time="item.endTime" :room-id="item.roomId" :delete="true"/>
        </div>
    </div>
</template>

<style scoped>
</style>