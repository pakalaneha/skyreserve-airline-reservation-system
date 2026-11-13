package com.ars.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ars.entity.Airplane;
import com.ars.entity.Airport;
import com.ars.entity.Flight;
import com.ars.message.ApplicationMessages;
import com.ars.repo.AirplaneRepo;
import com.ars.repo.AirportRepo;
import com.ars.repo.FlightRepo;

@Service
public class FlightServiceImpl implements FlightService {

    @Autowired
    private FlightRepo flightRepo;

    @Autowired
    private AirportRepo airportRepo;

    @Autowired
    private AirplaneRepo airplaneRepo;

    @Autowired
    private ApplicationMessages messages;

    @Override
    public Flight createFlight(Flight flight) {
        if (flightRepo.findByFlightNumber(flight.getFlightNumber()).isPresent()) {
            throw new RuntimeException(messages.get("app.message.flight.number-already-exists",
                    flight.getFlightNumber()));
        }

        // Fetch fully populated managed entities for departure airport, arrival airport, and airplane
        if (flight.getDepartureAirport() != null && flight.getDepartureAirport().getAirportId() != null) {
            Airport dep = airportRepo.findById(flight.getDepartureAirport().getAirportId())
                    .orElseThrow(() -> new RuntimeException(messages.get(
                            "app.message.flight.departure-airport-not-found-id",
                            flight.getDepartureAirport().getAirportId())));
            flight.setDepartureAirport(dep);
        }

        if (flight.getArrivalAirport() != null && flight.getArrivalAirport().getAirportId() != null) {
            Airport arr = airportRepo.findById(flight.getArrivalAirport().getAirportId())
                    .orElseThrow(() -> new RuntimeException(messages.get(
                            "app.message.flight.arrival-airport-not-found-id",
                            flight.getArrivalAirport().getAirportId())));
            flight.setArrivalAirport(arr);
        }

        if (flight.getAirplane() != null && flight.getAirplane().getAirplaneId() != null) {
            Airplane plane = airplaneRepo.findById(flight.getAirplane().getAirplaneId())
                    .orElseThrow(() -> new RuntimeException(messages.get(
                            "app.message.flight.airplane-not-found-id",
                            flight.getAirplane().getAirplaneId())));
            flight.setAirplane(plane);
        }

        return flightRepo.save(flight);
    }

    @Override
    public Flight getFlightById(Integer flightId) {
        return flightRepo.findById(flightId)
                .orElseThrow(() -> new RuntimeException(messages.get("app.message.flight.not-found-id", flightId)));
    }

    @Override
    public Flight getFlightByNumber(String flightNumber) {
        return flightRepo.findByFlightNumber(flightNumber)
                .orElseThrow(() -> new RuntimeException(
                        messages.get("app.message.flight.not-found-number", flightNumber)));
    }

    @Override
    public List<Flight> searchFlights(String depCode, String arrCode, LocalDate travelDate) {
        LocalDateTime startOfDay = travelDate == null ? null : travelDate.atStartOfDay();
        LocalDateTime endOfDay = travelDate == null ? null : travelDate.atTime(LocalTime.MAX);
        return flightRepo.searchFlights(normalizeAirportCode(depCode), normalizeAirportCode(arrCode),
                startOfDay, endOfDay);
    }

    private String normalizeAirportCode(String airportCode) {
        return airportCode == null || airportCode.isBlank()
                ? null
                : airportCode.trim().toUpperCase(Locale.ROOT);
    }

    @Override
    public List<Flight> getAllFlights() {
        return flightRepo.findAll();
    }

    @Override
    public Flight updateFlight(Integer flightId, Flight flightDetails) {
        Flight existingFlight = getFlightById(flightId);

        existingFlight.setFlightNumber(flightDetails.getFlightNumber());

        if (flightDetails.getDepartureAirport() != null && flightDetails.getDepartureAirport().getAirportId() != null) {
            Airport dep = airportRepo.findById(flightDetails.getDepartureAirport().getAirportId())
                    .orElseThrow(() -> new RuntimeException(messages.get(
                            "app.message.flight.departure-airport-not-found-id",
                            flightDetails.getDepartureAirport().getAirportId())));
            existingFlight.setDepartureAirport(dep);
        }

        if (flightDetails.getArrivalAirport() != null && flightDetails.getArrivalAirport().getAirportId() != null) {
            Airport arr = airportRepo.findById(flightDetails.getArrivalAirport().getAirportId())
                    .orElseThrow(() -> new RuntimeException(messages.get(
                            "app.message.flight.arrival-airport-not-found-id",
                            flightDetails.getArrivalAirport().getAirportId())));
            existingFlight.setArrivalAirport(arr);
        }

        if (flightDetails.getAirplane() != null && flightDetails.getAirplane().getAirplaneId() != null) {
            Airplane plane = airplaneRepo.findById(flightDetails.getAirplane().getAirplaneId())
                    .orElseThrow(() -> new RuntimeException(messages.get(
                            "app.message.flight.airplane-not-found-id",
                            flightDetails.getAirplane().getAirplaneId())));
            existingFlight.setAirplane(plane);
        }

        existingFlight.setDepartureTime(flightDetails.getDepartureTime());
        existingFlight.setArrivalTime(flightDetails.getArrivalTime());
        existingFlight.setEconomyFare(flightDetails.getEconomyFare());
        existingFlight.setBusinessFare(flightDetails.getBusinessFare());
        existingFlight.setFirstClassFare(flightDetails.getFirstClassFare());
        existingFlight.setFlightStatus(flightDetails.getFlightStatus());
        existingFlight.setActive(flightDetails.getActive());

        return flightRepo.save(existingFlight);
    }

    @Override
    @Transactional
    public void deleteFlight(Integer flightId) {
        Flight existingFlight = getFlightById(flightId);
        existingFlight.setActive(false);
        flightRepo.save(existingFlight);
    }
}
