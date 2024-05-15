<template>
    <div>
        <RoomsFilters></RoomsFilters>
    </div>
    <div class="room-list">
        <TableRow v-for="item in rooms" :key="item.id">
            <template #closedContent>
                <RoomClosed :room="item" />
            </template>
            
            <template #openContent>
                <Room :room="item"/>
            </template>

            <template #arrow>
                <p>▼</p>
            </template>
        </TableRow>
    </div>
</template>

<script setup>

import RoomsFilters from "./RoomsFilters.vue"
import stateManager from "../../composables/stateManager";
import RoomClosed from "./RoomClosed.vue"
import Room from "./Room.vue"
import TableRow from "../../components/commons/TableRow.vue";;
import { watch } from "vue";

const {
    roomNumberSelectedRoom,
    floorSelectedRoom,
    buildingSelectedRoom
} = stateManager()

const { rooms,roomsBackup } = stateManager()

watch(roomNumberSelectedRoom, () => {
  filter()
  }
)

watch(floorSelectedRoom, () => {
  filter()
  }
)

watch(buildingSelectedRoom, () => {
  filter()
  }
)

function filter() {
    rooms.value = roomsBackup.value

    if(roomNumberSelectedRoom.value != "") {
        rooms.value = rooms.value?.filter((room) => {
    return room.roomName == roomNumberSelectedRoom.value
  })
  }

  if(buildingSelectedRoom.value != "") {
    rooms.value = rooms.value?.filter((room) => {
    return room.buildingName == buildingSelectedRoom.value
  })
  }

  if(floorSelectedRoom.value != 0) {
    rooms.value = rooms.value?.filter((room) => {
    return room.floorNumber == floorSelectedRoom.value      
  })
  }
}

</script>

<style scoped>
.room-list {
    max-height: 70vh; 
    overflow-y: scroll;
}

</style>