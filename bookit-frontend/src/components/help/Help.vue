<template>
  <div class="faq-container">
    <h1>Frequently Asked Questions</h1>
    <ul>
      <li>
        <strong>How can I add my reservation?</strong>
        <p>You need to go to the "Schedule" tab. The next step is to filter the specific day using the available options. This is intended to verify whether such reservations already exist. After filtering, a message will appear indicating whether you can create a reservation or if it is not possible.</p>
      </li>
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
