<script setup lang="ts">
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { ref, computed, onBeforeMount } from "vue";
import CalendarMonthDayItem from "./CalendarMonthDayItem.vue";
import CalendarDateIndicator from "./CalendarDateIndicator.vue";
import CalendarDateSelector from "./CalendarDateSelector.vue";
import CalendarWeekdays from "./CalendarWeekdays.vue";
import { Reservation } from "../../model/Reservation";
import { ReservationService } from "../../services/ReservationService.ts"
import { ReservationRequest } from "../../model/ReservationRequest.ts";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

interface ComputedDays {
  date: string, 
  isCurrentMonth: Boolean, 
  reservations: [Reservation] | null
}

const selectedDate = ref(dayjs());
const today = ref(dayjs().format("YYYY-MM-DD"));
const reservationService = new ReservationService()
const computedDays = ref<[ComputedDays] | null>(null)

const days = computed(() => {
  computedDays.value = null
  computedDays.value = [{date: "", isCurrentMonth: false, reservations: [new Reservation()]}]
  computedDays.value.pop()

   return [...previousMonthDays.value, ...currentMonthDays.value, ...nextMonthDays.value].map(async (day) => {
    return getReservations(day.date).then((result) => {
      computedDays.value?.push({ date: day.date, isCurrentMonth: day.isCurrentMonth, reservations: result != undefined ? result : null })
    })
  })
});

const month = computed(() => {
  return Number(selectedDate.value.format("M"));
});

const year = computed(() => {
  return Number(selectedDate.value.format("YYYY"));
});

const numberOfDaysInMonth = computed(() => {
  return dayjs(selectedDate.value).daysInMonth();
});

const currentMonthDays = computed(() => {
  return [...Array(numberOfDaysInMonth.value)].map((day, index) => {
    return {
      date: dayjs(`${year.value}-${month.value}-${index + 1}`).format(
        "YYYY-MM-DD"
      ),
      isCurrentMonth: true,
      reservations: [Reservation]
    };
  });
});

const previousMonthDays = computed(() => {
  const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays.value[0].date);
  const previousMonth = dayjs(
    `${year.value}-${month.value}-01`
  ).subtract(1, "month");

  const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
    ? firstDayOfTheMonthWeekday - 1
    : 6;

  const previousMonthLastMondayDayOfMonth = dayjs(
    currentMonthDays.value[0].date
  )
    .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
    .date();

  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
    return {
      date: dayjs(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${
          previousMonthLastMondayDayOfMonth + index
        }`
      ).format("YYYY-MM-DD"),
      isCurrentMonth: false,
      reservations: [Reservation]
    };
  });
});

const nextMonthDays = computed(() => {
  const lastDayOfTheMonthWeekday = getWeekday(
    `${year.value}-${month.value}-${currentMonthDays.value.length}`
  );

  const nextMonth = dayjs(`${year.value}-${month.value}-01`).add(1, "month");

  const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
    ? 7 - lastDayOfTheMonthWeekday
    : lastDayOfTheMonthWeekday;

  return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
    return {
      date: dayjs(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
      ).format("YYYY-MM-DD"),
      isCurrentMonth: false,
      reservations: [Reservation]
    };
  });
});

async function getReservations(date: string) : Promise<[Reservation]> {
  var request = new ReservationRequest("",1,date + " 00:00",date + " 23:59")
  var res: [Reservation]

  return await reservationService.getAllReservationsFromPeriod(request)
  .then((result) => {
    if(result.isSuccess) {
      res = result.reservations
    } else {
      // wypisz dlaczego się nie udało
    }
    return res
  })
}

function getWeekday(date) {
  return dayjs(date).weekday();
}

function selectDate(newSelectedDate) {
  selectedDate.value = newSelectedDate;
}

function clicked(day) {
  console.log(day.reservations)
}

</script>

<template>
    <div v-if="days"></div>
    <div class="calendar-month">
      <div class="calendar-month-header">
        <CalendarDateIndicator :selected-date="selectedDate" class="calendar-month-header-selected-month"/>
        <CalendarDateSelector :current-date="today" :selected-date="selectedDate" @dateSelected="selectDate"/>
      </div>
      <CalendarWeekdays/>

      <div>
        <ol class="days-grid">
          <CalendarMonthDayItem v-for="day in computedDays" @click="clicked(day)" :date="day.date" :is-current-month="day.isCurrentMonth" :is-today="day.date === today" :reservations="day.reservations"/>
        </ol>
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
  