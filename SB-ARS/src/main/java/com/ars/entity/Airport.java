package com.ars.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "tbl_airports")
public class Airport {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "airport_id")
	private Integer airportId;

	@NotBlank(message = "{validation.airport.name.required}")
	@Size(max = 100)
	@Column(name = "airport_name", length = 100, nullable = false)
	private String airportName;

	@NotBlank(message = "{validation.airport.code.required}")
	@Size(min = 3, max = 10)
	@Column(name = "airport_code", length = 10, nullable = false, unique = true)
	private String airportCode;

	@NotBlank(message = "{validation.airport.location.required}")
	@Size(max = 100)
	@Column(name = "airport_location", length = 100, nullable = false)
	private String airportLocation;

	@NotBlank(message = "{validation.airport.address.required}")
	@Size(max = 255)
	@Column(name = "airport_address", length = 255, nullable = false)
	private String airportAddress;

	@Column(name = "is_active", nullable = false)
	@ColumnDefault("true")
	private Boolean active = true;

	@CreationTimestamp
	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(name = "updated_at", nullable = false)
	private LocalDateTime updatedAt;

	public Airport() {
		super();
	}

	public Airport(Integer airportId, String airportName, String airportCode, String airportLocation,
			String airportAddress, Boolean active, LocalDateTime createdAt, LocalDateTime updatedAt) {
		super();
		this.airportId = airportId;
		this.airportName = airportName;
		this.airportCode = airportCode;
		this.airportLocation = airportLocation;
		this.airportAddress = airportAddress;
		this.active = (active != null) ? active : true;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	@PrePersist
	protected void onCreate() {
		if (this.active == null) {
			this.active = true;
		}
	}

	public Integer getAirportId() {
		return airportId;
	}

	public void setAirportId(Integer airportId) {
		this.airportId = airportId;
	}

	public String getAirportName() {
		return airportName;
	}

	public void setAirportName(String airportName) {
		this.airportName = airportName;
	}

	public String getAirportCode() {
		return airportCode;
	}

	public void setAirportCode(String airportCode) {
		this.airportCode = airportCode;
	}

	public String getAirportLocation() {
		return airportLocation;
	}

	public void setAirportLocation(String airportLocation) {
		this.airportLocation = airportLocation;
	}

	public String getAirportAddress() {
		return airportAddress;
	}

	public void setAirportAddress(String airportAddress) {
		this.airportAddress = airportAddress;
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
		return "Airport [airportId=" + airportId + ", airportName=" + airportName + ", airportCode=" + airportCode
				+ ", airportLocation=" + airportLocation + ", airportAddress=" + airportAddress + ", active=" + active
				+ ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
	}
}