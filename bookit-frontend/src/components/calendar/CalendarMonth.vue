<template>
    <div class="calendar-month">
      <div class="calendar-month-header">
        <CalendarDateIndicator
          :selected-date="selectedDate"
          class="calendar-month-header-selected-month"
        />
  
        <CalendarDateSelector
          :current-date="today"
          :selected-date="selectedDate"
          @dateSelected="selectDate"
        />
      </div>
  
      <CalendarWeekdays/>
  
      <ol class="days-grid">
        <CalendarMonthDayItem
          v-for="day in days"
          :key="day.date"
          :day="day"
          :is-today="day.date === today"
        />
      </ol>
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
  
  <script setup>
  import dayjs from "dayjs";
  import weekday from "dayjs/plugin/weekday";
  import weekOfYear from "dayjs/plugin/weekOfYear";
  import { ref, computed } from "vue";
  import CalendarMonthDayItem from "./CalendarMonthDayItem.vue";
  import CalendarDateIndicator from "./CalendarDateIndicator.vue";
  import CalendarDateSelector from "./CalendarDateSelector.vue";
  import CalendarWeekDays from "./CalendarWeekDays.vue";

  dayjs.extend(weekday);
  dayjs.extend(weekOfYear);
  
  const selectedDate = ref(dayjs());
  const today = ref(dayjs().format("YYYY-MM-DD"));
  
  const days = computed(() => {
    return [
      ...previousMonthDays.value,
      ...currentMonthDays.value,
      ...nextMonthDays.value
    ];
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
        isCurrentMonth: true
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
        isCurrentMonth: false
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
        isCurrentMonth: false
      };
    });
  });
  
  function getWeekday(date) {
    return dayjs(date).weekday();
  }
  
  function selectDate(newSelectedDate) {
    selectedDate.value = newSelectedDate;
  }
  </script>
  