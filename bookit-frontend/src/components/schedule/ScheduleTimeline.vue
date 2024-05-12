<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { DateParser } from '../../utils/dateParser';
import { useElementSize } from '@vueuse/core'
import { ReservationRequest } from '../../model/ReservationRequest';
import { Reservation, Reservation as ReservationModel } from '../../model/Reservation.ts';
import TableRow from '../commons/TableRow.vue';
import { ReservationService } from '../../services/ReservationService.ts'
import ReservationClosedSchedule from '../commons/ReservationClosedSchedule.vue';
import { RoomService } from '../../services/RoomService.ts';
import stateManager from '../../composables/stateManager.ts';

const { reservationsSchedule, displayedReservation } = stateManager()
const componentKey = ref(0);
const times = ['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'];
const el = ref(null)
const { height } = useElementSize(el)
const reservationService = new ReservationService()
const roomService = new RoomService()
const reservationsBlock: { [id: string] : ReservationModel[] } = {};

function getReservationStyle(reservation: ReservationModel) {
  const parsedStartTime = DateParser.getOnlyTime(reservation.startTime);
  const parsedEndTime = DateParser.getOnlyTime(reservation.endTime);
  const startTimeHours = parseInt(parsedStartTime.split(':')[0]);
  const startTimeMinutes = parseInt(parsedStartTime.split(':')[1]);
  const endTimeHours = parseInt(parsedEndTime.split(':')[0]);
  const endTimeMinutes = parseInt(parsedEndTime.split(':')[1]);
  const reservationHeight = calculateReservationHeight(startTimeHours, startTimeMinutes, endTimeHours, endTimeMinutes);
  const topPosition = calculateTopPosition(startTimeHours, startTimeMinutes);
  return {
    height: `${reservationHeight}px`,
    top: `${topPosition}px`
  };
}

function remove(request: ReservationRequest) {
    var startTime = DateParser.parseDate(request.startTime)
    var endTime = DateParser.parseDate(request.endTime)
    const token = localStorage.getItem('token') ?? ""
    reservationService.deleteReservation(new ReservationRequest(token, request.roomId, startTime, endTime))
        .then( result => {
            //initCurrentReservations()
        })
}

function calculateReservationHeight(startHours: number, startMinutes: number, endHours: number, endMinutes: number) {
  const startSlot = (startHours - 8) ;
  const endSlot = (endHours - 8) ;
  const slotHeight = height.value / times.length;
  return (endSlot - startSlot) * slotHeight + (slotHeight / 60) * (endMinutes - startMinutes);
}

function calculateTopPosition(startHours: number, startMinutes: number) {
  const startSlot = (startHours - 8);
  const slotHeight = height.value / times.length;
  return startSlot * slotHeight + (slotHeight / 60) * startMinutes;
}

function createReservationBlockModel() {
  reservationsSchedule.value?.forEach((reservation) => {
    reservationsBlock["1"].push(reservation)
  })

  //reservationsBlock[]
}

onMounted(() => {
  window.addEventListener("resize", myEventHandler);

  // roomService.getAllRooms()
  //       .then(result => {
  //           var rooms = result.rooms.filter((room) => { return room.id == props.reservation.room.id })

  //           if (rooms.length > 0) {
  //             if(props.reservations != null) {
  //               props.reservations.room = rooms[0]
  //             }
  //           }
  //       })
});

onUnmounted(() => {
  window.removeEventListener("resize", myEventHandler);
});

function myEventHandler(e: Event) {
  componentKey.value += 1
}

function showReservation(reservation: Reservation) {
  displayedReservation.value = reservation
}

</script>

<template>
  <div class="schedule-container">
    <div class="schedule" ref="el">

      <div class="time-slots">
        <div v-for="(time, index) in times" :key="index+time" class="time-slot">{{ time }}</div>
      </div>

      <div class="schedule-grid">
        <div class="reservations">
          <!-- unique key needed -->
          <div v-for="reservation in reservationsSchedule" :key="componentKey+reservation.room.id+reservation.startTime" class="reservation" :style="getReservationStyle(reservation)">
            <ReservationClosedSchedule @click="showReservation(reservation)" :reservation="reservation"></ReservationClosedSchedule>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

.details-section {
  display: flex;
  flex-direction: column;
  background-color: red;
  height: 100px;
  width: 100%
}

.schedule {
  display: grid;
  grid-template-columns: 100px auto;
  
}

.time-slots {
  display: grid;
  height: 100%;
}

.time-slot {
  border: 1px solid #0c0101;
}

.schedule-grid {
  display: flex;
  overflow-y: auto;
}

.reservations {
  width: fit-content;
  height: fit-content;
  background-color: green;
}

.reservation {
  color: #000000;
  border-radius: 3px;
  position: relative;
  border: 1px solid #0c0101;
  background-color: pink;
}

.schedule-container::-webkit-scrollbar {
  display: none;
}

.schedule-container {
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
}
</style>
