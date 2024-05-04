<script setup lang="ts">
import { computed } from 'vue'
import { Reservation } from '../../model/Reservation';

interface Props {
    date: {
      type: Object,
      required: true
    },
    reservations: Reservation[] | null | undefined
  }

const props = defineProps<Props>();

const reservationLabel = computed(() => {
  console.log(props.reservations)
  if(props.reservations != null && props.reservations != undefined) {
    return "Reservations: " + props.reservations.length
  }
  return "Free"
})

</script>

<template>
  <li class="calendar-day">
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
  