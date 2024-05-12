<template>
    <img :src="imageUrl"/>
</template>

<script setup lang="ts">

 interface Props {
    src: string
}

const props = defineProps<Props>()
const imageUrl = new URL(props.src, import.meta.url).href

</script>