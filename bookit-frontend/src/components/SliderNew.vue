<template>
    <div>
      <input type="range" :min="absoluteMin" :max="absoluteMax" :value="minValue" @input="updateMinValue" />
      <input type="range" :min="absoluteMin" :max="absoluteMax" :value="maxValue" @input="updateMaxValue" />
      <span>Minimalna wartość: {{ minValue }}</span>
      <span>Maksymalna wartość: {{ maxValue }}</span>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    absoluteMin: {
      type: Number,
      required: true
    },
    absoluteMax: {
      type: Number,
      required: true
    }
});

const minValue = ref(props.absoluteMin);
    const maxValue = ref(props.absoluteMax);

    const updateMinValue = (event) => {
      const newValue = parseInt(event.target.value);
      minValue.value = newValue;
      if (minValue.value > maxValue.value) {
        maxValue.value = minValue.value;
      }
    };

    const updateMaxValue = (event) => {
      const newValue = parseInt(event.target.value);
      maxValue.value = newValue;
      if (maxValue.value < minValue.value) {
        minValue.value = maxValue.value;
      }
    };
  </script>