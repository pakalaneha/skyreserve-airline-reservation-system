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

import com.ars.entity.Airplane;
import com.ars.service.AirplaneService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/airplanes")
public class AirplaneController {

    @Autowired
    private AirplaneService airplaneService;

    @PostMapping
    public ResponseEntity<Airplane> createAirplane(@Valid @RequestBody Airplane airplane) {
        Airplane createdAirplane = airplaneService.createAirplane(airplane);
        return new ResponseEntity<>(createdAirplane, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Airplane> getAirplaneById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(airplaneService.getAirplaneById(id));
    }

    @GetMapping("/registration/{registrationNo}")
    public ResponseEntity<Airplane> getAirplaneByRegistrationNo(@PathVariable("registrationNo") String registrationNo) {
        return ResponseEntity.ok(airplaneService.getAirplaneByRegistrationNo(registrationNo));
    }

    @GetMapping
    public ResponseEntity<List<Airplane>> getAllAirplanes() {
        return ResponseEntity.ok(airplaneService.getAllAirplanes());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Airplane> updateAirplane(@PathVariable("id") Integer id, @Valid @RequestBody Airplane airplaneDetails) {
        return ResponseEntity.ok(airplaneService.updateAirplane(id, airplaneDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Airplane> deleteAirplane(@PathVariable("id") Integer id) {
        airplaneService.deleteAirplane(id);
        return ResponseEntity.ok(airplaneService.getAirplaneById(id));
    }
}
