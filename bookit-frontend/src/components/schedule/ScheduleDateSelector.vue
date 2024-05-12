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
    background-color: #b3e0ff; /* Light blue background */
    padding: 20px;
    border-radius: 8px; /* Rounded corners for better appearance */
    width: 100%; /* Full width for better responsiveness */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15); /* Subtle shadow for depth */
}

.navigation-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%; /* Full width to manage internal spacing */
    margin-bottom: 10px; /* Space below the navigation buttons */
}

.navigation-buttons .action-button {
    flex-grow: 1; /* Allows buttons to grow and fill the space */
    margin: 0 10px; /* Spacing between buttons */
}

.today-button {
    width: 100%; /* Full width to center the today button properly */
    display: flex;
    justify-content: center;
}

.action-button {
    padding: 10px 20px;
    background-color: #007bff; /* Bootstrap primary blue for consistency */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 16px; /* Increased font size for better readability */
}

.action-button:hover {
    background-color: #0056b3; /* Darker blue on hover for better interaction */
}
</style>
  