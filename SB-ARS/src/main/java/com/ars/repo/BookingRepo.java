package com.ars.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ars.entity.Booking;

@Repository
public interface BookingRepo extends JpaRepository<Booking, Integer> {

    Optional<Booking> findByBookingCode(String bookingCode);

    List<Booking> findByUserUserId(Integer userId);

    List<Booking> findByFlightFlightId(Integer flightId);

    List<Booking> findByBookingStatus(String bookingStatus);
}