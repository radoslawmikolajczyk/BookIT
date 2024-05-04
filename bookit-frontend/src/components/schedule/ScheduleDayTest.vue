<template>
    <li class="calendar-day">
      <p>{{ reservationLabel }}</p>
      <div v-if="props.reservations" class="reservation-timeline">
        <div v-for="reservation in props.reservations" :key="reservation.id" class="reservation-block" :style="calculateReservationStyle(reservation)">
          <span>{{ reservation.title }}</span>
        </div>
      </div>
    </li>
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
  
  const reservationLabel = computed(() => {
    if (props.reservations != null && props.reservations.length > 0) {
      return `Reservations: ${props.reservations.length}`;
    } else {
      return "Free";
    }
  });
  
  const calculateReservationStyle = (reservation: Reservation) => {
    const startTime = new Date(reservation.startTime);
    const endTime = new Date(reservation.endTime);
    const top = (startTime.getHours() * 60 + startTime.getMinutes()) / 60 * 100; // Przeliczenie na procenty
    const height = ((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)) * 100; // Przeliczenie na procenty
    return {
      top: `${top}%`,
      height: `${height}%`
    };
  };
  </script>
  
  <style scoped>
  .calendar-day {
    position: relative;
    min-height: 100px;
    font-size: 16px;
    background-color: #fff;
    color: var(--grey-800);
    padding: 5px;
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
  
  .reservation-timeline {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .reservation-block {
    position: absolute;
    background-color: #0078D4; /* Kolor bloku rezerwacji */
    color: white;
    border-radius: 4px;
    padding: 4px;
    font-size: 12px;
    overflow: hidden;
    width: calc(100% - 10px);
  }
  
  .reservation-block span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  </style>
  