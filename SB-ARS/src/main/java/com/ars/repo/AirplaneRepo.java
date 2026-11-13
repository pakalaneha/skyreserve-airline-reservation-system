package com.ars.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ars.entity.Airplane;

@Repository
public interface AirplaneRepo extends JpaRepository<Airplane, Integer> {

    Optional<Airplane> findByRegistrationNo(String registrationNo);

    Boolean existsByRegistrationNo(String registrationNo);
}