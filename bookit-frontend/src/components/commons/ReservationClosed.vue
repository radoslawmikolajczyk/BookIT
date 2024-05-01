<script setup lang="ts">
import { Reservation } from '../../model/Reservation.ts';
import { onMounted,ref } from 'vue'
import { RoomService } from '../../services/RoomService.ts';

    interface Props {
        reservation: Reservation
    }

    const props = defineProps<Props>()
    const roomService = new RoomService()

    onMounted (() => {
        roomService.getAllRooms()
            .then( result => {
                var rooms = result.rooms.filter( (room) => { return room.id == props.reservation.room.id})
                if (rooms.length > 0) {
                    props.reservation.room = rooms[0]
                }
            })
    })

</script>

<template>
    <div class="container">
        <div class="date">
            <div> {{ props.reservation.endTime }}</div>
        </div>
        <div class="info">
            <div>{{ props.reservation.room.buildingName }}</div>
            <div>{{ props.reservation.room.floorNumber }}</div>
            <div>{{ props.reservation.room.roomName }}</div>
            <div>{{ props.reservation.startTime }} - {{ props.reservation.endTime }}</div>
        </div>
    </div>
</template>

<style scoped>
    .container {
        padding: 10px 30px;
    }

    .date {
        background-color: rgb(238, 229, 229);
        display: flex;
        justify-content: space-between;
        padding: 10px 30px;
        align-items: center;
    }

    .info {
        background-color: rgb(255, 255, 255);
        display: flex;
        justify-content: space-between;
        padding: 10px 30px;
        align-items: center;
    }
</style>