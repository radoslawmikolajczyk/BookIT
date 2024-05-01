<script setup lang="ts">
    import { ref } from 'vue';
    import { vOnClickOutside } from '@vueuse/components'
    import { Group } from '../../model/Group';

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
        color: black;
        text-align: center;
        font-size: 17px;
    }

    .container {
        border-style: solid;
        border-width: 1px;
    }
</style>