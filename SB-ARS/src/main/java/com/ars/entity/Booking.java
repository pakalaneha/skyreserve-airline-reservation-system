package com.ars.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "tbl_bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Integer bookingId;

    @NotBlank(message = "{validation.booking.code.required}")
    @Column(name = "booking_code", length = 50, nullable = false, unique = true)
    private String bookingCode;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    @NotBlank(message = "{validation.booking.flight-class.required}")
    @Column(name = "flight_class", length = 20, nullable = false)
    private String flightClass;

    @NotNull(message = "{validation.booking.total-passengers.required}")
    @Min(value = 1)
    @Column(name = "total_passengers", nullable = false)
    private Integer totalPassengers;

    @NotNull(message = "{validation.booking.total-fare.required}")
    @Min(value = 0)
    @Column(name = "total_fare", nullable = false)
    private Double totalFare;

    @NotBlank(message = "{validation.booking.status.required}")
    @Column(name = "booking_status", length = 30, nullable = false)
    private String bookingStatus;

    @Column(name = "is_active", nullable = false)
    private Boolean active = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public Booking() {
        super();
    }

    public Booking(Integer bookingId, String bookingCode, User user, Flight flight, String flightClass,
                   Integer totalPassengers, Double totalFare, String bookingStatus, Boolean active,
                   LocalDateTime createdAt, LocalDateTime updatedAt) {
        super();
        this.bookingId = bookingId;
        this.bookingCode = bookingCode;
        this.user = user;
        this.flight = flight;
        this.flightClass = flightClass;
        this.totalPassengers = totalPassengers;
        this.totalFare = totalFare;
        this.bookingStatus = bookingStatus;
        this.active = active;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Integer getBookingId() {
        return bookingId;
    }

    public void setBookingId(Integer bookingId) {
        this.bookingId = bookingId;
    }

    public String getBookingCode() {
        return bookingCode;
    }

    public void setBookingCode(String bookingCode) {
        this.bookingCode = bookingCode;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public String getFlightClass() {
        return flightClass;
    }

    public void setFlightClass(String flightClass) {
        this.flightClass = flightClass;
    }

    public Integer getTotalPassengers() {
        return totalPassengers;
    }

    public void setTotalPassengers(Integer totalPassengers) {
        this.totalPassengers = totalPassengers;
    }

    public Double getTotalFare() {
        return totalFare;
    }

    public void setTotalFare(Double totalFare) {
        this.totalFare = totalFare;
    }

    public String getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "Booking [bookingId=" + bookingId + ", bookingCode=" + bookingCode + ", flightClass=" + flightClass
                + ", totalPassengers=" + totalPassengers + ", totalFare=" + totalFare + ", bookingStatus="
                + bookingStatus + ", active=" + active + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
    }
}