<template>
  <div class="calendar-day-container">
    <li class="calendar-day">
      <div v-if="props.reservations" class="reservation-timeline">
        <div v-for="reservation in props.reservations" class="reservation-block">
          <p>{{ reservation.room }}</p>
        </div>
      </div>
    </li>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { Reservation } from '../../model/Reservation';

interface Props {
  date: {
    type: Object,
    required: true
  },
  reservations: Reservation[] | null | undefined
}

const props = defineProps<Props>();

</script>

<style scoped>
</style>
