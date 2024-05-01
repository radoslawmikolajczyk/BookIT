<template>
    <div class="calendar-date-indicator">{{ selectedMonth }}</div>
  </template>
  
  <style scoped>
  .calendar-date-indicator {
    font-size: 24px;
    font-weight: 600;
    color: var(--grey-00);
  }
  </style>
  
  <script setup>
  import { computed } from 'vue';
  
  const selectedMonth = computed(() => {
    return props.selectedDate.format("MMMM YYYY");
  });
  
  const props = defineProps({
    selectedDate: {
      type: Object,
      required: true
    }
  });
  </script>
  
  