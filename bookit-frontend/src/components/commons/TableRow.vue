<script setup lang="ts">
    import { ref } from 'vue';
    import { vOnClickOutside } from '@vueuse/components'

    const isOpen = ref(false)

    function open() {
        isOpen.value = true
    }

    function close() {
        isOpen.value = false
    }

</script>

<template>
    <div @click="open" v-on-click-outside="close" class="container">
        <div v-if="!isOpen">
            <slot name="closedContent"></slot>
        </div>
        <div v-if="isOpen">
            <slot name="openContent"></slot>
        </div>
        <div class="arrow" v-if="!isOpen">
            <slot name="arrow"></slot>
        </div>
    </div>
</template>

<style scoped>
    .arrow {
        display: block;
        color: #555; /* Szary kolor */
        text-align: center;
        font-size: 17px;
        margin-bottom: 5px; /* Dodatkowy margines na dół */
    }

    .container {
        border: 1px solid #ddd; /* Jasnoszary kolor obramowania */
        padding: 10px; /* Dodatkowy wypełnienie */
        background-color: #f9f9f9; /* Bardziej wyrazisty kolor tła */
        border-radius: 10px; /* Zaokrąglenie rogów */
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .container:hover {
        background-color: #e9e9e9; /* Zmiana koloru tła po najechaniu myszą */
    }
</style>
