<script setup lang="ts">

    interface Props {
        clicked: () => {},
        buttonTitle: String
    }

    const props = defineProps<Props>()

</script>

<template>
    <div class="container">
        <div class="info">
            <button @click="props.clicked()">{{ props.buttonTitle }}</button>
        </div>
    </div>
</template>

<style scoped>
    .container {
        padding: 10px 30px;
    }

    .date {
        background-color: rgb(238, 229, 229);
        display: flex;
        justify-content: space-between;
        padding: 10px 30px;
        align-items: center;
    }

    .info {
        background-color: rgb(255, 255, 255);
        display: flex;
        justify-content: space-between;
        padding: 10px 30px;
        align-items: center;
    }
</style>