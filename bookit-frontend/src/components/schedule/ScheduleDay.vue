<template>
  <div class="calendar-day-container">
    <li class="calendar-day">
      <!-- <p>{{ reservationLabel }}</p> -->
      <div v-if="props.reservations" class="reservation-timeline">
        <div v-for="reservation in props.reservations" class="reservation-block" :style="calculateReservationStyle(reservation)">

        </div>
      </div>
    </li>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { Reservation } from '../../model/Reservation';

interface Props {
  date: {
    type: Object,
    required: true
  },
  reservations: Reservation[] | null | undefined
}

const props = defineProps<Props>();

const calculateReservationStyle = (reservation: Reservation) => {
  const startTime = new Date(reservation.startTime);
  const endTime = new Date(reservation.endTime);
  const startHour = startTime.getHours();
  const startMinutes = startTime.getMinutes();
  const endHour = endTime.getHours();
  const endMinutes = endTime.getMinutes();
  const top = (startHour * 60 + startMinutes) / 60 * 100;
  const height = ((endHour * 60 + endMinutes) - (startHour * 60 + startMinutes)) / 60 * 100;
  
  return {
    top: `${top}%`,
    height: `${height}%`
  };
};



</script>

<style scoped>
.calendar-day-container {
  height: calc(100vh - 50px);
  overflow-y: auto;
}

.calendar-day {
  position: relative;
  min-height: 200px;
  font-size: 16px;
  background-color: #fff;
  color: var(--grey-800);
  padding: 10px;
}

.calendar-day > p {
  margin: 0;
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

.reservation-timeline {
  position: relative;
  width: calc(100% - 60px);
  height: 100%;
  left: 60px;
  display: flex;
  align-items: flex-start;
}

.reservation-block {
  background-color: #0078D4;
  color: white;
  border-radius: 4px;
  padding: 4px;
  font-size: 12px;
  overflow: hidden;
  margin-bottom: 2px;
  position: absolute;
}

.reservation-block span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% - 10px);
  display: inline-block;
}

.time-scale {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 60px;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-top: 10px;
}

.time-slot {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
}
</style>
