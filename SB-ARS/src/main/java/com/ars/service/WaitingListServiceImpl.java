package com.ars.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ars.entity.Flight;
import com.ars.entity.User;
import com.ars.entity.WaitingList;
import com.ars.message.ApplicationMessages;
import com.ars.repo.FlightRepo;
import com.ars.repo.UserRepo;
import com.ars.repo.WaitingListRepo;

@Service
public class WaitingListServiceImpl implements WaitingListService {

    @Autowired
    private WaitingListRepo waitingListRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private FlightRepo flightRepo;

    @Autowired
    private ApplicationMessages messages;

    @Override
    public WaitingList addToWaitingList(Integer userId, Integer flightId, String flightClass, Integer totalPassengers) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException(
                        messages.get("app.message.waiting-list.user-not-found-id", userId)));

        Flight flight = flightRepo.findById(flightId)
                .orElseThrow(() -> new RuntimeException(
                        messages.get("app.message.waiting-list.flight-not-found-id", flightId)));

        WaitingList entry = new WaitingList();
        entry.setUser(user);
        entry.setFlight(flight);
        entry.setFlightClass(flightClass);
        entry.setTotalPassengers(totalPassengers);

        return waitingListRepo.save(entry);
    }

    @Override
    public List<WaitingList> getWaitingListByFlightId(Integer flightId) {
        return waitingListRepo.findByFlightFlightIdOrderByCreatedAtAsc(flightId);
    }

    @Override
    public List<WaitingList> getWaitingListByUserId(Integer userId) {
        return waitingListRepo.findByUserUserId(userId);
    }

    @Override
    public void removeFromWaitingList(Integer waitingId) {
        waitingListRepo.deleteById(waitingId);
    }
}