<script setup lang="ts">
    import { ref } from 'vue';
    import { vOnClickOutside } from '@vueuse/components'
    import { Group } from '../../model/Group';

     interface Props {
        group: Group
    }

    const emit = defineEmits(['remove','reserve'])
    const props = defineProps<Props>()

    const isOpen = ref(false)
    const password = ref("")

    function joinGroup() {

    }

    function open() {
        isOpen.value = true
    }

    function close() {
        isOpen.value = false
    }

</script>

<template>
    <div @click="open()" v-on-click-outside="close" class="container">
        <div>
            <p>
                 {{ props.group.name }}
            </p>
        </div>
        <div v-if="isOpen">
            <input type="password" id="password" v-model="password" />
        </div>
        <div v-if="isOpen">
            <button v-on:click.prevent="joinGroup()">Join</button>
        </div>
        <div class="arrow" v-if="!isOpen">
            <p>▼</p>
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
        border-width: 2px;
    }
</style>