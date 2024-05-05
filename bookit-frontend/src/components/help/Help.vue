<template>
  <div class="faq-container">
    <h1>Frequently Asked Questions</h1>
    <ul>
      <li>
        <strong>Can I cancel my reservation?</strong>
        <p>You can cancel your booking by deleting it in the ‘Bookings’ tab.</p>
      </li>
      <li>
        <strong>How can I edit my reservation?</strong>
        <p>It is not possible to edit your booking. You have to delete your booking in the ‘Bookings’ tab and make a new one.</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.faq-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9; /* Jasny odcień szarości */
  border-radius: 10px; /* Zaokrąglone rogi */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Cień */
}

.faq-container h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333; /* Kolor tekstu */
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
  margin-left: 20px;
  font-size: 16px;
  color: #666; /* Odcień szarości */
}
</style>
