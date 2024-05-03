<script setup lang="ts">
import { ref } from 'vue';
import { computed } from 'vue'
import dayjs from 'dayjs'
import { Reservation } from '../../model/Reservation';

interface Props {
    date: string,
    isCurrentMonth: boolean,
    isToday: boolean,
    reservations: [Reservation] | null
  }

const props = defineProps<Props>();

const label = computed(() => {
    return dayjs(props.date).format("D");
  });

const reservationLabel = computed(() => {
  if(props.reservations != null) {
    return "Reservations: " + props.reservations.length
  }
  return "Free"
})

</script>

<template>
      <li
      class="calendar-day"
      :class="{
        'calendar-day--not-current': !isCurrentMonth,
        'calendar-day--today': isToday
      }"
    >
    <span>{{ label }}</span>
    <p> {{ reservationLabel }}</p>
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
  