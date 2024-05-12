<script setup lang="ts">
    import { Group } from '../../model/Group';

    interface Props {
        group: Group
    }

    const props = defineProps<Props>()

</script>

<template>
    <div class="group-container">
        <p>
            {{ props.group.name }}
        </p>
    </div>
</template>

<style scoped>
  .group-container {
    width: 80px;
    margin: 0 auto;
  }
</style>