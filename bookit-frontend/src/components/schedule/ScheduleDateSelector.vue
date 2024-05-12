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
     /* Dark blue background */
    padding: 10px;
    border-radius: 5px;
  }

  .navigation-buttons {
    display: flex;
    justify-content:center;
    width: 60%; /* Full width of the container */
  }

  .navigation-buttons .action-button {
    display: flex;
    justify-content:center;
    width: 100%; /* Full width of the container */
    margin-left: 10px;
    margin-right: 10px;
  }

  .today-button {
    margin-top: 10px; /* Space above the Today button */
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
    background-color: #001f3f; /* Darker blue on hover */
  }
</style>
  