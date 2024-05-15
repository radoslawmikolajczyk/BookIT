<script setup lang="ts">
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { ref, watch } from "vue";
import { ReservationService } from "../../services/ReservationService.ts"
import { ReservationRequest } from "../../model/ReservationRequest.ts";
import ScheduleDateIndicator from "../../components/schedule/ScheduleDateIndicator.vue"
import ScheduleDateSelector from "../../components/schedule/ScheduleDateSelector.vue"
import stateManager from "../../composables/stateManager.ts";
import Filters from "./Filters.vue";
import { DateParser } from "../../utils/dateParser.ts";
import Reservation from "../commons/Reservation.vue";
import GroupAssigned from "../groups/GroupAssigned.vue";
import ReservationClosed from "../commons/ReservationClosed.vue";
import TableRow from "../commons/TableRow.vue";
import Message from "./Message.vue"
import { Reservation as ReservationModel } from "../../model/Reservation.ts";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

const { reservationsSchedule, 
  reservationsScheduleBackup, 
  dateSelected, 
  roomNumberSelected, 
  floorSelected, 
  buildingSelected, 
  rooms,
  roomsBackup, 
  userReservationsChecked,
  authorizedUser,
  reservationTimeMax,
  reservationTimeMin,
  displayedReservation,
  isCreateReservationButtonBlocked,
  filterMessage,
  assignedGroup,
  roomsNumbers,
  roomsFloorsNumbers,
  roomsBuldings,
   } = stateManager()
const reservationService = new ReservationService()

watch(roomNumberSelected, () => {
  filterSchedule()
  }
)

watch(floorSelected, () => {
  filterSchedule()
  }
)

watch(buildingSelected, () => {
  filterSchedule()
  }
)

watch(userReservationsChecked, () => {
  filterSchedule()
  }
)

watch(reservationTimeMax, () => {
  filterSchedule()
  }
)

watch(reservationTimeMin, () => {
  filterSchedule()
  }
)

function isWithinTimeRange(time, minTime, maxTime) {
  return time >= minTime && time <= maxTime;
}

function filterSchedule() {
  filterMessage.value = ""
  reservationsSchedule.value = reservationsScheduleBackup.value
  rooms.value = roomsBackup.value
  
    if (reservationTimeMax.value !== "" && reservationTimeMin.value !== "") {
    const minTime = new Date('1/1/1999 ' + reservationTimeMin.value);
    const maxTime = new Date('1/1/1999 ' + reservationTimeMax.value);

    if (minTime >= maxTime) {
      filterMessage.value = "StartTime should be less than TimeMax!";
    } else {
      reservationsSchedule.value = reservationsSchedule.value?.filter((reservation) => {
        const startTime = new Date('1/1/1999 ' + DateParser.getOnlyTime(reservation.startTime));
        const endTime = new Date('1/1/1999 ' + DateParser.getOnlyTime(reservation.endTime));
        
        const isStartWithinRange = isWithinTimeRange(startTime, minTime, maxTime);
        const isEndWithinRange = isWithinTimeRange(endTime, minTime, maxTime);

        return isStartWithinRange || isEndWithinRange || (startTime < minTime && endTime > maxTime);
      });
    }
  }

  if(userReservationsChecked.value) {
    reservationsSchedule.value = reservationsSchedule.value?.filter((reservation) => {
    return reservation.user.id == authorizedUser.value?.id
  })
  }

  if(buildingSelected.value != "") {
    reservationsSchedule.value = reservationsSchedule.value?.filter((reservation) => {
    return reservation.room.buildingName == buildingSelected.value
  })
  }

  if(floorSelected.value != 0) {
    reservationsSchedule.value = reservationsSchedule.value?.filter((reservation) => {
    return reservation.room.floorNumber == floorSelected.value      
  })
  }

  if(roomNumberSelected.value != "") {
    reservationsSchedule.value = reservationsSchedule.value?.filter((reservation) => {
    return reservation.room.roomName == roomNumberSelected.value
  })
  }

  isCreateReservationButtonBlocked.value = !checkIfReservationPossible()
}

