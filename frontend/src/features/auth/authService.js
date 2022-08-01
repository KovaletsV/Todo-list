import axios from "axios";

//1. create api url
const API_URL = "/api/users/";

//2. Register user
const register = async userData => {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

// Login user (pass to authSlice)
const login = async userData => {
    const response = await axios.post(API_URL + "login", userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem("user");
};

const authService = {
    register,
    logout,
    login
};

export default authService;
