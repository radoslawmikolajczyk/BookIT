<script setup lang="ts">
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { ref } from "vue";
import { Reservation } from "../../model/Reservation.ts";
import { ReservationService } from "../../services/ReservationService.ts"
import { ReservationRequest } from "../../model/ReservationRequest.ts";
import ScheduleDateIndicator from "../../components/schedule/ScheduleDateIndicator.vue"
import ScheduleDateSelector from "../../components/schedule/ScheduleDateSelector.vue"
import ScheduleDay from "../../components/schedule/ScheduleDay.vue"
import ScheduleDayTest from "../../components/schedule/ScheduleDayTest.vue"
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

const selectedDate = ref(dayjs());
const reservationService = new ReservationService()
const reservations = ref<[Reservation] | null | undefined>(null)
const today = ref(dayjs().format("YYYY-MM-DD"));

function getReservations(date: string) {
  console.log(date)
  var request = new ReservationRequest("",1,date + " 00:00",date + " 23:59")

  reservationService.getAllReservationsFromPeriod(request)
  .then((result) => {
    if(result.isSuccess) {
      console.log(result.reservations)
      reservations.value = result.reservations
    } else {
      // wypisz dlaczego się nie udało
    }
  })
}

function selectDate(newSelectedDate) {
  selectedDate.value = newSelectedDate;
  getReservations(selectedDate.value.format("YYYY-MM-DD"))
}

</script>

<template>
    <div class="calendar-month">
      <div class="calendar-month-header">
        <ScheduleDateIndicator :selected-date="selectedDate" class="calendar-month-header-selected-month"/>
        <ScheduleDateSelector :selected-date="selectedDate" :current-date="today" @dateSelected="selectDate"/>
      </div>
      <div>
        <!-- <ScheduleDay :date="selectedDate" :reservations="reservations"></ScheduleDay> -->
        <ScheduleDayTest :date="selectedDate" :reservations="reservations"></ScheduleDayTest>
      </div>
    </div>
</template>
  
<style scoped>
.calendar-month {
  position: relative;
  background-color: var(--grey-200);
  border: solid 1px var(--grey-300);
}

.day-of-week {
  color: var(--grey-800);
  font-size: 18px;
  background-color: #fff;
  padding-bottom: 5px;
  padding-top: 10px;
}

.day-of-week,
.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day-of-week > * {
  text-align: right;
  padding-right: 5px;
}

.days-grid {
  height: 100%;
  position: relative;
  grid-column-gap: var(--grid-gap);
  grid-row-gap: var(--grid-gap);
  border-top: solid 1px var(--grey-200);
}
</style>
  