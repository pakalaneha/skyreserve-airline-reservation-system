package com.ars.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ars.entity.Airplane;
import com.ars.message.ApplicationMessages;
import com.ars.repo.AirplaneRepo;

@Service
public class AirplaneServiceImpl implements AirplaneService {

    @Autowired
    private AirplaneRepo airplaneRepo;

    @Autowired
    private ApplicationMessages messages;

    @Override
    public Airplane createAirplane(Airplane airplane) {
        if (airplaneRepo.existsByRegistrationNo(airplane.getRegistrationNo())) {
            throw new RuntimeException(messages.get("app.message.airplane.registration-already-exists",
                    airplane.getRegistrationNo()));
        }
        return airplaneRepo.save(airplane);
    }

    @Override
    public Airplane getAirplaneById(Integer airplaneId) {
        return airplaneRepo.findById(airplaneId)
                .orElseThrow(() -> new RuntimeException(
                        messages.get("app.message.airplane.not-found-id", airplaneId)));
    }

    @Override
    public Airplane getAirplaneByRegistrationNo(String registrationNo) {
        return airplaneRepo.findByRegistrationNo(registrationNo)
                .orElseThrow(() -> new RuntimeException(
                        messages.get("app.message.airplane.not-found-registration", registrationNo)));
    }

    @Override
    public List<Airplane> getAllAirplanes() {
        return airplaneRepo.findAll();
    }

    @Override
    public Airplane updateAirplane(Integer airplaneId, Airplane airplaneDetails) {
        Airplane existingAirplane = getAirplaneById(airplaneId);

        existingAirplane.setAirplaneName(airplaneDetails.getAirplaneName());
        existingAirplane.setRegistrationNo(airplaneDetails.getRegistrationNo());
        existingAirplane.setDescription(airplaneDetails.getDescription());
        existingAirplane.setTotalSeat(airplaneDetails.getTotalSeat());
        existingAirplane.setTotalEconomySeat(airplaneDetails.getTotalEconomySeat());
        existingAirplane.setTotalBusinessSeat(airplaneDetails.getTotalBusinessSeat());
        existingAirplane.setTotalFirstClassSeat(airplaneDetails.getTotalFirstClassSeat());
        existingAirplane.setActive(airplaneDetails.getActive());

        return airplaneRepo.save(existingAirplane);
    }

    @Override
    @Transactional
    public void deleteAirplane(Integer airplaneId) {
        Airplane existingAirplane = getAirplaneById(airplaneId);
        existingAirplane.setActive(false);
        airplaneRepo.save(existingAirplane);
    }
}
