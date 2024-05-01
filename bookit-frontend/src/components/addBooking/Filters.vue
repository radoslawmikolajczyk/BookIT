<script setup lang="ts">
    import { WritableComputedRef, onBeforeMount, ref, watch } from 'vue'
    import { computed } from 'vue';
    import  stateManager from '../../composables/stateManager';
    import { RoomRequest } from '../../model/RoomRequest';
    import { DateParser } from '../../utils/dateParser';

    var buildingNameOptions:[string]
    var floorsOptions:[string]

    const { roomsFloorsNumbers, roomsBuldings, roomsRequest } = stateManager()

    const [buildingName] = defineModel('buildingName', {
        set(value: string) {
            if(roomsRequest.value != null) {
                roomsRequest.value.buildingName = value
            }
        }
    })

    const [floor] = defineModel('floor', {
        set(value: number) {
            if(roomsRequest.value != null) {
                roomsRequest.value.floorNumber = value
            }
        }
    })

    const [dateMin] = defineModel('dateMin',{
        set(value: string) {
            if(roomsRequest.value != null) {
                roomsRequest.value.startTime = value.split(/T|Z/)[0]+ " " + value.split(/T|Z/)[1]
            }
        }
    })

    const [dateMax] = defineModel('dateMax',{
        set(value: string) {
            if(roomsRequest.value != null) {
                roomsRequest.value.endTime = value.split(/T|Z/)[0]+ " " + value.split(/T|Z/)[1]
            }
        }
    })

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

</script>

<template>
    <div class="container">
        <div class="filter">
            <label for="building">Building</label>
            <select id="building" v-model="buildingName">
                <option v-for="option in buildingNameOptions" :value="option">{{ option }}</option>
            </select>
        </div>
        <div class="filter">
            <label for="floor">Floor</label>
            <select id="floor" v-model="floor">
                <option v-for="option in floorsOptions" :value="option">{{ option }}</option>
            </select>
        </div>

        <div class="filter">
            <label for="dateMin">Date min</label>
            <input type="datetime-local" id="dateMin" v-model="dateMin" />
        </div>

        <div class="filter">
            <label for="dateMax">Date max</label>
            <input type="datetime-local" id="dateMax" v-model="dateMax"/>           
        </div>
    </div>
</template>

<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        font-size: 30px;
        color: green;
        padding: 5px;
        overflow: auto;
    }
    
    .main div {
        border: 2px solid red;
        margin: 10px 20px;
        width: 100px;
    }

    .filter {
         padding: 20px 20px 20px 20px; 
    }

</style>