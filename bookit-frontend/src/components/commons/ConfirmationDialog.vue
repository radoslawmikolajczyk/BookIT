<script setup lang="ts">

    const emit = defineEmits(['decision'])

    function decision(decision) {
        emit("decision", decision)
    }

</script>

<template>
    <div>
        <button v-on:click.prevent = "decision(true)">
            Confirm
        </button>
    </div>

    <div>
        <button v-on:click.prevent = "decision(false)">
            Decline
        </button>
    </div>
</template>

<style scoped>
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        margin: 0;
        padding: 0;
    }
</style>