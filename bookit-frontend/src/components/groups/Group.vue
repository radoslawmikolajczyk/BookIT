<script setup lang="ts">
    import { onBeforeMount, ref } from 'vue';
    import { Group } from '../../model/Group';

     interface Props {
        group: Group,
        open: boolean
    }

    const props = defineProps<Props>()
    const password = ref("")

    function joinGroup() {
        // dopisać dołączenie do grupy
        // wyświetlić komunikat, że się udało lub, że się nie udało
        // jak się udało to wyświetlić w tabeli, że użytkownik należy już do tej grupy
    }

    onBeforeMount(() => {
        // zaznaczyć, że ktoś należy do jakiejś grupy i wyświetlić wtedy komunikat
    })

</script>

<template>
    <div>
        <div>
            <p>
                 {{ props.group.name }}
            </p>
        </div>
        <div v-if="props.open">
            <input type="password" v-model="password" />
        </div>
        <div v-if="props.open">
            <button v-on:click.prevent="joinGroup()">Join</button>
        </div>
    </div>
</template>

<style scoped>
   
</style>