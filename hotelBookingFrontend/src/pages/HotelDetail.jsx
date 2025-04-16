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
                </div>
            </div>
            : null}
            {/* {id} */}
        </>
    );
}

export default HotelDetail;
