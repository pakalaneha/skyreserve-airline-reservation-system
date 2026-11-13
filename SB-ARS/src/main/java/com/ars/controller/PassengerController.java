package com.ars.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ars.entity.Passenger;
import com.ars.message.ApplicationMessages;
import com.ars.repo.PassengerRepo;

@RestController
@RequestMapping("/api/passengers")
public class PassengerController {

    @Autowired
    private PassengerRepo passengerRepo;

    @Autowired
    private ApplicationMessages messages;

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<List<Passenger>> getPassengersByBookingId(@PathVariable("bookingId") Integer bookingId) {
        return ResponseEntity.ok(passengerRepo.findByBookingBookingId(bookingId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Passenger> getPassengerById(@PathVariable("id") Integer id) {
        Passenger passenger = passengerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException(messages.get("app.message.passenger.not-found-id", id)));
        return ResponseEntity.ok(passenger);
    }
}