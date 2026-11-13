package com.ars.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ars.entity.User;
import com.ars.message.ApplicationMessages;
import com.ars.repo.UserRepo;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ApplicationMessages messages;

    @Override
    public User createUser(User user) {
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new RuntimeException(messages.get("app.message.user.email-already-registered", user.getEmail()));
        }
        if (userRepo.existsByPhone(user.getPhone())) {
            throw new RuntimeException(messages.get("app.message.user.phone-already-registered", user.getPhone()));
        }
        return userRepo.save(user);
    }

    @Override
    public User getUserById(Integer userId) {
        return userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException(messages.get("app.message.user.not-found-id", userId)));
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException(messages.get("app.message.user.not-found-email", email)));
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User updateUser(Integer userId, User userDetails) {
        User existingUser = getUserById(userId);

        existingUser.setFirstName(userDetails.getFirstName());
        existingUser.setLastName(userDetails.getLastName());
        existingUser.setPhone(userDetails.getPhone());
        existingUser.setRole(userDetails.getRole());
        existingUser.setActive(userDetails.getActive());

        return userRepo.save(existingUser);
    }

    @Override
    public void deleteUser(Integer userId) {
        User existingUser = getUserById(userId);
        existingUser.setActive(false);
        userRepo.save(existingUser);
    }
}