package com.ars.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ars.entity.Passenger;

@Repository
public interface PassengerRepo extends JpaRepository<Passenger, Integer> {

    List<Passenger> findByBookingBookingId(Integer bookingId);

    @Query("select p.seatNumber from Passenger p where p.booking.flight.flightId = :flightId "
            + "and upper(p.booking.flightClass) = upper(:flightClass) "
            + "and p.booking.bookingStatus <> 'CANCELLED' and p.seatNumber is not null")
    List<String> findReservedSeatNumbers(@Param("flightId") Integer flightId, @Param("flightClass") String flightClass);
}
