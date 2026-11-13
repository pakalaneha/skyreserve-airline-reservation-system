package com.ars.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ars.entity.Airport;
import com.ars.service.AirportService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/airports")
public class AirportController {

    @Autowired
    private AirportService airportService;

    @PostMapping
    public ResponseEntity<Airport> createAirport(@Valid @RequestBody Airport airport) {
        Airport createdAirport = airportService.createAirport(airport);
        return new ResponseEntity<>(createdAirport, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Airport> getAirportById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(airportService.getAirportById(id));
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<Airport> getAirportByCode(@PathVariable("code") String code) {
        return ResponseEntity.ok(airportService.getAirportByCode(code));
    }

    @GetMapping
    public ResponseEntity<List<Airport>> getAllAirports() {
        return ResponseEntity.ok(airportService.getAllAirports());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Airport> updateAirport(@PathVariable("id") Integer id, @Valid @RequestBody Airport airportDetails) {
        return ResponseEntity.ok(airportService.updateAirport(id, airportDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Airport> deleteAirport(@PathVariable("id") Integer id) {
        airportService.deleteAirport(id);
        return ResponseEntity.ok(airportService.getAirportById(id));
    }
}
