import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Home from './pages/Home';
import Main from './pages/Main';
import HotelDetail from './pages/HotelDetail';
import BookingDetail from './pages/BookingDetail';

function App() {
    return (
        <>
            <Router>
                <div className="">
                    {/* <Header /> */}
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/main' element={<Main />} />
                        <Route path="/main/hotels/:id" element={<HotelDetail />} />
                        <Route path="/bookings/:id" element={<BookingDetail />} />
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
