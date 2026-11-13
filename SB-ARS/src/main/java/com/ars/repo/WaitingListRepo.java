package com.ars.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ars.entity.WaitingList;

@Repository
public interface WaitingListRepo extends JpaRepository<WaitingList, Integer> {

    List<WaitingList> findByFlightFlightId(Integer flightId);

    List<WaitingList> findByUserUserId(Integer userId);

    List<WaitingList> findByFlightFlightIdOrderByCreatedAtAsc(Integer flightId);
}