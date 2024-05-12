<script setup lang="ts">
    import { Group } from '../../model/Group';

    interface Props {
        group: Group
    }

    const props = defineProps<Props>()

</script>

<template>
    <div class="group-container">
        <h4 class="group-name">{{ props.group.name }}</h4>
    </div>
</template>


<style scoped>
.group-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #b3e0ff; /* Light blue background */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Adds subtle depth */
    margin: 10px auto;
    width: 100%;
    max-width: 200px;
}

.group-name {
    color: #003366; /* Dark blue text for readability */
    font-size: 16px; /* Adequate font size for visibility */
    margin: 0; /* Removes default margin */
    text-align: center; /* Ensures text is centered */
}
</style>
