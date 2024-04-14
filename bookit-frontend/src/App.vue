<script setup>
    import Menu from './components/Menu.vue';
    import useAuthorize from './composables/authorize';

    const {
        authorized
    } = useAuthorize()

</script>

<template>
    <Menu v-if="authorized"></Menu>
    <router-view></router-view>
    
</template>

<style scoped>
</style>
