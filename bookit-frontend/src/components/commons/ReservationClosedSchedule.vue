<script setup lang="ts">
import { Reservation } from '../../model/Reservation.ts';
import { onMounted, defineProps } from 'vue'
import { RoomService } from '../../services/RoomService.ts';

interface Props {
    reservation: Reservation
}

const props = defineProps<Props>()

</script>

<template>
    <div class="reservation-container">
        <div class="info">
            <div class="room-floor">
                <div class="label">Floor Number:</div>
                <div class="value">{{ props.reservation.room.floorNumber }}</div>
            </div>
            <div class="room-name">
                <div class="label">Room Name:</div>
                <div class="value">{{ props.reservation.room.roomName }}</div>
            </div>
            <div class="reservation-time">
                <div class="label">Reservation Time:</div>
                <div class="value">{{ props.reservation.startTime }} - {{ props.reservation.endTime }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.reservation-container {
    padding: 10px;
    display: flex;
    flex-direction: column;
    background-color: #f0f5ff; /* Niebieski kolor tła */
    border-radius: 5px;
    margin-bottom: 20px;
}

.date {
    background-color: #c9d6ea; /* Jasny niebieski kolor dla pola daty */
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
}

.info {
    display: flex;
    justify-content: space-between;
}

.room-floor,
.room-name,
.reservation-time {
    flex: 1;
    padding: 10px;
    background-color: #dbe5f1; /* Średni niebieski kolor dla pól informacyjnych */
    border-radius: 5px;
    margin-right: 10px;
}

.reservation-time {
    margin-right: 0;
}

.label {
    font-weight: bold;
}

.value {
    margin-top: 5px;
}
</style>
