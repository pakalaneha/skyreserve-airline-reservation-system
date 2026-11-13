package com.ars.repo;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ars.entity.Flight;

@Repository
public interface FlightRepo extends JpaRepository<Flight, Integer> {

    Optional<Flight> findByFlightNumber(String flightNumber);

    @Query("SELECT f FROM Flight f "
            + "WHERE (:depCode IS NULL OR f.departureAirport.airportCode = :depCode) "
            + "AND (:arrCode IS NULL OR f.arrivalAirport.airportCode = :arrCode) "
            + "AND (:startOfDay IS NULL OR f.departureTime BETWEEN :startOfDay AND :endOfDay)")
    List<Flight> searchFlights(@Param("depCode") String depCode, @Param("arrCode") String arrCode,
            @Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);

    List<Flight> findByFlightStatus(String flightStatus);
}