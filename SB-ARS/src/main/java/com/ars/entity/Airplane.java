package com.ars.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "tbl_airplanes")
public class Airplane {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "airplane_id")
	private Integer airplaneId;

	@NotBlank(message = "{validation.airplane.name.required}")
	@Size(max = 100)
	@Column(name = "airplane_name", length = 100, nullable = false)
	private String airplaneName;

	@NotBlank(message = "{validation.airplane.registration-number.required}")
	@Size(max = 50)
	@Column(name = "registration_no", length = 50, nullable = false, unique = true)
	private String registrationNo;

	@Size(max = 255)
	@Column(name = "description", length = 255)
	private String description;

	@NotNull(message = "{validation.airplane.total-seats.required}")
	@Min(value = 1, message = "{validation.airplane.total-seats.minimum}")
	@Column(name = "total_seat", nullable = false)
	private Integer totalSeat;

	@NotNull(message = "{validation.airplane.economy-seats.required}")
	@Min(value = 0)
	@Column(name = "total_economy_seat", nullable = false)
	private Integer totalEconomySeat;

	@NotNull(message = "{validation.airplane.business-seats.required}")
	@Min(value = 0)
	@Column(name = "total_business_seat", nullable = false)
	private Integer totalBusinessSeat;

	@NotNull(message = "{validation.airplane.first-class-seats.required}")
	@Min(value = 0)
	@Column(name = "total_first_class_seat", nullable = false)
	private Integer totalFirstClassSeat;

	@Column(name = "is_active", nullable = false)
	private Boolean active = true;

	@CreationTimestamp
	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(name = "updated_at", nullable = false)
	private LocalDateTime updatedAt;

	public Airplane() {
		super();
	}

	public Airplane(Integer airplaneId, String airplaneName, String registrationNo, String description,
			Integer totalSeat, Integer totalEconomySeat, Integer totalBusinessSeat, Integer totalFirstClassSeat,
			Boolean active, LocalDateTime createdAt, LocalDateTime updatedAt) {
		super();
		this.airplaneId = airplaneId;
		this.airplaneName = airplaneName;
		this.registrationNo = registrationNo;
		this.description = description;
		this.totalSeat = totalSeat;
		this.totalEconomySeat = totalEconomySeat;
		this.totalBusinessSeat = totalBusinessSeat;
		this.totalFirstClassSeat = totalFirstClassSeat;
		this.active = (active != null) ? active : true;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Integer getAirplaneId() {
		return airplaneId;
	}

	public void setAirplaneId(Integer airplaneId) {
		this.airplaneId = airplaneId;
	}

	public String getAirplaneName() {
		return airplaneName;
	}

	public void setAirplaneName(String airplaneName) {
		this.airplaneName = airplaneName;
	}

	public String getRegistrationNo() {
		return registrationNo;
	}

	public void setRegistrationNo(String registrationNo) {
		this.registrationNo = registrationNo;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getTotalSeat() {
		return totalSeat;
	}

	public void setTotalSeat(Integer totalSeat) {
		this.totalSeat = totalSeat;
	}

	public Integer getTotalEconomySeat() {
		return totalEconomySeat;
	}

	public void setTotalEconomySeat(Integer totalEconomySeat) {
		this.totalEconomySeat = totalEconomySeat;
	}

	public Integer getTotalBusinessSeat() {
		return totalBusinessSeat;
	}

	public void setTotalBusinessSeat(Integer totalBusinessSeat) {
		this.totalBusinessSeat = totalBusinessSeat;
	}

	public Integer getTotalFirstClassSeat() {
		return totalFirstClassSeat;
	}

	public void setTotalFirstClassSeat(Integer totalFirstClassSeat) {
		this.totalFirstClassSeat = totalFirstClassSeat;
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
		return "Airplane [airplaneId=" + airplaneId + ", airplaneName=" + airplaneName + ", registrationNo="
				+ registrationNo + ", description=" + description + ", totalSeat=" + totalSeat + ", totalEconomySeat="
				+ totalEconomySeat + ", totalBusinessSeat=" + totalBusinessSeat + ", totalFirstClassSeat="
				+ totalFirstClassSeat + ", active=" + active + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt
				+ "]";
	}
}