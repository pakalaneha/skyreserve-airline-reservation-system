package com.ars.service;

import java.util.List;

import com.ars.entity.Airport;

public interface AirportService {

    Airport createAirport(Airport airport);

    Airport getAirportById(Integer airportId);

    Airport getAirportByCode(String airportCode);

    List<Airport> getAllAirports();

    Airport updateAirport(Integer airportId, Airport airportDetails);

    void deleteAirport(Integer airportId);
}