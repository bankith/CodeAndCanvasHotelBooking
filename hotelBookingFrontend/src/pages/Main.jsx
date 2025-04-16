import { useState, useEffect, Link } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset, getAllHotels } from '../features/auth/authSlice';
import myPic from '/src/assets/react.svg';

function Main() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [allHotels, setAllHotels] = useState([]);

    const { user, isLoading, isError, isSuccess, message, hotels } = useSelector((state) => state.auth);
    

    const handleViewDetails = (id) => {
        navigate(`/main/hotels/${id}`);
    };

    useEffect(() => {
        dispatch(getAllHotels());
    }, []);

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

    useEffect(() => {
        if(hotels){
            const hotelsNew = hotels.map(hotel => ({
                ...hotel,
                profileimageurl: hotel.profileimageurl || "/src/assets/hotels/no-image.jpg"
            }));
            setAllHotels(hotelsNew);
        }

    }, [hotels]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = { email, password };
        dispatch(login(userData));
    };

    return (
        <>
            <section className="heading">
                {/* <img src={myPic} alt="My Pic" /> */}
                            
            </section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {allHotels.map(hotel => (
                <div
                    key={hotel.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
                >
                    {hotel.profileimageurl ? <img
                    src={hotel.profileimageurl}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                    />: null}
                    
                    <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-xl font-semibold mb-1">{hotel.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">{hotel.address}</p>
                        <p className="text-sm text-gray-600 mb-1">{hotel.region}</p>
                        <p className="text-sm text-gray-600 mb-4">Tel: {hotel.tel}</p>

                        <div className="mt-auto">
                            <button
                                onClick={() => handleViewDetails(hotel.id)}
                                className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </>
    );
}

export default Main;
