package com.ars.service;

import java.util.List;

import com.ars.entity.WaitingList;

public interface WaitingListService {

    WaitingList addToWaitingList(Integer userId, Integer flightId, String flightClass, Integer totalPassengers);

    List<WaitingList> getWaitingListByFlightId(Integer flightId);

    List<WaitingList> getWaitingListByUserId(Integer userId);

    void removeFromWaitingList(Integer waitingId);
}