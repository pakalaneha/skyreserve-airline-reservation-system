package com.ars.dto;

import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;

public class FlightSearchRequest {

    private String departureAirportCode;
    private String arrivalAirportCode;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate travelDate;

    public FlightSearchRequest() {}

    public FlightSearchRequest(String departureAirportCode, String arrivalAirportCode, LocalDate travelDate) {
        this.departureAirportCode = departureAirportCode;
        this.arrivalAirportCode = arrivalAirportCode;
        this.travelDate = travelDate;
    }

    public String getDepartureAirportCode() { return departureAirportCode; }
    public void setDepartureAirportCode(String departureAirportCode) { this.departureAirportCode = departureAirportCode; }

    public String getArrivalAirportCode() { return arrivalAirportCode; }
    public void setArrivalAirportCode(String arrivalAirportCode) { this.arrivalAirportCode = arrivalAirportCode; }

    public LocalDate getTravelDate() { return travelDate; }
    public void setTravelDate(LocalDate travelDate) { this.travelDate = travelDate; }
}