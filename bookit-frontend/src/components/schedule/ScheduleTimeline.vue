<template>
    <div class="calendar-day-container">
    
      <div class="time-scale">
        <div class="time-slot" v-for="hour in [8,9,10,11,12,13,14,15,16,17,18,19,20]" :key="hour">{{ hour }}:00</div>
      </div>
    
      <!-- Dodanie linii czasu -->
      <div class="timeline"></div>
  
      <slot name="selectedArea" class="selected-area"></slot>
    
      <slot name="scheduleDay" class="schedule-day"></slot>
    
    </div>
  </template>
  
  <style scoped>
  .calendar-day-container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    align-items: stretch;
    border: 1px solid #0f0f0f;
    position: relative;
  }
  
  .time-scale {
    width: 100px;
    border-right: 1px solid #ccc;
  }
  
  .time-slot {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    text-align: center;
  }
  
  .selected-area, .schedule-day {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .selected-area::before, .schedule-day::before {
    content: "";
    position: absolute;
    left: 100px;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: #ccc;
  }
  
  .timeline {
    position: absolute;
    left: 100px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #0078D4;
    z-index: 1;
  }
  </style>
  