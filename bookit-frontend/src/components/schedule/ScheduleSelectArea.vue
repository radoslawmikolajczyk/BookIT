<template>
  <div class="reservation-area" @mousedown="startSelection" @mousemove="updateSelection" @mouseup="endSelection">
    <div class="selection" :style="{ top: selectionTop + 'px', height: selectionHeight + 'px' }"></div>
    <div
      v-for="(hour, index) in hours"
      :key="index"
      class="hour-line"
      :style="{ top: (index * props.hourHeight) + 'px' }"
      @mousedown="startHourLineMove($event, index)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  hourHeight: number
}

const props = defineProps<Props>();

const selectionTop = ref(0);
const selectionHeight = ref(0);
const isSelecting = ref(false);
const hours = Array.from({ length: 13 }, (_, i) => i + 8); // Godziny od 8:00 do 20:00

const startSelection = (event: MouseEvent) => {
  isSelecting.value = true;
  selectionTop.value = event.clientY;
  selectionHeight.value = 0;
};

const updateSelection = (event: MouseEvent) => {
  if (isSelecting.value) {
    selectionHeight.value = event.clientY - selectionTop.value;
  }
};

const endSelection = () => {
  isSelecting.value = false;
  console.log('Zaznaczony obszar:', selectionTop.value, '-', selectionTop.value + selectionHeight.value);
};

const startHourLineMove = (event: MouseEvent, index: number) => {
  // Obsługa przesuwania linii godzinowej
  console.log('Przesuwanie linii godzinowej dla godziny:', hours[index]);
};

</script>

<style scoped>
.reservation-area {
  position: relative;
  height: 100%;
}

.selection {
  position: absolute;
  background-color: rgba(0, 0, 255, 0.3); /* Niebieski kolor z przezroczystością */
  width: 100%;
  pointer-events: none; /* Zapobiegaj przechwytywaniu zdarzeń myszy przez obszar zaznaczenia */
}

.hour-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #000; /* Kolor linii godzinowej */
  cursor: pointer;
}

</style>
