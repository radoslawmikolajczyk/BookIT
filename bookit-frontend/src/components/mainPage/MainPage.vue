<script setup>
import GroupAssigned from '../groups/GroupAssigned.vue';
import CurrentBookings from '../myBookings/CurrentBookings.vue';


</script>

<template>
    <div class="image">
        <img src="../../assets/img/main.png">
    </div>
    <div class="group">
        <GroupAssigned></GroupAssigned>
    </div>
    <div class="reservation">
        <CurrentBookings></CurrentBookings>
    </div>
</template>

<style scoped>
    img {
        border-radius: 8px;
        max-width: 100%;
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 90%;
        padding: 20px 0px;
    }

</style>