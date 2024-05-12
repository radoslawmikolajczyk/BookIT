<script setup lang="ts">
import { Reservation } from '../../model/Reservation.ts';
import { ReservationRequest } from '../../model/ReservationRequest.ts';
import ConfirmationDialog from './ConfirmationDialog.vue';
import { onMounted, ref } from 'vue'
import { RoomService } from '../../services/RoomService.ts';
import { DateParser } from '../../utils/dateParser.ts';

interface Props {
    reservation: Reservation,
    delete: boolean
}

interface FuncTrigger {
    functionToTrigger: () => void
}

const emit = defineEmits(['remove', 'reserve'])
const props = defineProps<Props>()
const confirmationVisible = ref(false)
const functionToInvoke = ref<FuncTrigger | null>(null)
const roomService = new RoomService()

onMounted(() => {
    roomService.getAllRooms()
        .then(result => {
            var rooms = result.rooms.filter((room) => { return room.id == props.reservation.room.id })
            if (rooms.length > 0) {
                props.reservation.room = rooms[0]
            }
        })
})

function showConfirmation(fun: () => void) {
    confirmationVisible.value = true
    functionToInvoke.value = { functionToTrigger: fun }
}

function hideConfirmation() {
    confirmationVisible.value = false
    functionToInvoke.value = null
}

function reserve() {
    emit("reserve", new ReservationRequest(props.reservation.user.email, props.reservation.room.id, props.reservation.startTime, props.reservation.endTime))
}

function remove() {
    emit("remove", new ReservationRequest(props.reservation.user.email, props.reservation.room.id, props.reservation.startTime, props.reservation.endTime))
}

function handleDecision(decision: boolean) {
    if (decision) {
        functionToInvoke.value?.functionToTrigger()
    } else {
        hideConfirmation()
    }
}

function getOnlyDate(date: string) {
    return DateParser.getOnlyDate(date)
}

function getOnlyTime(date: string) {
    return DateParser.getOnlyTime(date)
}

</script>

<template>
    <div class="reservation-container">
        <div class="date">
            <div class="label">Date:</div>
            <div class="value">{{ getOnlyDate(props.reservation.endTime) }}</div>
        </div>
        <div class="info">
            <div class="common-info">
                <div class="label">Building Name:</div>
                <div class="value">{{ props.reservation.room.buildingName }}</div>
            </div>
            <div class="common-info">
                <div class="label">Floor Number:</div>
                <div class="value">{{ props.reservation.room.floorNumber }}</div>
            </div>
            <div class="common-info">
                <div class="label">Room Name:</div>
                <div class="value">{{ props.reservation.room.roomName }}</div>
            </div>
            <div class="common-info">
                <div class="label">Reservation Time:</div>
                <div class="value">{{ getOnlyTime(props.reservation.startTime) }} - {{ getOnlyTime(props.reservation.endTime) }}</div>
            </div>
            <div class="description">
                <div class="label">Room Description:</div>
                <div class="value">{{ props.reservation.room.description }}</div>
            </div>
            <div class="image">
                <img :src="props.reservation.room.imageUrl" alt="Room Image">
            </div>
            <div v-if="props.delete" class="button-container">
                <button
                    v-if="!confirmationVisible"
                    @click="showConfirmation(remove)"
                    class="delete-button">
                    Delete
                </button>
                <ConfirmationDialog @decision="handleDecision" v-else></ConfirmationDialog>
            </div>
        </div>
    </div>
</template>

<style scoped>
.reservation-container {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #b3e0ff; /* Light blue background */
    border-radius: 8px; /* Rounded corners for a cleaner look */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Adds depth with a subtle shadow */
    margin-bottom: 20px; /* Space between this and any subsequent elements */
}

.date, .common-info, .description, .image {
    background-color: #e0efff; /* A lighter shade of blue for internal components */
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px; /* Consistent spacing between sections */
}

.info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; /* Ensures that components within this flex container are spaced out nicely */
}

.common-info {
    flex: 1 1 45%; /* Flex-basis at 45% allows for two items per row on wider screens */
    margin-bottom: 10px; /* Vertical spacing between rows */
}

.image {
    flex: 1 1 50%; /* Takes full width of the container to stand out */
    text-align: center; /* Centers content within description and image blocks */
}

.description {
    flex: 1 1 45%; /* Takes full width of the container to stand out */
    text-align: center; /* Centers content within description and image blocks */
}

.image img {
    max-width: 100%;
    height: auto;
    border-radius: 5px; /* Rounded corners for images */
}

.label {
    font-weight: bold; /* Makes labels bold */
}

.value {
    margin-top: 5px; /* Spacing above value to separate it from label */
}

.button-container {
    display: flex;
    justify-content: center; /* Centers the button horizontally */
    align-items: center; /* Centers the button vertically */
    padding: 10px 0;
}

.delete-button {
    background-color: #dc3545; /* Red background for deletion to draw attention */
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.delete-button:hover {
    background-color: #c82333; /* Slightly darker red on hover for interactive feedback */
}
</style>
