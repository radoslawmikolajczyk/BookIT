<script setup lang="ts">
    import { computed } from 'vue';
    import stateManager from '../../composables/stateManager';

    const { dateSelected } = stateManager()

    const selectedDay = computed(() => {
      return dateSelected.value.format("YYYY MMMM DD");
    });
    
</script>

<template>
    <div class="calendar-date-indicator">{{ selectedDay }}</div>
</template>
  
<style scoped>
  .calendar-date-indicator {
    font-size: 24px;
    font-weight: 600;
    color: var(--grey-00);
  }
</style>
  
  