    <script setup lang="ts">
    import { Tabs } from '../../enums/tabs.ts';
    import stateManager from '../../composables/stateManager.ts';
    import HistoricalBookings from './HistoricalBookings.vue';
    import CurrentBookings from './CurrentBookings.vue'

    const { openTab } = stateManager()

    function showTab(tab: Tabs) {
        openTab.value = tab
    }

</script>

<template>
    <h1>My Reservations</h1>
    <p>Know when and where you will be at University.</p>

    <div>
        <button @click="showTab(Tabs.CURRENT)">My curent bookings</button>
        <button @click="showTab(Tabs.HISTORY)">My history bookings</button>
    </div>

    <div v-if="openTab == Tabs.HISTORY">
        <HistoricalBookings></HistoricalBookings>
    </div>

    <div v-if="openTab == Tabs.CURRENT">
        <CurrentBookings></CurrentBookings>
    </div>

</template>

<style scoped>
</style>