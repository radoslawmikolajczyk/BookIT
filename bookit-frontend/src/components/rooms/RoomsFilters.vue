<script setup lang="ts">
    import  stateManager from '../../composables/stateManager';

    const { 
        roomsFloorsNumbers, 
        roomsBuldings, 
        roomsNumbers, 
        buildingSelectedRoom,
        roomNumberSelectedRoom,
        floorSelectedRoom
         } = stateManager()

    function clearFilters() {
        buildingSelectedRoom.value = ""
        roomNumberSelectedRoom.value = ""
        floorSelectedRoom.value = 0
    }

</script>

<template>
    <div class="container">
        <div class="filter">
            <label for="building">Building</label>
            <select id="building" v-model="buildingSelectedRoom">
                <option v-for="option in roomsBuldings" :key="option" :value="option">{{ option }}</option>
            </select>
        </div>

        <div class="filter">
            <label for="floor">Room</label>
            <select id="floor" v-model="roomNumberSelectedRoom">
                <option v-for="option in roomsNumbers" :key="option" :value="option">{{ option }}</option>
            </select>
        </div>

        <div class="filter">
            <label for="floor">Floor</label>
            <select id="floor" v-model="floorSelectedRoom">
                <option v-for="option in roomsFloorsNumbers" :key="option" :value="option">{{ option }}</option>
            </select>
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
