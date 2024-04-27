<script setup lang="ts">
    import { Group } from '../../model/Group';

     interface Props {
        group: Group
    }

    const props = defineProps<Props>()

</script>

<template>
    <div>
        <p>
            {{ props.group.name }}
        </p>
    </div>
</template>

<style scoped>
   
</style>