<script setup lang="ts">
    import  stateManager from '../../composables/stateManager';

    const { openCreateGroupSection } = stateManager()
    
    function addGroup() {
        openCreateGroupSection.value = true
    }

</script>

<template>
<div class="topnav">
    <div>
        <button class="btn btn-outline-dark" v-on:click.prevent="addGroup()"><img class="plus" src="../../assets/img/plus.png"></button>
    </div>
</div>
</template>

<style scoped>

.plus {
    height: auto; 
    width: auto; 
    max-width: 50px; 
    max-height: 50px;
}

.topnav {
  text-align: center;
}
</style>