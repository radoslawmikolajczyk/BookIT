<template>
    <div class="calendar-date-selector">
      <span @click="selectPrevious"><</span>
      <span @click="selectCurrent">Today</span>
      <span @click="selectNext">></span>
    </div>
  </template>
  
  <style scoped>
  .calendar-date-selector {
    display: flex;
    justify-content: space-between;
    width: 80px;
    color: var(--grey-800);
  }
  
  .calendar-date-selector > * {
    cursor: pointer;
    user-select: none;
  }
  </style>
  
  <script setup>
  import dayjs from "dayjs";
    
  const props = defineProps({
    currentDate: {
      type: String,
      required: true
    },

    selectedDate: {
      type: Object,
      required: true
    }
  });

  const selectPrevious = () => {
    const newSelectedDate = dayjs(selectedDate.value).subtract(1, "month");
    emit("dateSelected", newSelectedDate);
  };
  
  const selectCurrent = () => {
    const newSelectedDate = dayjs(currentDate.value);
    emit("dateSelected", newSelectedDate);
  };
  
  const selectNext = () => {
    const newSelectedDate = dayjs(selectedDate.value).add(1, "month");
    emit("dateSelected", newSelectedDate);
  };
  </script>
  