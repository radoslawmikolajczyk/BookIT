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
    <div>
        <div v-if="assigned" class="assigned">
            <p>Your are assigned to: <span class="group-name">{{ groupName }}</span></p>
            <button class="action-button">Change Group</button>
        </div>
        <div v-else class="not-assigned">
            <p>Your are not assigned to any group. Please select a group!</p>
        </div>
    </div>
</template>

<style scoped>
    .assigned {
        color: navy;
        text-align: center;
        padding: 20px;
        border: 2px solid navy;
        border-radius: 10px;
        margin-top: 20px;
    }

    .assigned .group-name {
        font-weight: bold;
        text-transform: uppercase;
    }

    .not-assigned {
        color: red;
        text-align: center;
        padding: 20px;
        border: 2px solid #ccc;
        border-radius: 10px;
    }

    .action-button {
        padding: 10px 20px;
        background-color: navy;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .action-button:hover {
        background-color: #001f3f;
    }
</style>
