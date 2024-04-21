<script setup lang="ts">
    import Slider from '../components/Slider.vue'
    import { onBeforeMount, ref } from 'vue'
    import { computed } from 'vue';
    import { DateParser } from '../utils/dateParser';
    import { RoomService } from '../services/RoomService';
    import  stateManager from '../composables/stateManager';
import { RoomRequest } from '../model/RoomRequest';

    const sliderMin = ref(65);
    const sliderMax = ref(150);
    const selectedBuilding = ref("")
    const selectedFloor = ref(0)
    const roomService = new RoomService()
    var buildingNameOptions:[string]
    var floorsOptions:[string]

    const { roomsFloorsNumbers, roomsBuldings, roomsRequest } = stateManager()

    onBeforeMount(() => {
        buildingNameOptions = [""]
        floorsOptions = [""]

        roomsFloorsNumbers.value?.forEach((value: number) => {
            floorsOptions.push(value+"")
        });

        roomsBuldings.value?.forEach((value: string) => {
            buildingNameOptions.push(value)
        });

        if(roomsRequest.value == null) {
            roomsRequest.value = new RoomRequest("","","",1)
            console.log("123123")
        }
    })



    const dateMax = computed({
        set: (val) => {
            // var parsed = DateParser.setOnlyDate(val)
            // if(store.state.roomRequest != null){
            //     store.state.roomRequest.endTime = val
            // }
        },
        get: () => {}
    })

    const dateMin = computed({
        set: (val) => {
           
        },
        get: () => {}
    })

    const timeMax = computed({
        set: (val) => {
            
        },
        get: () => {}
    })

    const timeMin = computed({
        set: (val) => {
            
        },
        get: () => {}
    })

    function getMaxDaysForSelectedMonth() : number {
        return 0
    }

</script>

<template>
    <div>
        <div class="building">
            <select v-model="selectedBuilding">
                <option v-for="option in buildingNameOptions" :value="option">{{ option }}</option>
            </select>
        </div>
        <div class="floor">
            <select v-model="selectedFloor">
                <option v-for="option in floorsOptions" :value="option">{{ option }}</option>
            </select>
        </div>

        <div class="hour">
            <Slider
                :min="8"
                :max="20"
                v-model:min-value="sliderMin"
                v-model:max-value="sliderMax"
            />
        </div>
        <div class="date">
            <Slider
                :min="8"
                :max="20"
                v-model:min-value="sliderMin"
                v-model:max-value="sliderMax"
            />
        </div>
    </div>
</template>

<style scoped>
    
</style>