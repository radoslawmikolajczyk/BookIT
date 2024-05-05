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
import ScheduleSelectArea from "../../components/schedule/ScheduleSelectArea.vue"
import ScheduleTimeline from "./ScheduleTimeline.vue";

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
    <div class="calendar-sidebar">
      <ScheduleDateIndicator :selected-date="selectedDate" />
      <ScheduleDateSelector :selected-date="selectedDate" :current-date="today" @dateSelected="selectDate" />
    </div>

    <div class="calendar-content">
      <ScheduleTimeline>
        <template #selectedArea>
          <ScheduleSelectArea/>
        </template>
        <template #scheduleDay>
          <ScheduleDay :date="selectedDate" :reservations="reservations" />
        </template>
      </ScheduleTimeline>
    </div>
  </div>
</template>
  
<style scoped>
.calendar-month {
  display: flex;
  flex-direction: column;
  background-color: var(--grey-200);
  border: solid 1px var(--grey-300);
  height: 80vh;
}

.calendar-sidebar {
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 20px;
}

.calendar-content {
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow: auto;
  padding: 20px;
}

.schedule-select-area {
  flex: 1;
  padding: 20px;
}

.schedule-day {
  flex: 2;
  padding: 20px;
}
</style>