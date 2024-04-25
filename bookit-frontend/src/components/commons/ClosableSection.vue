<script setup lang="ts">
    const emit = defineEmits(['close'])

    function close() {
        emit('close')
    }
</script>

<template>
    <div class="ShowHide" id="Bar">
        <div id="right">
            <button class="btn btn-outline-dark" v-on:click.prevent = "close()">X</button>
        </div>
        <div id="left">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.ShowHide {
  overflow: hidden;
  font-family: Arial, Helvetica, sans-serif;
  color: #FFFFFF;
  padding:4px;
  border-style: solid;
  border-width: 2px;
}
#left {
  overflow: hidden;
  text-align: center;
}
#right {
  float: right;
  width: 30px;
  height: 20px;
  text-align: center;
}
.ShowHide button {
   color: #FFFFFF;
   text-decoration: none;
}
.ShowHide button:hover {
   text-decoration:underline;
}
</style>