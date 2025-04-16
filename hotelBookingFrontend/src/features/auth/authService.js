import axios from 'axios';

const API_URL = 'http://localhost:3080/api/v1/';

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + 'auth/register/', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    console.log(response.data);
    return response.data;
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'auth/login', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    console.log(response.data);
    return response.data;
}

// Login user
const getAllHotels = async (userData) => {
    const response = await axios.get(API_URL + 'hotels');
    if (response.data) {
        
    }
    console.log(response.data);
    return response.data;
}

// Logout user
const logout = () => {
    localStorage.setItem('user', null);
}

const authService = {
    register,
    logout,
    login,
    getAllHotels,
}

export default authService;
