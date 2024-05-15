<template>
    <div class="faq-container">
      <ul>
        <li>
          <strong>{{ filterMessage }}</strong>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import stateManager from '../../composables/stateManager';
  const { filterMessage } = stateManager()

  </script>

  <style scoped>
  .faq-container {
    max-width: 90vw;
    margin: auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  .faq-container h1 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }
  
  .faq-container ul {
    padding-left: 20px;
  }
  
  .faq-container li {
    margin-bottom: 20px;
  }
  
  .faq-container li strong {
    font-weight: bold;
  }
  
  .faq-container p {
    margin-top: 5px;
    /* margin-left: 20px; */
    font-size: 16px;
    color: #666;
  }
  </style>
  