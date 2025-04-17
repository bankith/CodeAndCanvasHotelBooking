import { useState, useEffect, Link } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { getHotel } from '../features/hotel/hotelSlice';
import { createBooking } from '../features/booking/bookingSlice';
import { getBooking } from '../features/booking/bookingSlice';
import { QRCodeCanvas } from 'qrcode.react';

//Modal and Date
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Required for accessibility

function HotelDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [theHotel, setTheHotel] = useState(null);

    const { user } = useSelector((state) => state.auth);
    const { isLoading, isError, isSuccess, message, hotel } = useSelector((state) => state.hotel);


    useEffect(() => {
        dispatch(getHotel(id));
    }, []);

    useEffect(() => {
        setTheHotel(hotel);
    }, [hotel]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if (!user) {
            navigate('/');
        }

        dispatch(reset());
    }, [isError, isSuccess, user, message, navigate, dispatch]);

    //Modal and Date
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingDate, setBookingDate] = useState(new Date());

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [bookingDetail, setBookingDetail] = useState(null);

    const handleBooking = async () => {
        const currentUser = user || JSON.parse(localStorage.getItem('user'));
        if (!currentUser) {
            toast.error('You must be logged in to book.');
            return;
        }

        const res = await dispatch(createBooking({
            hotelId: id,
            bookingDate: bookingDate.toISOString(),
            userId: currentUser._id,
        }));

        if (res.payload?.data?._id) {
            const detailRes = await dispatch(getBooking(res.payload.data._id));
            if (detailRes.payload?.data) {
                setBookingDetail(detailRes.payload.data);
            }
        }
    };

    return (
        <>
            {theHotel ?
                <div className="mx-auto">
                    <iframe
                        src={"/gmap.html?name=" + theHotel.name + "&time=2000&animation=false&lat=" + theHotel.lat + "&long=" + theHotel.long + "&tilt=65&heading=-30&range=350&mode=hybrid"}
                        className="w-full h-125 shadow-md"
                        // style={{
                        //     position: "absolute",
                        //     top: 0,
                        //     left: 0,
                        //     width: "100%",
                        //     height: "100vh",
                        //     border: "none",
                        //     zIndex: 0, // background layer
                        // }}
                        title="3D Google Map"
                    />
                    {/* Big profile image */}


                    {/* Info */}
                    <div className="mt-6 text-center space-y-2">
                        <h1 className="text-3xl font-bold text-gray-800">{theHotel.name}</h1>
                        <p className="text-gray-600">{theHotel.address}</p>
                        <p className="text-gray-600">📞 {theHotel.tel}</p>
                        <p className="text-gray-500 italic">📍 {theHotel.region}</p>
                        <button onClick={openModal} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                            Book Now
                        </button>
                    </div>
                </div>
                : null}
            {/* {id} */}

            <Modal isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Booking Modal"
                className="max-w-md mx-auto mt-24 bg-white p-6 rounded shadow-lg"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                {bookingDetail ? (
                    <>
                        <h2 className="text-xl font-bold mb-4">Booking Confirmed ✅</h2>
                        <p><strong>Hotel:</strong> {bookingDetail.hotel?.name}</p>
                        <p><strong>Date:</strong> {new Date(bookingDetail.bookingDate).toDateString()}</p>
                        <p><strong>Booking ID:</strong> {bookingDetail._id}</p>

                        <div className="my-4 flex justify-center">
                            <img src={bookingDetail.qrCodeImage} alt="Booking QR Code" className="mx-auto my-4" style={{ width: '160px', height: '160px' }}/>
                        </div>

                        <div className="mt-4 text-center">
                            <button
                                onClick={() => {
                                    setBookingDetail(null);
                                    closeModal();
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Close
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-bold mb-4">Select Booking Date</h2>
                        <ReactDatePicker
                            selected={bookingDate}
                            onChange={(date) => setBookingDate(date)}
                            dateFormat="MMMM d, yyyy"
                            className="w-full px-4 py-2 border rounded" />
                        <div className="mt-4 flex justify-end space-x-2">
                            <button onClick={closeModal} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
                            <button onClick={handleBooking} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Confirm Booking</button>
                        </div>
                    </>
                )}
            </Modal>
        </>
    );
}

export default HotelDetail;
