<script setup lang="ts">
import dayjs from 'dayjs'
import { computed } from 'vue';
import { Reservation } from '../../model/Reservation';
import CalendarMonthDayOverview from './CalendarMonthDayOverview.vue'

interface Props {
    date: string,
    isCurrentMonth: Boolean,
    isToday: Boolean,
    reservations: [Reservation] | null
  }

const props = defineProps<Props>();
</script>

<template>
  <li class="calendar-day" :class="{'calendar-day--not-current': !props.isCurrentMonth, 'calendar-day--today': props.isToday}">
    <CalendarMonthDayOverview :date="props.date" :reservations="props.reservations" :is-current-month="props.isCurrentMonth" :is-today="isToday"></CalendarMonthDayOverview>
  </li>
</template>

<style scoped>
.calendar-day {
  position: relative;
  min-height: 100px;
  font-size: 16px;
  background-color: #fff;
  color: var(--grey-800);
  padding: 5px;
}

.calendar-day > span {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 2px;
  width: var(--day-label-size);
  height: var(--day-label-size);
}

.calendar-day--not-current {
  background-color: var(--grey-100);
  color: var(--grey-300);
}

.calendar-day--today {
  padding-top: 4px;
}

.calendar-day--today > span {
  color: #fff;
  border-radius: 9999px;
  background-color: var(--grey-800);
}
</style>