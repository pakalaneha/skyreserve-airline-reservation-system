package com.ars.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ars.entity.Airport;
import com.ars.message.ApplicationMessages;
import com.ars.repo.AirportRepo;

@Service
public class AirportServiceImpl implements AirportService {

    @Autowired
    private AirportRepo airportRepo;

    @Autowired
    private ApplicationMessages messages;

    @Override
    public Airport createAirport(Airport airport) {
        if (airportRepo.existsByAirportCode(airport.getAirportCode())) {
            throw new RuntimeException(messages.get("app.message.airport.code-already-exists",
                    airport.getAirportCode()));
        }
        return airportRepo.save(airport);
    }

    @Override
    public Airport getAirportById(Integer airportId) {
        return airportRepo.findById(airportId)
                .orElseThrow(() -> new RuntimeException(
                        messages.get("app.message.airport.not-found-id", airportId)));
    }

    @Override
    public Airport getAirportByCode(String airportCode) {
        return airportRepo.findByAirportCode(airportCode)
                .orElseThrow(() -> new RuntimeException(
                        messages.get("app.message.airport.not-found-code", airportCode)));
    }

    @Override
    public List<Airport> getAllAirports() {
        return airportRepo.findAll();
    }

    @Override
    public Airport updateAirport(Integer airportId, Airport airportDetails) {
        Airport existingAirport = getAirportById(airportId);

        existingAirport.setAirportName(airportDetails.getAirportName());
        existingAirport.setAirportCode(airportDetails.getAirportCode());
        existingAirport.setAirportLocation(airportDetails.getAirportLocation());
        existingAirport.setAirportAddress(airportDetails.getAirportAddress());
        existingAirport.setActive(airportDetails.getActive());

        return airportRepo.save(existingAirport);
    }

    @Override
    @Transactional
    public void deleteAirport(Integer airportId) {
        Airport existingAirport = getAirportById(airportId);
        existingAirport.setActive(false);
        airportRepo.save(existingAirport);
    }
}
