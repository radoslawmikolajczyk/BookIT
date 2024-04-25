<script setup lang="ts">
    import stateManager from '../../composables/stateManager';
    import Group from './Group.vue';
    import GroupFilter from './GroupFilter.vue';
    import ClosableSection from '../commons/ClosableSection.vue';
    import GroupCreation from './GroupCreation.vue';
    const { openCreateGroupSection } = stateManager()
    // const groups = ref([""])
    // let group = ref("")
    
    // const services = new GroupsService()

    // function getAllGroups() {
    //     services.getAllGroups()
    //     .then( result => {
    //             groups.value = result
    //         }
    //     )
    // }

    // function getGroupById(id) {
    //     services.getGroupById(id)
    //     .then( result => {
    //             console.log(result)
    //         }
    //     )
    // }

    // function createGroups() {
    //     services.createGroups()
    //     .then( result => {
    //             group.value = result
    //         }
    //     )
    // }

    // function addUserToGroup() {
    //     services.addUserToGroup()
    //     .then( result => {
    //             group.value = result
    //         }
    //     )
    // }

function closeSection() {
    openCreateGroupSection.value = false
}

</script>

<template>
    <div>
        <GroupFilter></GroupFilter>
    </div>
    <div v-if="openCreateGroupSection">
        <ClosableSection @close="closeSection">
            <GroupCreation></GroupCreation>
        </ClosableSection>
    </div>
    <div style="overflow: auto; max-height: 80vh;">
        <Group></Group>
        <Group></Group>
        <Group></Group>
        <Group></Group>
    </div>
</template>

<style scoped>
    
</style>