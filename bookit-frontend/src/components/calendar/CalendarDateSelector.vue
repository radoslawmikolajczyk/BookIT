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
    const newSelectedDate = dayjs(props.selectedDate).subtract(1, "month");
    emit("dateSelected", newSelectedDate);
  };
  
  const selectCurrent = () => {
    const newSelectedDate = dayjs(props.currentDate);
    emit("dateSelected", newSelectedDate);
  };
  
  const selectNext = () => {
    const newSelectedDate = dayjs(props.selectedDate).add(1, "month");
    emit("dateSelected", newSelectedDate);
  };
</script>

<template>
  <div class="calendar-date-selector">
    <!-- Grouped Previous and Next above Today -->
    <div class="navigation-buttons">
      <button class="action-button" @click="selectPrevious"> < Previous</button>
      <button class="action-button" @click="selectNext">Next ></button>
    </div>
    <div class="today-button">
      <button class="action-button" @click="selectCurrent">Today</button>
    </div>
  </div>
</template>
  
<style scoped>
  .calendar-date-selector {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
  }

  .navigation-buttons {
    display: flex;
    justify-content:center;
    width: 60%;
  }

  .navigation-buttons .action-button {
    display: flex;
    justify-content:center;
    width: 100%;
    margin-left: 10px;
    margin-right: 10px;
  }

  .today-button {
    margin-top: 10px;
  }

  .action-button {
    padding: 10px 20px;
    background-color: navy;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    width: 110px;
  }

  .action-button:hover {
    background-color: #001f3f;
  }
</style>
  