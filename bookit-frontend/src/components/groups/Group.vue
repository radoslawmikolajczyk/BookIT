<script setup lang="ts">
    import { ref } from 'vue';
    import { vOnClickOutside } from '@vueuse/components'
    import { Group } from '../../model/Group';

     interface Props {
        group: Group
    }

    const props = defineProps<Props>()
    const password = ref("")

    function joinGroup() {
        // dopisać dołączenie do grupy
        // wyświetlić komunikat, że się udało lub, że się nie udało
        // jak się udało to wyświetlić w tabeli, że użytkownik należy już do tej grupy
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
    </div>
</template>

<style scoped>
   
</style>