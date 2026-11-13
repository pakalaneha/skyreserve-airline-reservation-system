import API from "./Api";

const getAllUsers = () => API.get("/users");

export default {
    getAllUsers
};