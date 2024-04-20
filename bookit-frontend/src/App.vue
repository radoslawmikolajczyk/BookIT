<script setup>
    import Menu from './components/Menu.vue';
    import { useStore } from 'vuex';
    const store = useStore()
</script>

<template>
    <Menu v-if="store.state.authorized"></Menu>
    <router-view></router-view>
    
</template>

<style scoped>
</style>
