package com.ars.dto;

import java.util.List;
import com.ars.entity.Passenger;

public class BookingRequest {

    private Integer userId;
    private Integer flightId;
    private String flightClass;
    private List<Passenger> passengers;

    public BookingRequest() {}

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public Integer getFlightId() { return flightId; }
    public void setFlightId(Integer flightId) { this.flightId = flightId; }

    public String getFlightClass() { return flightClass; }
    public void setFlightClass(String flightClass) { this.flightClass = flightClass; }

    public List<Passenger> getPassengers() { return passengers; }
    public void setPassengers(List<Passenger> passengers) { this.passengers = passengers; }
}