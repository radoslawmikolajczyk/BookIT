<template>
    <div @click="open" v-on-click-outside="close" class="container">
      
      <div v-if="!isOpen" class="content">
        <slot name="closedContent"></slot>
      </div>

      <div v-if="isOpen" class="content">
        <slot name="openContent"></slot>
      </div>

      <div class="arrow" v-if="!isOpen">
        <slot name="arrow"></slot>
      </div>

    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { vOnClickOutside } from '@vueuse/components';
  
  const isOpen = ref(false);
  
  function open() {
    isOpen.value = true;
  }
  
  function close() {
    isOpen.value = false;
  }
  </script>
  
  <style scoped>
  .container {
    border: 1px solid #ddd;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
  }
  
  .container:hover {
    background-color: #e9e9e9;
  }
  
  .content {
    width: 100%;
  }
  
  .arrow {
    display: block;
    color: #555;
    text-align: center;
    font-size: 17px;
    margin-bottom: 5px;
  }
  </style>
  