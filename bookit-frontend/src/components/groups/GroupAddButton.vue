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
        <button class="btn btn-outline-dark" v-on:click.prevent="addGroup()">+</button>
    </div>
</div>
</template>

<style scoped>

.topnav {
  overflow: hidden;
  background-color: #e9e9e9;
}

@media screen and (max-width: 600px) {
  .topnav .search-container {
    float: none;
  }
  .topnav a, .topnav input[type=text], .topnav .search-container button {
    float: none;
    display: block;
    text-align: left;
    width: 100%;
    margin: 0;
    padding: 14px;
  }
  .topnav input[type=text] {
    border: 1px solid #ccc;  
  }
}
</style>