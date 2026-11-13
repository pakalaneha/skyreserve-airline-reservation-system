package com.ars.service;

import java.util.List;

import com.ars.entity.Airplane;

public interface AirplaneService {

    Airplane createAirplane(Airplane airplane);

    Airplane getAirplaneById(Integer airplaneId);

    Airplane getAirplaneByRegistrationNo(String registrationNo);

    List<Airplane> getAllAirplanes();

    Airplane updateAirplane(Integer airplaneId, Airplane airplaneDetails);

    void deleteAirplane(Integer airplaneId);
}