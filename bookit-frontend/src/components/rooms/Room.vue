<script setup lang="ts">
import { RoomService } from '../../services/RoomService.ts';
import { Room } from '../../model/Room.ts';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import stateManager from '../../composables/stateManager.ts';

const {
    roomNumberSelected,
    floorSelected,
    buildingSelected
} = stateManager()

const router = useRouter();

interface Props {
    room: Room,
}

interface FuncTrigger {
    functionToTrigger: () => void
}

const props = defineProps<Props>()
const functionToInvoke = ref<FuncTrigger | null>(null)

function showConfirmation(fun: () => void) {
    functionToInvoke.value = { functionToTrigger: fun }
}

function hideConfirmation() {
    functionToInvoke.value = null
}

function reserve() {
    buildingSelected.value = props.room.buildingName
    roomNumberSelected.value = props.room.roomName
    floorSelected.value = props.room.floorNumber
    router.push("/bookings/schedule")
    console.log("asfasf")
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
        <div class="info">
            <div class="common-info">
                <div class="label">Building Name:</div>
                <div class="value">{{ props.room.buildingName }}</div>
            </div>
            <div class="common-info">
                <div class="label">Floor Number:</div>
                <div class="value">{{ props.room.floorNumber }}</div>
            </div>
            <div class="common-info">
                <div class="label">Room Name:</div>
                <div class="value">{{ props.room.roomName }}</div>
            </div>
            <div class="description">
                <div class="label">Room Description:</div>
                <div class="value">{{ props.room.description }}</div>
            </div>
            <div class="image">
                <img :src="props.room.imageUrl" alt="Room Image">
            </div>
            <div class="button-container">
                <button 
                    @click="reserve()"
                    class="delete-button">
                    Reserve
                </button>
                
            </div>
        </div>
    </div>
</template>

<style scoped>
.reservation-container {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #b3e0ff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.date, .common-info, .description, .image {
    background-color: #e0efff;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
}

.info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.common-info {
    flex: 1 1 45%;
    margin-bottom: 10px;
}

.image {
    flex: 1 1 50%;
    text-align: center;
}

.description {
    flex: 1 1 45%;
    text-align: center;
}

.image img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
}

.label {
    font-weight: bold;
}

.value {
    margin-top: 5px;
}

.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
}

.delete-button {
    background-color: #27e416;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.delete-button:hover {
    background-color: #c82333;
}
</style>
