import axios from 'axios';

const API_URL = 'http://localhost:3080/api/v1/hotels/';

const createBooking = async (hotelId, bookingDate, userId) => {
  const token = JSON.parse(localStorage.getItem('user'))?.token;
  const response = await axios.post(`${API_URL}${hotelId}/bookings`, {
    bookingDate,
    user: userId,
  }, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

// bookingService.js
const getBooking = async (bookingId) => {
  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const response = await axios.get(
    `http://localhost:3080/api/v1/bookings/${bookingId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; // { success: true, data: {...} }
};

export default {
  createBooking,
  getBooking,
};
