package com.ars.service;

import java.time.LocalDate;
import java.util.List;

import com.ars.entity.Flight;

public interface FlightService {

    Flight createFlight(Flight flight);

    Flight getFlightById(Integer flightId);

    Flight getFlightByNumber(String flightNumber);

    List<Flight> searchFlights(String depCode, String arrCode, LocalDate travelDate);

    List<Flight> getAllFlights();

    Flight updateFlight(Integer flightId, Flight flightDetails);

    void deleteFlight(Integer flightId);
}