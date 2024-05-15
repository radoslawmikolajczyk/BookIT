<script setup lang="ts">
import { Reservation } from '../../model/Reservation.ts';
import { onMounted, defineProps } from 'vue'
import { RoomService } from '../../services/RoomService.ts';
import { DateParser } from '../../utils/dateParser.ts';
import { Room } from '../../model/Room.ts';

interface Props {
    room: Room
}

const props = defineProps<Props>()
const roomService = new RoomService()

</script>

<template>
    <div class="reservation-container">
        <section class="info">
            <div class="room-building">
                <h4 class="label">Building Name:</h4>
                <p class="value">{{ props.room.buildingName }}</p>
            </div>
            <div class="room-floor">
                <h4 class="label">Floor Number:</h4>
                <p class="value">{{ props.room.floorNumber }}</p>
            </div>
            <div class="room-name">
                <h4 class="label">Room Name:</h4>
                <p class="value">{{ props.room.roomName }}</p>
            </div>
        </section>
    </div>
</template>


<style scoped>
.reservation-container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    background-color: #b3e0ff; /* Light blue background */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
    margin-bottom: 20px;
}

.date, .info > div {
    background-color: #e0efff; /* Slightly lighter blue for contrast */
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
}

.info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.room-building, .room-floor, .room-name, .reservation-time {
    flex: 1 1 200px; /* Responsive width with minimum of 200px */
    padding: 10px;
    margin-right: 10px;
    background-color: #dbe5f1; /* Consistent medium blue for information boxes */
    border-radius: 5px;
}

.reservation-time {
    margin-right: 0; /* No margin on the right for the last item */
}

.label {
    font-weight: bold;
    color: #003366; /* Darker blue for better readability */
}

.value {
    margin-top: 5px;
}

@media (max-width: 768px) {
    .info {
        flex-direction: column;
    }

    .room-building, .room-floor, .room-name, .reservation-time {
        margin-right: 0; /* Align all items in a single column on smaller screens */
        margin-bottom: 10px;
    }
}
</style>
