<script setup>
    import Slider from '../components/Slider.vue'
    import { ref } from 'vue'
    const sliderMin = ref(65);
    const sliderMax = ref(150);

</script>

<template>
    <div>
        <div class="building">
            <p>Building</p>
        </div>
        <div class="floor">
            <p>Floor</p>
        </div>
        <div class="hour">
            <Slider
                :min="65"
                :max="368"
                v-model:min-value="sliderMin"
                v-model:max-value="sliderMax"
            />
        </div>
        <div class="date">
            <Slider
                :min="65"
                :max="368"
                v-model:min-value="sliderMin"
                v-model:max-value="sliderMax"
            />
        </div>
    </div>
</template>

<style scoped>
    
</style>