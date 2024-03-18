package com.bai.controllers;

import com.bai.entities.User;
import com.bai.repositories.UserRepository;
import com.bai.utils.PasswordHash;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

@Singleton
public class UserController {

    protected final UserRepository userRepository;

    @Inject
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Boolean isAuthorized(User user) {
        return this.userRepository.findByEmail(user.getEmail()).getPassword().trim().equals(new PasswordHash().getEncodedPassword(user.getPassword()));
    }
}
