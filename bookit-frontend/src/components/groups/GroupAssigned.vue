<script setup lang="ts">
    import { onBeforeMount, ref } from 'vue';
    import stateManager from '../../composables/stateManager.ts';
    import { GroupsService } from '../../services/GroupsService.ts';
    import { useRouter } from 'vue-router';
    import { Section } from '../../enums/section.ts';

    enum GroupState {
        ASSIGNED,
        UNASSIGNED,
        UNDEFINED,
        ERROR
    }

    const { authorizedUser, openSection } = stateManager()
    const service = new GroupsService()
    const assigned = ref(GroupState.UNDEFINED)
    const groupName = ref("")
    const router = useRouter()

    onBeforeMount(() => {
        service.getGroupById(authorizedUser?.value?.group?.id ?? -1)
        .then((result) => {
            if(result.isSuccess){
                if(result.group) {
                    assigned.value = GroupState.ASSIGNED
                    groupName.value = result.group.name
                }else {
                    assigned.value = GroupState.UNASSIGNED
                }
            } else {
                assigned.value = GroupState.ERROR
            }
        })
    })

function goToGroups() {
    router.push('/groups');
}

</script>

<template>
    <div class="container">
        <div v-if="assigned == GroupState.ASSIGNED" class="assigned">
            <p>Your are assigned to: <span class="group-name">{{ groupName }}</span></p>
            <button v-if="openSection != Section.GROUPS" @click.prevent="goToGroups" class="action-button">Change Group</button>
        </div>

        <div v-if="assigned == GroupState.UNASSIGNED" class="not-assigned">
            <p>Your are not assigned to any group. Please select a group!</p>
            <button v-if="openSection != Section.GROUPS" @click.prevent="goToGroups" class="action-button">Select Group</button>
        </div>

        <div v-if="assigned == GroupState.ERROR" class="not-assigned">
            <p>Error occured during data fetching!</p>
        </div>
    </div>
</template>

<style scoped>

    .container {
        background-color: #b3e0ff;
    }

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
        color: black;
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
