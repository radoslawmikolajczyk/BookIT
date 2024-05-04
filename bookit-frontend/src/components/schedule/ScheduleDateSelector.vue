<script setup>
  import dayjs from "dayjs";
    
  const emit = defineEmits(['dateSelected'])

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
    const newSelectedDate = dayjs(props.selectedDate).subtract(1, "day");
    emit("dateSelected", newSelectedDate);
  };
  
  const selectCurrent = () => {
    const newSelectedDate = dayjs(props.currentDate);
    emit("dateSelected", newSelectedDate);
  };
  
  const selectNext = () => {
    const newSelectedDate = dayjs(props.selectedDate).add(1, "day");
    emit("dateSelected", newSelectedDate);
  };
</script>

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
  