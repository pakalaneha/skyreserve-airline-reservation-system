import API from "./Api";

const getFlights = () => {
    return API.get("/flights");
};

const createBooking = (userId, flightId, flightClass, passengers) => {
    return API.post(
        `/bookings?userId=${userId}&flightId=${flightId}&flightClass=${flightClass}`,
        passengers
    );
};

const getBookings = (userId) => {
    return API.get(`/bookings/user/${userId}`);
};

const getBooking = (bookingId) => {
    return API.get(`/bookings/${bookingId}`);
};

const cancelBooking = (bookingId) => {
    return API.put(`/bookings/${bookingId}/cancel`);
};

const getAllBookings = () => {
    return API.get("/bookings");
};

const getPassengers = (bookingId) => API.get(`/passengers/booking/${bookingId}`);

export default {
    getFlights,
    createBooking,
    getBookings,
    getBooking,
    cancelBooking,
    getAllBookings,
    getPassengers
};
