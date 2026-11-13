import API from "./Api";

const getAllAirplanes = () => API.get("/airplanes");

const addAirplane = (plane) => API.post("/airplanes", plane);

const updateAirplane = (id, plane) => API.put(`/airplanes/${id}`, plane);

const deleteAirplane = (id) => API.delete(`/airplanes/${id}`);

export default {

    getAllAirplanes,
    addAirplane,
    updateAirplane,
    deleteAirplane

};
