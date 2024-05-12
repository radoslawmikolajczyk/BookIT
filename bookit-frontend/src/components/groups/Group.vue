<template>
    <div class="join-group-container">
      <div class="group-info">
        <p>Group name:</p>
        <p>{{ props.group.name }}</p>
      </div>
  
      <div class="password-input">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
      </div>
  
      <div class="join-button">
        <button @click.prevent="joinGroup()">Join</button>
      </div>
  
      <div class="message">
        {{ message }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, ref } from 'vue';
  import { Group } from '../../model/Group';
  import { GroupsService } from '../../services/GroupsService';
  import { UserGroupRequest } from '../../model/UserGroupRequest';
  import stateManager from '../../composables/stateManager';
  
  interface Props {
    group: Group
  }

  const { authorizedUser } = stateManager();
  const service = new GroupsService();
  const props = defineProps<Props>();
  const password = ref("");
  const message = ref("");
  
  function joinGroup() {
    service.addUserToGroup(new UserGroupRequest(authorizedUser.value?.email ?? "", props.group.name, password.value)).then((result) => {
        if(result.isSuccess) {
            message.value = "You have been added to the group!"
        } else {
            message.value = "Error occured while adding to the group!"
        }
    });
  }
  </script>
  
  <style scoped>
  .join-group-container {
    width: 100px;
    margin: 0 auto;
  }
  
  .group-info {
    margin-bottom: 20px;
  }
  
  .password-input input {
    width: 90px;
    margin-bottom: 20px;
  }
  
  .password-input label {
    display: block;
    margin-bottom: 5px;
  }
  
  .join-button {
    text-align: center;
  }
  
  .join-button button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .message {
    margin-top: 20px;
    font-style: italic;
  }
  </style>
  