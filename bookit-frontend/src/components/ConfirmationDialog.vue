<script setup>

    const emit = defineEmits(['event'])

    function confirm() {
        emit("event")
    }

</script>

<template>
    <div>
        <button v-on:click.prevent = "confirm()">
            Confirm
        </button>
    </div>

    <div>
        <button v-on:click.prevent = "confirm()">
            Decline
        </button>
    </div>
</template>

<style scoped>
    
</style>