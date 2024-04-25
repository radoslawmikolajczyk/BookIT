<script setup lang="ts">
    import { ref } from 'vue';

    const password = ref("")
    const name = ref("")

    function create() {
        
    }

</script>

<template>
    <div class="container">
        <div>
            <input type="text" id="name" v-model="name" />
        </div>
        <div >
            <input type="password" id="password" v-model="password" />
        </div>
        <div >
            <button v-on:click.prevent="create()">Create</button>
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