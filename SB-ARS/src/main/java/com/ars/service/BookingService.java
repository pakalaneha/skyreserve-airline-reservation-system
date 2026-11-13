package com.ars.service;

import java.util.List;

import com.ars.entity.Booking;
import com.ars.entity.Passenger;

public interface BookingService {

    Booking createBooking(Integer userId, Integer flightId, String flightClass, List<Passenger> passengers);

    Booking getBookingById(Integer bookingId);

    Booking getBookingByCode(String bookingCode);

    List<Booking> getBookingsByUserId(Integer userId);

    Booking cancelBooking(Integer bookingId);

    List<Booking> getAllBookings();
}