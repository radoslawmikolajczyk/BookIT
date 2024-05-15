<script setup lang="ts">
    import stateManager from '../../composables/stateManager.ts';
    import { useRouter } from 'vue-router';
    import { Section } from '../../enums/section.ts';
import { ref, watch } from 'vue';

    const { openSection, assignedGroup } = stateManager()
    const router = useRouter()

    watch(assignedGroup, () => {
        console.log("zmiana kurwa")
    },
    { deep: true })

    function goToGroups() {
        router.push('/groups');
    }

</script>

<template>
    <div class="container">
        <div v-if="assignedGroup" class="assigned">
            <p>Your are assigned to: <span class="group-name">{{ assignedGroup.name }}</span></p>
            <button v-if="openSection != Section.GROUPS" @click.prevent="goToGroups" class="action-button">Change Group</button>
        </div>

        <div v-if="!assignedGroup" class="not-assigned">
            <p>Your are not assigned to any group. Please select a group!</p>
            <button v-if="openSection != Section.GROUPS" @click.prevent="goToGroups" class="action-button">Select Group</button>
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
