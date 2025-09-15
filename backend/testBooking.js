const axios = require('axios');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzdmZTA2YTBmNjVlNzdhY2YxN2UwYSIsImlhdCI6MTc1NzkzOTIxOSwiZXhwIjoxNzYwNTMxMjE5fQ.LOOxX2WoubD2Bs70Ik2F9C6_0wrCaoieU_04mRb90_c";
const ticketId = "68c7c630422e46736802326a";

async function makeBooking() {
  try {
    const res = await axios.post('http://localhost:5000/api/bookings', {
      tickets: [{ ticketId, quantity: 2 }],
      paymentMethod: "stripe",
      contactInfo: {
        name: "Test User",
        email: "test1@example.com",
        phone: "+11234567890"
      },
      eventDate: "2025-11-19T00:00:00.000Z",
      notes: "N/A"
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(res.data);
  } catch (err) {
    console.error("Error creating booking:", err.response?.data || err.message);
  }
}

makeBooking();
