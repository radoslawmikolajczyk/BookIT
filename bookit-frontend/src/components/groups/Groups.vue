<script setup lang="ts">
    import stateManager from '../../composables/stateManager';
    import Group from './Group.vue';
    import { Group as GroupModel } from '../../model/Group';
    import GroupSearch from './GroupSearch.vue';
    import ClosableSection from '../commons/ClosableSection.vue';
    import { onBeforeMount, ref, watch } from 'vue';
    import { GroupsService } from '../../services/GroupsService';
    import GroupAddButton from './GroupAddButton.vue';
    import GroupAddForm from './GroupAddForm.vue';
    import TableRow from '../commons/TableRow.vue';

    const { openCreateGroupSection, searchField } = stateManager()
    const groupModels = ref<[GroupModel] | null>(null)
    const groupModelsBackup = ref<[GroupModel] | null>(null)
    const groupsService = new GroupsService()

    function closeSection() {
        openCreateGroupSection.value = false
    }

    watch(searchField, () => {
        filterGroups()
    })

    onBeforeMount(() => {
       getAllGroups()
       filterGroups()
    })

    function getAllGroups() {
        groupsService
        .getAllGroups()
        .then( result =>{

            groupModelsBackup.value = result.groups
            groupModels.value = result.groups

            if (searchField != null && searchField.value != "") {
                filterGroups()
            }
        })
    }

    function filterGroups() {
        groupModels.value = groupModelsBackup.value
        var temp = groupModels.value?.filter((g) => { 
            return g.name.includes(searchField.value)
        })

        // workaround
        groupModels.value = [new GroupModel(1,"","")]
        groupModels.value.pop()

        temp?.forEach((g) => {
            groupModels.value?.push(g)
        })
    }

    function groupCreated() {
        closeSection()
        searchField.value = ""
    }

</script>

<template>
    <div>
        <GroupSearch></GroupSearch>
        <GroupAddButton></GroupAddButton>
    </div>
    <div v-if="openCreateGroupSection">
        <ClosableSection @close="closeSection">
            <GroupAddForm @add="groupCreated"></GroupAddForm>
        </ClosableSection>
    </div>
    <div style="overflow: auto; max-height: 80vh;">
        <!-- <Group v-for="group in groupModels" :group="group"></Group> -->
        <TableRow v-for="group in groupModels">
            <template #closedContent>
                <Group :group="group"></Group>
            </template>

            <template #openContent>
                <div>dupa 2</div>
            </template>
        </TableRow>
    </div>
</template>

<style scoped>
    
</style>