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
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "tbl_passengers")
public class Passenger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "passenger_id")
    private Integer passengerId;

    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @NotBlank(message = "{validation.passenger.name.required}")
    @Size(max = 100)
    @Column(name = "passenger_name", length = 100, nullable = false)
    private String passengerName;

    @NotNull(message = "{validation.passenger.age.required}")
    @Min(value = 1)
    @Column(name = "age", nullable = false)
    private Integer age;

    @NotBlank(message = "{validation.passenger.gender.required}")
    @Column(name = "gender", length = 10, nullable = false)
    private String gender;

    @Column(name = "seat_number", length = 10)
    private String seatNumber;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public Passenger() {
        super();
    }

    public Passenger(Integer passengerId, Booking booking, String passengerName, Integer age, String gender,
                     String seatNumber, LocalDateTime createdAt, LocalDateTime updatedAt) {
        super();
        this.passengerId = passengerId;
        this.booking = booking;
        this.passengerName = passengerName;
        this.age = age;
        this.gender = gender;
        this.seatNumber = seatNumber;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Integer getPassengerId() {
        return passengerId;
    }

    public void setPassengerId(Integer passengerId) {
        this.passengerId = passengerId;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
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
        return "Passenger [passengerId=" + passengerId + ", passengerName=" + passengerName + ", age=" + age
                + ", gender=" + gender + ", seatNumber=" + seatNumber + ", createdAt=" + createdAt
                + ", updatedAt=" + updatedAt + "]";
    }
}