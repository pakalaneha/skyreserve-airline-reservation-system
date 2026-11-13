import API from "./Api";

const getAllAirports = () => API.get("/airports");

const addAirport = (airport) => API.post("/airports", airport);

const updateAirport = (id, airport) =>
    API.put(`/airports/${id}`, airport);

const deleteAirport = (id) =>
    API.delete(`/airports/${id}`);

export default {
    getAllAirports,
    addAirport,
    updateAirport,
    deleteAirport
};