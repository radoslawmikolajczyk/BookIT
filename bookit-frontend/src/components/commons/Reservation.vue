<script setup lang="ts">
import { Reservation } from '../../model/Reservation.ts';
import { ReservationRequest } from '../../model/ReservationRequest.ts';
import ConfirmationDialog from './ConfirmationDialog.vue';
import { onMounted, ref } from 'vue'
import { RoomService } from '../../services/RoomService.ts';

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
</script>

<template>
    <div class="reservation-container">
        <div class="date">
            <div> {{ props.reservation.endTime }}</div>
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
                <div class="value">{{ props.reservation.startTime }} - {{ props.reservation.endTime }}</div>
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
.button-container {
    display: flex;
    justify-content: center; /* Wyśrodkowanie przycisku w poziomie */
    align-items: center; /* Wyśrodkowanie przycisku w pionie */
    margin-top: 10px; /* Dodatkowy margines na górę */
    height: 100%; /* Ustawienie wysokości, aby przycisk był wyśrodkowany w pionie */
}

.delete-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #dc3545; /* Czerwony kolor tła */
    color: #fff; /* Biały kolor tekstu */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

  .delete-button:hover {
    filter: brightness(90%); /* Zmniejszenie jasności przycisku po najechaniu na niego */
  }

.reservation-container {
    padding: 10px;
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
    flex-wrap: wrap;
}

.common-info {
    flex: 1 1 45%; /* Ustawienie szerokości na 45% szerokości kontenera */
    padding: 10px;
    background-color: #dbe5f1; /* Średni niebieski kolor dla pól informacyjnych */
    border-radius: 5px;
    margin-right: 10px;
    margin-bottom: 10px;
}

.description {
    flex: 1 1 100%; /* Zajmuje pełną szerokość kontenera */
    padding: 10px;
    background-color: #dbe5f1; /* Średni niebieski kolor dla pola opisu */
    border-radius: 5px;
    margin-bottom: 10px;
}

.image {
    flex: 1 1 100%; /* Zajmuje pełną szerokość kontenera */
    text-align: center; /* Wyśrodkowanie obrazka */
    margin-bottom: 10px;
}

.image img {
    max-width: 100%;
    height: auto;
}

.label {
    font-weight: bold;
}

.value {
    margin-top: 5px;
}
</style>