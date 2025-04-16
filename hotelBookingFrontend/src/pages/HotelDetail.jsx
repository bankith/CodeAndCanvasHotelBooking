import { useState, useEffect, Link } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset, getAllHotels } from '../features/auth/authSlice';
import myPic from '/src/assets/react.svg';

function HotelDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();    

    const [allHotels, setAllHotels] = useState([]);

    const { user, isLoading, isError, isSuccess, message, hotels } = useSelector((state) => state.auth);
    

    useEffect(() => {
        // dispatch(getAllHotels());
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


    return (
        <>
            <section className="heading">
                {/* <img src={myPic} alt="My Pic" /> */}
                            
            </section>
            {id}
        </>
    );
}

export default HotelDetail;
