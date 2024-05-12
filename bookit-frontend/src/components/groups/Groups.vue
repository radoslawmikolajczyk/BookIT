<script setup lang="ts">
    import stateManager from '../../composables/stateManager';
    import { onBeforeMount, ref, watch } from 'vue';
    import { GroupsService } from '../../services/GroupsService';
    import { Group as GroupModel } from '../../model/Group';
    import GroupAssigned from '../groups/GroupAssigned.vue';
    import GroupSearch from './GroupSearch.vue';
    import TableRow from '../commons/TableRow.vue';
    import GroupClosed from './GroupClosed.vue';
    import Group from './Group.vue';

    const { searchField } = stateManager();
    const groupModels = ref<GroupModel[] | null>(null);
    const groupModelsBackup = ref<GroupModel[] | null>(null);
    const groupsService = new GroupsService();

    watch(searchField, () => {
        filterGroups();
    });

    onBeforeMount(() => {
        getAllGroups();
        filterGroups();
    });

    function getAllGroups() {
        groupsService.getAllGroups().then((result) => {
            groupModelsBackup.value = result.groups;
            groupModels.value = result.groups;

            if (searchField != null && searchField.value != "") {
                filterGroups();
            }
        });
    }

    function filterGroups() {
        groupModels.value = groupModelsBackup.value;

        const temp = groupModels.value?.filter((g) => {
            return g.name.toLowerCase().includes(searchField.value.toLowerCase());
        });

        groupModels.value = []

        temp?.forEach((g) => {
            groupModels.value?.push(g);
        });
    }

</script>

<template>
    <div class="group-management">
        <div class="group-management-content">
            <div class="group-info">
                <GroupAssigned></GroupAssigned>
            </div>

            <GroupSearch></GroupSearch>

            <div class="table-row-scroll">
                <TableRow v-for="group in groupModels" :key="group.id">
                    <template #closedContent>
                        <GroupClosed :group="group"></GroupClosed>
                    </template>
                    
                    <template #openContent>
                        <Group :group="group"></Group>
                    </template>

                    <template #arrow>
                        <p>▼</p>
                    </template>
                </TableRow>
            </div>
        </div>
    </div>
</template>

<style scoped>
.group-management {
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.group-management-content {
    width: 90%;
    padding: 20px;
}

.group-info {
    width: 100%;
    margin-bottom: 20px;
}

.table-row-scroll {
    overflow-y: auto;
    padding-bottom: 20px;
    height: 50vh;
    margin-top: 10px;
}

.table-row-scroll::-webkit-scrollbar {
    height: 80px;
}

.table-row-scroll::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
}

.table-row-scroll::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>
