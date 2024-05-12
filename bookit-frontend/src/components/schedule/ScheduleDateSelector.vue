<script setup>
  import stateManager from "../../composables/stateManager";  
  import dayjs from "dayjs";

  const { dateSelected, today } = stateManager()
  const emit = defineEmits(['dateSelected'])

  const selectPrevious = () => {
    const newSelectedDate = dateSelected.value.subtract(1, "day");
    emit("dateSelected", newSelectedDate);
  };
  
  const selectCurrent = () => {
    const newSelectedDate = dayjs(today.value);
    emit("dateSelected", newSelectedDate);
  };
  
  const selectNext = () => {
    const newSelectedDate = dateSelected.value.add(1, "day");
    emit("dateSelected", newSelectedDate);
  };
</script>

<template>
    <div class="calendar-date-selector">
      <span @click="selectPrevious">< </span>
      <span @click="selectCurrent">Today</span>
      <span @click="selectNext"> ></span>
    </div>
</template>
  
<style scoped>
  .calendar-date-selector {
    font-size: 24px;
    font-weight: 600;
    color: var(--grey-800);
  }
  
  .calendar-date-selector > * {
    cursor: pointer;
    user-select: none;
  }
</style>
  