<script setup lang="ts">
import { ref } from 'vue';
import { Reservation } from '../../model/Reservation';

interface Props {
    reservations: [Reservation]
  }

const props = defineProps<Props>();

</script>

<template>
  
<div v-for=" res in props.reservations">
    <p> {{ res.startDate }} - {{ res.endDate }}  </p>
</div>

</template>
  

<style scoped>

</style>
  