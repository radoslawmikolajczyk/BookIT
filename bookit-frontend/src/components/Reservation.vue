<script setup lang="ts">
import ConfirmationDialog from './ConfirmationDialog.vue';
import { ref } from 'vue' 


    interface Props {
        date: string,
        buildingName : string,
        roomName: number,
        startTime: string,
        endTime: string,
        delete: boolean
    }

    interface FunTrigger {
        functionToTrigger: () => void
    }

    const props = defineProps<Props>()
    const confirmationVisible = ref(false)
    const functionToInvoke = ref<FunTrigger | null>(null)

    function showConfirmation(fun: () => void) {
        confirmationVisible.value = true
        functionToInvoke.value = fun
    }

    function hideConfirmation() {
        confirmationVisible.value = false
        functionToInvoke.value = null
    }

    function reserve() {
        console.log("reserve")
    }

    function remove() {
        console.log("remove")
    }

    function handleEmit(decision: boolean) {
        if(confirm){
            functionToInvoke.value()
        } else {
            
        }
    }

</script>

<template>
    <div class="container">
        <div class="date">
            <div> {{ props.date }}</div>
        </div>
        <div class="info">
            <div>{{ props.buildingName }}</div>
            <div>{{ props.roomName }}</div>
            <div>{{ props.startTime }} - {{ props.endTime }}</div>
            <div v-if="delete">
                <button v-if="!confirmationVisible" @click="showConfirmation(remove)">Delete</button>
                <ConfirmationDialog @event="handleEmit" v-if="confirmationVisible"></ConfirmationDialog>
            </div>
            <div v-else>
                <button v-if="!confirmationVisible" @click="showConfirmation(reserve)">Reserve</button>
                <ConfirmationDialog @event="handleEmit" v-if="confirmationVisible"></ConfirmationDialog>
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