<script setup lang="ts">
import { ref } from 'vue';
import { computed } from 'vue'
import dayjs from 'dayjs'
import { Reservation } from '../../model/Reservation';

interface Props {
    date: string,
    isCurrentMonth: boolean,
    isToday: boolean,
    reservations: Reservation[] | null
  }

const props = defineProps<Props>();

const label = computed(() => {
    return dayjs(props.date).format("D");
  });

const reservationLabel = computed(() => {
  return "Reservations: " + (props.reservations != null ? props.reservations?.length : 0)
})

function getDayStyle(length) {
  var color = "#fff"
  if(length == 0) {
    color = "#39a308"
  } else if(length > 10) {
    color = "#e07e0e"
  } else {
    color = "#eee34a"
  }

  return {
    backgroundColor: `${color}`
  };
}

</script>

<template>
  <div>
    <li class="calendar-day" :style="getDayStyle(props.reservations?.length ?? 0)" :class="{'calendar-day--not-current': !isCurrentMonth, 'calendar-day--today': isToday }">
      <span>{{ label }}</span>
      <p> {{ reservationLabel }}</p>
    </li>
  </div>
</template>
  
<style scoped>
  .calendar-day {
    position: relative;
    min-height: 100px;
    font-size: 16px;
    color: black;
    padding: 5px;
    cursor: pointer;
    background-color: #39a308;
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
    font-size: 16px;
  }
</style>
  