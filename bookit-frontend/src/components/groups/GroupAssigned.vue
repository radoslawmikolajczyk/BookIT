<script setup>
    import stateManager from '../../composables/stateManager.ts';

    const { authorizedUser } = stateManager()

</script>

<template>
    <div v-if="authorizedUser.value != null" id="app">
        <p class="assigned">Your are assigned to: {{ authorizedUser?.group?.name ?? "" }} </p>
    </div>
    <div v-else>
        <p class="not-assigned">Your are not assigned to any group. Please select a group!</p>
    </div>
</template>

<style scoped>
    .assigned {
        color: navy;
        text-transform: uppercase;
        margin: 10px 0;
        padding: 5px;
        border: 1px solid #999;
    }

    .not-assigned {
        color: rgb(235, 22, 15);
        text-transform: uppercase;
        margin: 10px 0;
        padding: 50px;
        border: 10px solid #fc0404;
    }
</style>