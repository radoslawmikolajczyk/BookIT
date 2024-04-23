<script setup lang="ts">
    import Slider from '../components/Slider.vue'
    import { WritableComputedRef, onBeforeMount, ref } from 'vue'
    import { computed } from 'vue';
    import { DateParser } from '../utils/dateParser';
    import  stateManager from '../composables/stateManager';
    import { RoomRequest } from '../model/RoomRequest';
    import SliderNew from '../components/SliderNew.vue'

    const emit = defineEmits(['filter'])
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
        } 
    })

    function daysInMonth(month:number, year:number) {
        return new Date(year, month, 0).getDate();
    }

    const building: WritableComputedRef<string> = computed({
        set: (val) => {
            roomsRequest.value?.setBuildingName(val)
            //emit("filter")
        },
        get: () => {
            return ""
        }
    })

    const floor: WritableComputedRef<number> = computed({
        set: (val) => {
            roomsRequest.value?.setFloorNumber(val)
            //emit("filter")
        },
        get: () => {
            return 0
        }
    })

    const dateMax: WritableComputedRef<string> = computed({
        set: (val) => {
            roomsRequest.value?.setDateMax(val)
            //emit("filter")
        },
        get: () => {
            return ""
        }
    })

    const dateMin: WritableComputedRef<string> = computed({
        set: (val) => {
            roomsRequest.value?.setDateMin(val)
            //emit("filter")
        },
        get: () => {
            return ""
        }
    })

    const timeMax: WritableComputedRef<string> = computed({
        set: (val) => {
            roomsRequest.value?.setTimeMax(val)
            //emit("filter")
        },
        get: () => {
            return ""
        }
    })

    const timeMin: WritableComputedRef<string> = computed({
        set: (val) => {
            roomsRequest.value?.setTimeMin(val)
            //emit("filter")
        },
        get: () => {
            return ""
        }
    })

</script>

<template>
    <div class="container">
        <div class="filter">
            <select v-model="building">
                <option v-for="option in buildingNameOptions" :value="option">{{ option }}</option>
            </select>
        </div>
        <div class="filter">
            <select v-model="floor">
                <option v-for="option in floorsOptions" :value="option">{{ option }}</option>
            </select>
        </div>

        <div class="filter">
            <p>hour</p>
            <Slider :min="8" :max="20" v-model:min-value="timeMin" v-model:max-value="timeMax"/>
        </div>
        <div class="filter">
            <p>day</p>
            <Slider :min="8" :max="20" v-model:min-value="dateMin" v-model:max-value="dateMax"/>
            <SliderNew :min="0" :max="100"></SliderNew>
        </div>
    </div>
</template>

<style scoped>
    .container {
        overflow: auto;
        /* width: 100%; */
    }

    .filter {
        /* text-align:center; */
         padding: 20px 20px 20px 20px; 
        /* border: 1px solid rgb(0,0,0); */
        /* width:20px; */
        /* height:20px;               */
        /* float: left; */
    }

</style>