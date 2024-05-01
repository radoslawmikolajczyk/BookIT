<script setup lang="ts">
    import { onBeforeMount, ref } from 'vue';
    import stateManager from '../../composables/stateManager.ts';
    import { GroupsService } from '../../services/GroupsService.ts';

    const { authorizedUser } = stateManager()
    const service = new GroupsService()
    const assigned = ref(false)
    const groupName = ref("")

    onBeforeMount(() => {
        service.getGroupById(authorizedUser?.value?.group?.id ?? -1)
        .then((result) => {
            if(result.isSuccess){
                assigned.value = true
                groupName.value = result.group.name
            } else {
                assigned.value = false
            }
        })
    })

</script>

<template>
    <div v-if="assigned" id="app">
        <p class="assigned">Your are assigned to: {{ groupName }} </p>
        <button></button>
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
        padding: 50px;
        border: 10px solid #999;
    }

    .not-assigned {
        color: rgb(235, 22, 15);
        text-transform: uppercase;
        margin: 10px 0;
        padding: 50px;
        border: 10px solid #fc0404;
    }
</style>