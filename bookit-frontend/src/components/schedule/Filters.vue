<script setup lang="ts">
    import  stateManager from '../../composables/stateManager';

    const emit = defineEmits(['makeReservation'])

    const { 
        roomsFloorsNumbers, 
        roomsBuldings, 
        roomsNumbers, 
        floorSelected, 
        buildingSelected, 
        roomNumberSelected, 
        userReservationsChecked, 
        isCreateReservationButtonBlocked,
        reservationTimeMax,
        reservationTimeMin  } = stateManager()

    function clearFilters() {
        floorSelected.value = 0
        buildingSelected.value = ""
        roomNumberSelected.value = ""
        userReservationsChecked.value = false
        reservationTimeMax.value = ""
        reservationTimeMin.value = ""
    }

    function makeReservation() {
        emit("makeReservation");
    }

</script>

<template>
    <div class="container">
        <div class="filter">
            <label for="building">Building</label>
            <select id="building" v-model="buildingSelected">
                <option v-for="option in roomsBuldings" :value="option">{{ option }}</option>
            </select>
        </div>

        <div class="filter">
            <label for="floor">Room</label>
            <select id="floor" v-model="roomNumberSelected">
                <option v-for="option in roomsNumbers" :value="option">{{ option }}</option>
            </select>
        </div>

        <div class="filter">
            <label for="floor">Floor</label>
            <select id="floor" v-model="floorSelected">
                <option v-for="option in roomsFloorsNumbers" :value="option">{{ option }}</option>
            </select>
        </div>

        <div class="filter">
            <label for="timeMin">Start time</label>
            <input type="time" id="timeMin" v-model="reservationTimeMin" />
        </div>

        <div class="filter">
            <label for="timeMax">End time</label>
            <input type="time" id="timeMax" v-model="reservationTimeMax" />
        </div>

        <div class="filter">
            <button :disabled="isCreateReservationButtonBlocked" @click="makeReservation">Make reservation</button>
        </div>

        <div class="filter">
            <button @click="clearFilters()">Reset</button>
        </div>

    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around; /* Ensures items are evenly spaced */
    background-color: #b3e0ff; /* Light blue background */
    padding: 20px;
    border-radius: 8px; /* Rounded corners for better appearance */
}

.filter {
    flex: 1 1 200px; /* Allows each filter to grow and shrink but not smaller than 200px */
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 10px;
    background-color: #ffffff; /* White background for each filter box */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
    border-radius: 5px; /* Rounded corners for the filter containers */
}

.filter label {
    margin-bottom: 5px; /* Space between label and input/select */
    font-size: 14px; /* Slightly larger font size for readability */
    color: #333; /* Darker text for better readability */
}

.filter select, .filter input[type="time"] {
    width: 100%; /* Full width of the container */
    padding: 8px;
    border: 1px solid #ccc; /* Subtle border */
    border-radius: 4px; /* Rounded edges for input and select */
}

.filter button {
    padding: 10px 15px;
    color: white;
    background-color: #007bff; /* Bootstrap primary color for buttons */
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.filter button:hover {
    background-color: #0056b3; /* Darker blue on hover */
}

.filter button:disabled {
    background-color: #cccccc; /* Grayed out when disabled */
    cursor: not-allowed;
}
</style>
