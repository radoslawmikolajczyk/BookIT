<script setup>
    import { useStore } from 'vuex';
    import Slider from '../components/Slider.vue'
    import { ref } from 'vue'
import { RoomRequest } from '../model/RoomRequest';
    
    const sliderMin = ref(65);
    const sliderMax = ref(150);
    const store = useStore()
    const roomRequest = ref<RoomRequest | null>(null)
    
    const dateMax = computed({
        get: () => count.value + 1,
        set: (val) => {
            count.value = val - 1
        }
    })

    const dateMin = computed({
        get: () => count.value + 1,
        set: (val) => {
            count.value = val - 1
        }
    })

    const timeMax = computed({
        get: () => count.value + 1,
        set: (val) => {
            count.value = val - 1
        }
    })

    const timeMin = computed({
        get: () => count.value + 1,
        set: (val) => {
            count.value = val - 1
        }
    })

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
                :min="8"
                :max="20"
                v-model:min-value="sliderMin"
                v-model:max-value="sliderMax"
            />
        </div>
        <div class="date">
            <Slider
                :min="8"
                :max="20"
                v-model:min-value="sliderMin"
                v-model:max-value="sliderMax"
            />
        </div>
    </div>
</template>

<style scoped>
    
</style>