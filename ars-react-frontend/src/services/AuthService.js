import API from "./Api";

const login = (user) => {
    return API.post("/auth/login", user);
};

const register = (user) => {
    return API.post("/auth/register", user);
};

export default {
    login,
    register
};