<script setup lang="ts">
import { RequestResponse } from '../model/RequestResponse';
import { Reservation } from '../model/Reservation';
import { ReservationRequest } from '../model/ReservationRequest';
import ConfirmationDialog from './ConfirmationDialog.vue';
import { ref } from 'vue'

    const emit = defineEmits(['remove','reserve'])

    interface Props {
        reservation: Reservation,
        delete: boolean
    }

    interface FuncTrigger {
        functionToTrigger: () => void
    }

    const props = defineProps<Props>()
    const confirmationVisible = ref(false)
    const functionToInvoke = ref<FuncTrigger | null>(null)

    function showConfirmation(fun: () => void) {
        confirmationVisible.value = true
        functionToInvoke.value = { functionToTrigger: fun }
    }

    function hideConfirmation() {
        confirmationVisible.value = false
        functionToInvoke.value = null
    }

    function reserve() {
        emit("reserve")
    }

    function remove() {
        emit("remove", new ReservationRequest(props.reservation.user.email, props.reservation.room.id, props.reservation.startTime, props.reservation.endTime))
    }

    function handleDecision(decision: boolean) {
        if(decision){
           functionToInvoke.value?.functionToTrigger()
        } else {
            hideConfirmation()
        }
    }

</script>

<template>
    <div class="container">
        <div class="date">
            <div> {{ props.reservation.endTime }}</div>
        </div>
        <div class="info">
            <div>{{ props.reservation.room.buildingName }}</div>
            <div>{{ props.reservation.room.roomName }}</div>
            <div>{{ props.reservation.endTime }} - {{ props.reservation.endTime }}</div>
            <div v-if="delete">
                <button v-if="!confirmationVisible" @click="showConfirmation(remove)">Delete</button>
                <ConfirmationDialog @decision="handleDecision" v-if="confirmationVisible"></ConfirmationDialog>
            </div>
            <div v-else>
                <button v-if="!confirmationVisible" @click="showConfirmation(reserve)">Reserve</button>
                <ConfirmationDialog @decision="handleDecision" v-if="confirmationVisible"></ConfirmationDialog>
            </div>
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

    /* .nav-content {
    display: flex;
    justify-content: space-between;
    padding: 10px 30px;
    align-items: center;
    }
    
    .nav-items {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    li {

    padding: 0 10px;
    }
    }

    i {
    display: none;
    }
    
    @media screen and (max-width: 768px) {

    .nav-menu {
    padding-top: 10px;
    position: absolute;
    width: 100%;
    }

    .open-menu {
    opacity: 1;
    height: 105px;
    }

    .closed-menu {
    opacity: 0;
    height: 0;
    padding: 0;
    }

    .nav-content {
    flex-direction: column;
    z-index: 100;
    position: relative;
    transition: all 0.2s ease-out;
    }

    .nav-items {
    flex-direction: column;
    }

    i {
    display: block;
    text-align: right;
    padding: 0 10px 10px 0;
    } */
</style>