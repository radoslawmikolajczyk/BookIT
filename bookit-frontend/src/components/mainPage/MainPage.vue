<script setup>
import GroupAssigned from '../groups/GroupAssigned.vue';
import CurrentBookings from '../myBookings/CurrentBookings.vue';
</script>

<template>
    <div class="main-container">
        <div class="image-container">
            <img src="../../assets/img/main.png" class="main-image">
        </div>
        <div class="group">
            <GroupAssigned></GroupAssigned>
        </div>
        <div class="reservation">
            <CurrentBookings></CurrentBookings>
        </div>
    </div>
</template>

<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.image-container {
    width: 90%; /* Maksymalna szerokość obrazka */
    margin-top: 20px; /* Odstęp od góry */
}

.main-image {
    width: 100%; /* Zdjęcie zajmuje 100% szerokości kontenera */
    height: auto; /* Zachowuje proporcje */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Dodaje lekki cień */
}

.group,
.reservation {
    width: 90%; /* Maksymalna szerokość komponentów */
    margin-top: 20px; /* Odstęp między komponentami */
}
</style>
