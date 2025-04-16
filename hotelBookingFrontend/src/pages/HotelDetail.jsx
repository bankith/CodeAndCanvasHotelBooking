import { useState, useEffect, Link } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { getHotel } from '../features/hotel/hotelSlice';

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
        if(!user){
            navigate('/');
        }

        dispatch(reset());
    }, [isError, isSuccess, user, message, navigate, dispatch]);


    return (
        <>
            <section className="heading">
                {/* <img src={myPic} alt="My Pic" /> */}
                            Test
            </section>
            {theHotel ? 
            <div className="max-w-4xl mx-auto p-4">
                {/* Big profile image */}
                <img
                    src={theHotel.profileimageurl}
                    alt={theHotel.name}
                    className="w-full h-80 object-cover rounded-xl shadow-md"
                />

                {/* Info */}
                <div className="mt-6 text-center space-y-2">
                    <h1 className="text-3xl font-bold text-gray-800">{theHotel.name}</h1>
                    <p className="text-gray-600">{theHotel.address}</p>
                    <p className="text-gray-600">📞 {theHotel.tel}</p>
                    <p className="text-gray-500 italic">📍 {theHotel.region}</p>
                </div>
            </div>
            : null}
            {/* {id} */}
        </>
    );
}

export default HotelDetail;
