<template>
  <div class="reservation-area" @mousedown="startSelection" @mousemove="updateSelection" @mouseup="endSelection">
    <vue-draggable-resizable-ts :x="selectionLeft" :y="selectionTop" :scale="scale">
      <div class="selection" :style="{ width: selectionWidth + 'px', height: selectionHeight + 'px' }"></div>
    </vue-draggable-resizable-ts>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueDraggableResizableTs from 'vue-draggable-resizable-ts';
import 'vue-draggable-resizable-ts/dist/VueDraggableResizableTs.css';

const selectionLeft = ref(0);
const selectionTop = ref(0);
const selectionWidth = ref(0);
const selectionHeight = ref(0);
const isSelecting = ref(false);
const scale = 1;

const startSelection = (event: MouseEvent) => {
  isSelecting.value = true;
  selectionLeft.value = event.clientX;
  selectionTop.value = event.clientY;
  selectionWidth.value = 0;
  selectionHeight.value = 0;
};

const updateSelection = (event: MouseEvent) => {
  if (isSelecting.value) {
    selectionWidth.value = event.clientX - selectionLeft.value;
    selectionHeight.value = event.clientY - selectionTop.value;
  }
};

const endSelection = () => {
  isSelecting.value = false;
  console.log(selectionHeight.value)
};



</script>

<style scoped>
</style>
