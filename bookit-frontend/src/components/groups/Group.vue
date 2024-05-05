<script setup lang="ts">
    import { onBeforeMount, ref } from 'vue';
    import { Group } from '../../model/Group';
    import { GroupsService } from '../../services/GroupsService';
    import { UserGroupRequest } from '../../model/UserGroupRequest';
    import stateManager from '../../composables/stateManager';

     interface Props {
        group: Group
    }

    const { authorizedUser } = stateManager()
    const service = new GroupsService()
    const props = defineProps<Props>()
    const password = ref("")
    const message = ref("")

    function joinGroup() {
        service.addUserToGroup(new UserGroupRequest(authorizedUser.value?.email ?? "", props.group.name, password.value)).then((result) => {
            if(result.isSuccess) {
                message.value = "You have been added to the group!"
            } else {
                message.value = "Error occured while adding to the group!"
            }
        })
    }

</script>

<template>
    <div>
        <div>
            <p>
                 {{ props.group.name }}
            </p>
        </div>

        <div>
            <input type="password" v-model="password" />
        </div>
        <div>
            <button v-on:click.prevent="joinGroup()">Join</button>
        </div>
        <div>
            {{ message }}
        </div>
    </div>
</template>

<style scoped>
   
</style>