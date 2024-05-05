<script setup lang="ts">

    const emit = defineEmits(['decision'])

    function decision(decision) {
        emit("decision", decision)
    }

</script>

<template>
    <div class="confirmation-buttons">
      <div>
        <button class="confirm-button" @click.prevent="decision(true)">
          Confirm
        </button>
      </div>
      <div>
        <button class="decline-button" @click.prevent="decision(false)">
          Decline
        </button>
      </div>
    </div>
  </template>
  
  <style scoped>
    .confirmation-buttons {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
    }
  
    .confirm-button,
    .decline-button {
      padding: 10px 20px;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    .confirm-button {
      background-color: #28a745; /* Zielony kolor tła */
      color: #fff; /* Biały kolor tekstu */
    }
  
    .decline-button {
      background-color: #dc3545; /* Czerwony kolor tła */
      color: #fff; /* Biały kolor tekstu */
    }
  
    .confirm-button:hover,
    .decline-button:hover {
      filter: brightness(90%); /* Zmniejszenie jasności przycisku po najechaniu na niego */
    }
  </style>
  