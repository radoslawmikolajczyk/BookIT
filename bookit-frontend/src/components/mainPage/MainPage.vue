<template>

    <div class="main-container">
        <div class="image-container">
            <Suspense>
                <template #default>
                    <Image src="../../assets/img/main.png" class="main-image"/>
                </template>
                <template #fallback>
                    <Image src="../../assets/img/placeholder.webp" class="main-image"/>
                </template> 
            </Suspense>
        </div>
        <div class="group">
            <GroupAssigned></GroupAssigned>
        </div>
        <div class="reservation">
            <CurrentBookings></CurrentBookings>
        </div>
    </div>

</template>

<script setup>
import GroupAssigned from '../groups/GroupAssigned.vue';
import CurrentBookings from '../myBookings/CurrentBookings.vue';
import { defineAsyncComponent, onBeforeMount, onMounted } from 'vue'
import stateManager from '../../composables/stateManager';
import { Section } from '../../enums/section';

const Image = defineAsyncComponent(() =>
  import('../commons/Image.vue')
)

const { openSection } = stateManager()

onMounted(() => {
    openSection.value = Section.MAINPAGE
})

</script>

<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.image-container {
    width: 90%;
    margin-top: 20px;
}

.main-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.group,
.reservation {
    width: 90%;
    margin-top: 20px; 
}
</style>
