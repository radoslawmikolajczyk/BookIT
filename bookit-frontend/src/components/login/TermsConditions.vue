<template>
    <div class="background-image"></div>
    <div class="terms-container">
      <h1>Terms &amp; Conditions</h1>
      <ol>
        <li>Acceptance of Terms: By accessing or using the UEK Room Reservation System application (henceforth referred to as "the application"), you agree to be bound by these Terms & Conditions, as well as all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing the application.</li>
        <li>User Accounts: To access certain features of the application, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</li>  
        <li>Use of the Application: The application is provided solely for the purpose of facilitating room reservations at the University of Economics in Krakow. You agree not to use the application for any unlawful purpose or in any way that could damage, disable, overburden, or impair the application.</li>  
        <li>Intellectual Property: All content and materials available in the application, including but not limited to text, graphics, logos, button icons, images, audio clips, and software, are the property of the University of Economics in Krakow and are protected by applicable copyright and trademark law.</li>  
        <li>Privacy Policy: Your use of the application is subject to our Privacy Policy, which outlines how we collect, use, and disclose your personal information. By using the application, you consent to the terms of our Privacy Policy.</li>        
        <li>By using the UEK Room Reservation System application, you signify your acceptance of these Terms & Conditions. If you do not agree to these Terms & Conditions, please do not use the application.</li>  
      </ol>
  
      <button @click="back" class="btn btn-secondary">Back</button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  function back() {
    router.back();
  }
  </script>
  
  <style scoped>
  .terms-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    background-color: #f4f4f4;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  .background-image {
    position: absolute; /* Ustawienie pozycji absolutnej, aby tło z obrazkiem było na tyle */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/img/background.jpg'); /* Dodanie tła z obrazkiem */
    background-size: cover; /* Dopasowanie rozmiaru tła do kontenera */
    border-radius: 10px; /* Zaokrąglenie rogów, aby pasowało do kontenera */
    z-index: -1; /* Ustawienie niższego indeksu warstwy, aby tło było pod formularzem */
  }


  h1 {
    margin-bottom: 20px;
  }
  
  ol {
    list-style-type: decimal;
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  .btn {
    cursor: pointer;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: #fff;
  }
  
  .btn-secondary:hover {
    background-color: #5a6268;
  }
  </style>
  