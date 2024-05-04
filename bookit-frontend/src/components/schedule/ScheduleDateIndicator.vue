<script setup>
    import { computed } from 'vue';
    
    const selectedDay = computed(() => {
      return props.selectedDate.format("YYYY MMMM DD");
    });
    
    const props = defineProps({
      selectedDate: {
        type: Object,
        required: true
      }
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
  
  