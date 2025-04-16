import axios from 'axios';

const API_URL = 'http://localhost:3080/api/v1/';

// Get All Hotels
const getAllHotels = async () => {    
    const response = await axios.get(API_URL + 'hotels');
    if (response.data) {
        
    }
    console.log(response.data);
    return response.data;
}

// Get Hotel
const getHotel = async (hotelId) => {
    const response = await axios.get(API_URL + 'hotels/' + hotelId);
    if (response.data) {
        
    }
    console.log(response.data);
    return response.data;
}

const hotelService = {
    getAllHotels,
    getHotel,
}

export default hotelService;
