<script setup>

    const emit = defineEmits(['decision'])

    function confirm() {
        emit("decision", true)
    }

    function decline() {
        emit("decision", false)
    }

</script>

<template>
    <div>
        <button v-on:click.prevent = "confirm()">
            Confirm
        </button>
    </div>

    <div>
        <button v-on:click.prevent = "decline()">
            Decline
        </button>
    </div>
</template>

<style scoped>
    
</style>