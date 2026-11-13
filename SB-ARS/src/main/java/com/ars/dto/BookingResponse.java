package com.ars.dto;

import java.time.LocalDateTime;
import java.util.List;
import com.ars.entity.Passenger;

public class BookingResponse {

    private Integer bookingId;
    private String bookingCode;
    private Integer userId;
    private String userEmail;
    private String flightNumber;
    private String flightClass;
    private Double totalFare;
    private Integer totalPassengers;
    private String bookingStatus;
    private LocalDateTime bookingTime;
    private List<Passenger> passengers;

    public BookingResponse() {}

    public Integer getBookingId() { return bookingId; }
    public void setBookingId(Integer bookingId) { this.bookingId = bookingId; }

    public String getBookingCode() { return bookingCode; }
    public void setBookingCode(String bookingCode) { this.bookingCode = bookingCode; }

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getFlightNumber() { return flightNumber; }
    public void setFlightNumber(String flightNumber) { this.flightNumber = flightNumber; }

    public String getFlightClass() { return flightClass; }
    public void setFlightClass(String flightClass) { this.flightClass = flightClass; }

    public Double getTotalFare() { return totalFare; }
    public void setTotalFare(Double totalFare) { this.totalFare = totalFare; }

    public Integer getTotalPassengers() { return totalPassengers; }
    public void setTotalPassengers(Integer totalPassengers) { this.totalPassengers = totalPassengers; }

    public String getBookingStatus() { return bookingStatus; }
    public void setBookingStatus(String bookingStatus) { this.bookingStatus = bookingStatus; }

    public LocalDateTime getBookingTime() { return bookingTime; }
    public void setBookingTime(LocalDateTime bookingTime) { this.bookingTime = bookingTime; }

    public List<Passenger> getPassengers() { return passengers; }
    public void setPassengers(List<Passenger> passengers) { this.passengers = passengers; }
}