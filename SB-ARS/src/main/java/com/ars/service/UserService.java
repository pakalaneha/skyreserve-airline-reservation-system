package com.ars.service;

import java.util.List;

import com.ars.entity.User;

public interface UserService {

    User createUser(User user);

    User getUserById(Integer userId);

    User getUserByEmail(String email);

    List<User> getAllUsers();

    User updateUser(Integer userId, User userDetails);

    void deleteUser(Integer userId);
}