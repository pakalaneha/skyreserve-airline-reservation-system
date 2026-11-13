package com.ars.service;

import java.util.List;
import java.util.UUID;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ars.entity.Booking;
import com.ars.entity.Flight;
import com.ars.entity.Passenger;
import com.ars.entity.User;
import com.ars.message.ApplicationMessages;
import com.ars.repo.BookingRepo;
import com.ars.repo.FlightRepo;
import com.ars.repo.PassengerRepo;
import com.ars.repo.UserRepo;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private FlightRepo flightRepo;

    @Autowired
    private PassengerRepo passengerRepo;

    @Autowired
    private WalletService walletService;

    @Autowired
    private ApplicationMessages messages;

    @Override
    public Booking createBooking(Integer userId, Integer flightId, String flightClass, List<Passenger> passengers) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException(
                        messages.get("app.message.booking.user-not-found-id", userId)));

        Flight flight = flightRepo.findById(flightId)
                .orElseThrow(() -> new RuntimeException(
                        messages.get("app.message.booking.flight-not-found-id", flightId)));

        if (!Boolean.TRUE.equals(flight.getActive()) || "CANCELLED".equalsIgnoreCase(flight.getFlightStatus())
                || "COMPLETED".equalsIgnoreCase(flight.getFlightStatus())) {
            throw new RuntimeException(messages.get("app.message.booking.flight-unavailable"));
        }

        double seatFare = switch (flightClass.toUpperCase()) {
            case "ECONOMY" -> flight.getEconomyFare();
            case "BUSINESS" -> flight.getBusinessFare();
            case "FIRST_CLASS" -> flight.getFirstClassFare();
            default -> throw new RuntimeException(messages.get("app.message.booking.invalid-flight-class", flightClass));
        };

        double totalFare = seatFare * passengers.size();

        Set<String> selectedSeats = new HashSet<>();
        for (Passenger passenger : passengers) {
            if (passenger.getSeatNumber() == null || passenger.getSeatNumber().isBlank()) {
                throw new RuntimeException(messages.get("app.message.booking.seat-required"));
            }
            if (!selectedSeats.add(passenger.getSeatNumber().toUpperCase())) {
                throw new RuntimeException(messages.get("app.message.booking.duplicate-seat"));
            }
        }
        List<String> reservedSeats = passengerRepo.findReservedSeatNumbers(flightId, flightClass);
        selectedSeats.retainAll(new HashSet<>(reservedSeats.stream().map(String::toUpperCase).toList()));
        if (!selectedSeats.isEmpty()) {
            throw new RuntimeException(messages.get("app.message.booking.seats-unavailable"));
        }

        // Deduct payment from user's wallet
        walletService.deductBalance(userId, totalFare);

        Booking booking = new Booking();
        booking.setBookingCode("BK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        booking.setUser(user);
        booking.setFlight(flight);
        booking.setFlightClass(flightClass);
        booking.setTotalPassengers(passengers.size());
        booking.setTotalFare(totalFare);
        booking.setBookingStatus("CONFIRMED");

        Booking savedBooking = bookingRepo.save(booking);

        for (Passenger passenger : passengers) {
            passenger.setBooking(savedBooking);
            passengerRepo.save(passenger);
        }

        return savedBooking;
    }

    @Override
    public Booking getBookingById(Integer bookingId) {
        return bookingRepo.findById(bookingId)
                .orElseThrow(() -> new RuntimeException(
                        messages.get("app.message.booking.not-found-id", bookingId)));
    }

    @Override
    public Booking getBookingByCode(String bookingCode) {
        return bookingRepo.findByBookingCode(bookingCode)
                .orElseThrow(() -> new RuntimeException(
                        messages.get("app.message.booking.not-found-code", bookingCode)));
    }

    @Override
    public List<Booking> getBookingsByUserId(Integer userId) {
        return bookingRepo.findByUserUserId(userId);
    }

    @Override
    public Booking cancelBooking(Integer bookingId) {
        Booking booking = getBookingById(bookingId);
        if ("CANCELLED".equalsIgnoreCase(booking.getBookingStatus())) {
            throw new RuntimeException(messages.get("app.message.booking.already-cancelled"));
        }

        booking.setBookingStatus("CANCELLED");
        booking.setActive(false);

        // Refund full amount to wallet
        walletService.addBalance(booking.getUser().getUserId(), booking.getTotalFare());

        return bookingRepo.save(booking);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }
}