function checkIfReservationPossible() : boolean {
  console.log((dateSelected.value.format("YYYY-MM-DD ") + reservationTimeMin.value) )
  console.log(dayjs().format("YYYY-MM-DD HH:mm"))

  if( (dateSelected.value.format("YYYY-MM-DD ") + reservationTimeMin.value) < dayjs().format("YYYY-MM-DD HH:mm") ){
    filterMessage.value = "Not possible to make a reservation for the past!"
    return false
  }

  if(reservationsSchedule.value?.length ?? 0 > 0){ return false }
  if(buildingSelected.value == ""){ return false }
  if(roomNumberSelected.value == ""){ return false }
  if(floorSelected.value == 0){ return false }
  if(reservationTimeMax.value == ""){ return false }
  if(reservationTimeMin.value == ""){ return false }
  if(reservationTimeMin.value >= reservationTimeMax.value){ return false}

  filterMessage.value = "Slot is free. You are able to make a reservation."
  return true
}

function getReservations(date: string) {
  var request = new ReservationRequest("",1,date + " 00:00",date + " 23:59")

  reservationService.getAllReservationsFromPeriod(request)
  .then((result) => {
    if(result.isSuccess) {
      result.reservations?.map((reservation) => { 
        var room = rooms.value?.filter((room) => { return room.id == reservation.room.id })
        if(room && room.length > 0) { reservation.room = room[0] }
        return reservation
      })
      reservationsSchedule.value = result.reservations
      reservationsScheduleBackup.value = result.reservations
      roomsBackup.value = rooms.value
      filterSchedule()
    } else {
      console.log("Error occured during fetching data from server.")
    }
  })
}

function selectDate(newSelectedDate) {
  dateSelected.value = newSelectedDate;
  getReservations(dateSelected.value.format("YYYY-MM-DD"))
}

function reserve() {
    const startTime = dateSelected.value.format("YYYY-MM-DD ") + reservationTimeMin.value
    const endTime = dateSelected.value.format("YYYY-MM-DD ") + reservationTimeMax.value
    const token = localStorage.getItem('token') ?? ""
    const room = rooms.value?.filter((room) => { return room.buildingName == buildingSelected.value 
                                                  && room.floorNumber == floorSelected.value 
                                                  && room.roomName == roomNumberSelected.value })

    if(room && room.length > 0) {
      reservationService.createReservation(new ReservationRequest(token, room[0].id, startTime, endTime))
      .then( result => {
          console.log(result)
      })
    }
}

function isDeletePossible(reservation: ReservationModel) : Boolean {
  return reservation?.user.id == authorizedUser.value?.id
}

function remove(request: ReservationRequest) {
    var startTime = DateParser.parseDate(request.startTime)
    var endTime = DateParser.parseDate(request.endTime)
    const token = localStorage.getItem('token') ?? ""

    reservationService.deleteReservation(new ReservationRequest(token, request.roomId, startTime, endTime))
        .then( result => {
            
        })
}

</script>

<template>
  <div v-if="assignedGroup" class="schedule-day">
    <div class="schedule-sidebar">
      <div>
        <ScheduleDateIndicator/>
        <ScheduleDateSelector @dateSelected="selectDate" />
      </div>
      <div class="filters">
        <Filters @makeReservation="reserve"></Filters>
      </div>
      <div v-if="filterMessage.length != 0">
          <Message></Message>
      </div>
    </div>
    <div class="schedule-content">
      <TableRow v-for="item in reservationsSchedule" :key="item.id">
        <template #closedContent>
            <ReservationClosed :reservation="item" />
        </template>
        
        <template #openContent>
          <Reservation @remove="remove" :reservation="item" :delete="isDeletePossible(item)"/>
        </template>

        <template #arrow>
            <p>▼</p>
        </template>
      </TableRow>
    </div>
  </div>
  <div v-else>
    <GroupAssigned></GroupAssigned>
  </div>
</template>
  
<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  background-color: rgb(201, 179, 179);
  width: 100%
}

.schedule-day {
  display: flex;
  flex-direction: column;
}

.schedule-sidebar {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.schedule-content {
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: scroll;
}

</style>