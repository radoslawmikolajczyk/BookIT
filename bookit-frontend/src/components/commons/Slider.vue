<script setup>
import { computed, ref, watchEffect } from "vue";

const { min, max, step, minValue, maxValue } = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  minValue: {
    type: Number,
    default: 50,
  },
  maxValue: {
    type: Number,
    default: 80,
  },
});

const emit = defineEmits(["update:minValue", "update:maxValue"]);
const slider = ref(null);
const inputMin = ref(null);
const inputMax = ref(null);
const sliderMinValue = ref(minValue);
const sliderMaxValue = ref(maxValue);

const getPercent = (value, min, max) => {
  return ((value - min) / (max - min)) * 100;
};

const sliderDifference = computed(() => {
  return Math.abs(sliderMaxValue.value - sliderMinValue.value);
});

// const setCSSProps = (left, right) => {
//   slider.value.style.setProperty("--progressLeft", `${left}%`);
//   slider.value.style.setProperty("--progressRight", `${right}%`);
// };

watchEffect(() => {
  if (slider.value) {
    emit("update:minValue", sliderMinValue.value);
    emit("update:maxValue", sliderMaxValue.value);

    const leftPercent = getPercent(sliderMinValue.value, min, max);
    const rightPercent = 100 - getPercent(sliderMaxValue.value, min, max);

    //setCSSProps(leftPercent, rightPercent);
  }
});

const onInput = ({ target }) => {
  if (target.name === 'min') {
    target.value > sliderMaxValue.value ? target.value = sliderMaxValue.value : sliderMinValue.value = parseFloat(target.value);
  }

  if (target.name === 'max') {
    target.value < sliderMinValue.value ? target.value = sliderMinValue.value : sliderMaxValue.value = parseFloat(target.value);
  }
};

</script>
<template>
  <div ref="slider" class="custom-slider minmax">
    <div class="minmax-indicator"></div>
    <input
      ref="inputMin"
      type="range"
      name="min"
      id="min"
      :min="min"
      :max="max"
      :value="minValue"
      :step="step"
      @input="onInput"
    />
    <input
      ref="inputMax"
      type="range"
      name="max"
      id="max"
      :min="min"
      :max="max"
      :value="maxValue"
      :step="step"
      @input="onInput"
    />
  </div>
  <div class="minmax-inputs">
    <input type="string" :step="step" v-model="sliderMinValue" />
    <input type="string" :step="step" v-model="sliderMaxValue" />
  </div>
</template>