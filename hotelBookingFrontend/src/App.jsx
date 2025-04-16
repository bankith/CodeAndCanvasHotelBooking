import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Home from './pages/Home';
import Main from './pages/Main';
import HotelDetail from './pages/HotelDetail';

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
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
