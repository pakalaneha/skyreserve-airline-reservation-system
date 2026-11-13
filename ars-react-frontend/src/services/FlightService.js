import API from "./Api";

const getFlights = () => {
    return API.get("/flights");
};

const addFlight = (flight) => {
    return API.post("/flights", flight);
};

const getFlight = (id) => API.get(`/flights/${id}`);

const searchFlights = ({ from, to, date }) =>
    API.get("/flights/search", { params: { from, to, date } });

const updateFlight = (id, flight) => API.put(`/flights/${id}`, flight);

const deleteFlight = (id) => API.delete(`/flights/${id}`);

const getReservedSeats = (id, flightClass) => API.get(`/flights/${id}/seats`, { params: { flightClass } });

export default {
    getFlights,
    addFlight,
    getFlight,
    searchFlights,
    updateFlight,
    deleteFlight,
    getReservedSeats
};
