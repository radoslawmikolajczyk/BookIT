<template>
  <div class="join-group-container">
    <div class="group-info">
      <h4>Group name:</h4>
      <p>{{ props.group.name }}</p>
    </div>

    <div v-if="props.group.id != getUserGroupId()" class="password-input">
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" />
    </div>

    <div v-if="props.group.id != getUserGroupId()" class="join-button">
      <button @click.prevent="joinGroup">Join</button>
    </div>

    <div v-if="props.group.id != getUserGroupId()" class="message" :style="{'color': messageColor }">
      {{ message }}
    </div>

    <div v-if="props.group.id == getUserGroupId()" class="message" :style="{'color': 'green' }">
        You are added to this group
    </div>

  </div>
</template>

  
  <script setup lang="ts">
  import { defineProps, ref } from 'vue';
  import { Group } from '../../model/Group';
  import { GroupsService } from '../../services/GroupsService';
  import { UserService } from '../../services/UserService';
  import { UserGroupRequest } from '../../model/UserGroupRequest';
  import stateManager from '../../composables/stateManager';
  import { useRouter } from 'vue-router';

  interface Props {
    group: Group
  }

  const { authorizedUser, assignedGroup } = stateManager();
  const service = new GroupsService();
  const userService = new UserService();
  const props = defineProps<Props>();
  const password = ref("");
  const message = ref("");
  const messageColor = ref("green")
  const router = useRouter();

  function joinGroup() {
    service.addUserToGroup(new UserGroupRequest(authorizedUser.value?.email ?? "", props.group.name, password.value)).then((result) => {
        if(result.isSuccess) {
            userService.getUserByEmail(authorizedUser.value?.email ?? "").then((result) => {
              authorizedUser.value = result.user
              assignedGroup.value = props.group
            })
        } else {
            message.value = "Wrong password!"
            messageColor.value = "red"
        }
    }, error => {
      console.error(error)
    });
  }

  function getUserGroupId() : Number | undefined {

    console.log(authorizedUser)
    return assignedGroup?.value?.id ?? -1
  }

  </script>
  
  <style scoped>
.join-group-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #b3e0ff; /* Light blue background */
  border-radius: 8px;
  width: 100%; /* Responsive width */
  max-width: 200px; /* Maximum width to keep the form readable */
  margin: 20px auto;
}

.group-info {
  background-color: #e0efff; /* Slightly lighter shade of blue */
  padding: 10px;
  border-radius: 5px;
  width: 100%; /* Ensures full width within the container */
  text-align: center; /* Centers text */
  margin-bottom: 20px;
}

.password-input {
  background-color: #e0efff;
  padding: 10px;
  border-radius: 5px;
  width: 100%; /* Ensures the div matches the width of its container */
  margin-bottom: 20px;
}

.password-input label {
  color: #003366; /* Dark blue text */
  margin-bottom: 5px;
}

.password-input input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Corrects sizing to include padding and border */
}

.join-button button {
  width: 100%;
  padding: 10px;
  background-color: #007bff; /* Consistent blue button */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.join-button button:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

.message {
  font-style: italic;
  color: #c01e09; /* Red text for messages */
  margin-top: 10px;
}
</style>

  