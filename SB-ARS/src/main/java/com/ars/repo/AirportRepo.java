package com.ars.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ars.entity.Airport;

@Repository
public interface AirportRepo extends JpaRepository<Airport, Integer> {

    Optional<Airport> findByAirportCode(String airportCode);

    List<Airport> findByAirportLocationContainingIgnoreCase(String location);

    Boolean existsByAirportCode(String airportCode);
}