<script setup lang="ts">
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { ref, watch } from "vue";
import { ReservationService } from "../../services/ReservationService.ts"
import { ReservationRequest } from "../../model/ReservationRequest.ts";
import ScheduleDateIndicator from "../../components/schedule/ScheduleDateIndicator.vue"
import ScheduleDateSelector from "../../components/schedule/ScheduleDateSelector.vue"
import ScheduleTimeline from "./ScheduleTimeline.vue";
import stateManager from "../../composables/stateManager.ts";
import Filters from "../bookings/Filters.vue";
import { DateParser } from "../../utils/dateParser.ts";
import Reservation from "../commons/Reservation.vue";
import GroupAssigned from "../groups/GroupAssigned.vue";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

const { reservationsSchedule, 
  reservationsScheduleBackup, 
  dateSelected, 
  roomNumberSelected, 
  floorSelected, 
  buildingSelected, 
  rooms, 
  userReservationsChecked,
  authorizedUser,
  reservationTimeMax,
  reservationTimeMin,
displayedReservation } = stateManager()
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

function filterSchedule() {

  reservationsSchedule.value = reservationsScheduleBackup.value

  if(reservationTimeMax.value != "") {
    reservationsSchedule.value = reservationsSchedule.value?.filter((reservation) => {
    return new Date ('1/1/1999 ' + DateParser.getOnlyTime(reservation.endTime)) <= new Date ('1/1/1999 ' + reservationTimeMax.value) 
  })
  }

  if(reservationTimeMin.value != "") {
    reservationsSchedule.value = reservationsSchedule.value?.filter((reservation) => {
    return new Date ('1/1/1999 ' + DateParser.getOnlyTime(reservation.startTime)) >= new Date ('1/1/1999 ' + reservationTimeMin.value) 
  })
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
      filterSchedule()
    } else {
      console.log("Error occured during fetching data from server.")
    }
  })
}

function selectDate(newSelectedDate) {
  console.log(newSelectedDate)
  dateSelected.value = newSelectedDate;
  getReservations(dateSelected.value.format("YYYY-MM-DD"))
}

function reserve() {
    const startTime = DateParser.parseDate(reservationTimeMax.value)
    const endTime = DateParser.parseDate(reservationTimeMin.value)
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

function isDeletePossible() : Boolean {
  return displayedReservation.value?.user.id == authorizedUser.value?.id
}

</script>

<template>
  <div v-if="authorizedUser?.group" class="schedule-day">
    <div class="schedule-sidebar">
      <div>
        <ScheduleDateIndicator/>
        <ScheduleDateSelector @dateSelected="selectDate" />
      </div>
      <div class="details-section">
        <Filters @makeReservation="reserve"></Filters>
      </div>
    </div>
    <div class="schedule-content">
      <ScheduleTimeline/>
    </div>
    <div>
      <Reservation v-if="displayedReservation" :reservation="displayedReservation" :delete="isDeletePossible()"></Reservation>
    </div>
  </div>
  <div v-else>
    <GroupAssigned></GroupAssigned>
  </div>
</template>
  
<style scoped>
.details-section {
  display: flex;
  flex-direction: column;
  background-color: rgb(201, 179, 179);
  height: 100px;
  width: 100%
}

.schedule-day {
  display: flex;
  flex-direction: column;
  background-color: var(--grey-200);
  border: solid 1px var(--grey-300);
  height: 80vh;
}

.schedule-sidebar {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.schedule-content {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  padding: 20px;
}

</style>