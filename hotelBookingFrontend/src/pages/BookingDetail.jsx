import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBooking } from '../features/booking/bookingSlice';
import { useDispatch } from 'react-redux';

function BookingDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      const res = await dispatch(getBooking(id));
      if (res.payload?.data) {
        setBooking(res.payload.data);
      }
    };

    fetchBooking();
  }, [id, dispatch]);

  if (!booking) return <div className="text-center mt-10">Loading booking...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
      <p><strong>Hotel:</strong> {booking.hotel?.name}</p>
      <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
      <p><strong>Booking ID:</strong> {booking._id}</p>

      {booking.qrCodeImage && (
        <div className="mt-6 text-center">
          <img src={booking.qrCodeImage} alt="QR Code" className="mx-auto" style={{ width: 180 }} />
        </div>
      )}
    </div>
  );
}

export default BookingDetail;
