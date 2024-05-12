<script setup lang="ts">
    import stateManager from '../../composables/stateManager';
    const { searchField } = stateManager();

    function clearSearchField() {
        searchField.value = ''; // Wyczyszczanie pola tekstowego
    }
</script>

<template>
    <div class="topnav">
        <div class="search-container">
            <label for="search" class="search-label">Search:</label>
            <input type="text" id="search" placeholder="Type to search..." v-model="searchField">
            <button @click="clearSearchField" class="clear-button">&#x2715;</button>
        </div>
    </div>
</template>

<style scoped>
    .topnav {
        overflow: hidden;
        background-color: #e9e9e9;
        text-align: center;
        padding: 10px;
    }

    .search-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .search-label {
        margin-right: 10px;
    }

    input[type=text] {
        flex: 1;
        padding: 8px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    input[type=text]:focus {
        outline: none;
    }

    .clear-button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 0 10px;
        font-size: 16px;
        transition: color 0.3s ease;
    }

    .clear-button:hover {
        color: red;
    }

    /* Dodano responsywność dla małych ekranów */
    @media screen and (max-width: 600px) {
        input[type=text] {
            width: 100%;
            margin-top: 0;
        }
    }
</style>
