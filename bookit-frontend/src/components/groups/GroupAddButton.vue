<template>
    <div class="group-add-button-container">
        <button class="btn btn-outline-dark" @click.prevent="addGroup()">
            <img class="plus" src="../../assets/img/plus.png">
        </button>
    </div>
</template>

<script setup lang="ts">
    import stateManager from '../../composables/stateManager';

    const { openCreateGroupSection } = stateManager()
    
    function addGroup() {
        openCreateGroupSection.value = true
    }

</script>

<style scoped>
    .group-add-button-container {
        text-align: center;
    }

    .plus {
        height: auto; 
        width: auto; 
        max-width: 50px; 
        max-height: 50px;
        transition: transform 1.3s ease; /* Dodaj animację transformacji */
    }

    /* Dodaj efekt hover do przycisku */
    .btn-outline-dark:hover {
        background-color: #343a40;
        color: #fff;
    }
</style>
