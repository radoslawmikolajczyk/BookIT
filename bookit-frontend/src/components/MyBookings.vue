<script setup lang="ts">
import Reservation from './Reservation.vue';
import { ReservationService } from '../services/ReservationService.ts'
import { reactive,ref, onMounted } from 'vue'
import { ReservationResponse } from '../model/ReservationResponse.ts';
import { RoomService } from '../services/RoomService.ts'
import { Room } from '../model/Room.ts';

    interface iReservation {
        date: string,
        buildingName: string,
        roomName: number,
        startTime: string,
        endTime: string
    }

    class iReservationImpl implements iReservation {
        date: string;
        buildingName: string;
        roomName: number;
        startTime: string;
        endTime: string;

        constructor(date: string, buildingName: string, roomName: number, startTime: string, endTime: string) {
            this.date = date
            this.buildingName = buildingName
            this.roomName = roomName
            this.startTime = startTime
            this.endTime = endTime
        }
    }

    const reservations = ref<[iReservation] | null>(null)
    var rooms = new Array<Room>()
    const reservationService = new ReservationService()
    const roomService = new RoomService()

    onMounted (() => {
        const email = localStorage.getItem('token');

        roomService.getAllRooms()
        .then( result => {
            rooms = result.rooms

            // for initialization purpose only
            reservations.value = [new iReservationImpl("","",1,"","")]
            reservations.value.pop()

            reservationService.getAllUserReservations(email ?? "")
            .then( result => {
                console.log(result.reservations)
                result.reservations.forEach((reservation) => {
                    var room = rooms.find((room) => {
                            return reservation.room.id == room.id
                        }
                    )
                    var r = new iReservationImpl(reservation.endTime, room?.buildingName ?? "", room?.floorNumber ?? 0, reservation.startTime, reservation.endTime)
                    reservations.value?.push(r)
                })
            })
        })
    })
    /**
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
    */
    // DODAĆ EMITA ABY PRZEKAZAC, ŻE CHCEMY USUWAC Z LISTY 
    /**
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
    */
</script>

<template>
    <h1>My Reservations</h1>
    <p>Know when and where you will be at University.</p>
    <div v-for="item in reservations">
        <Reservation :date="item.date" :building-name="item.buildingName" :room-name="item.roomName" :start-time="item.startTime" :end-time="item.endTime" :delete="true"/>
    </div>
</template>

<style scoped>
</style>