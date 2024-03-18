package com.bai.services;

import com.bai.controllers.UserController;
import com.bai.entities.User;
import com.bai.repositories.UserRepository;
import com.bai.utils.PasswordHash;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import jakarta.inject.Inject;

import java.util.Optional;

@Controller("/api/users")
public class UserService {

    protected final UserRepository userRepository;

    @Inject
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Get("/{id}")
    public User show(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(new User());
    }

    @Post(value = "/register", consumes = MediaType.APPLICATION_JSON)
    public User createUser(@Body User user) {
        user.setPassword(new PasswordHash().getEncodedPassword(user.getPassword()).trim());
        return userRepository.save(user);
    }

    @Post(value = "/login", consumes = MediaType.APPLICATION_JSON)
    public User login(@Body User user) {
        return new UserController(this.userRepository).isAuthorized(user) ? this.userRepository.findByEmail(user.getEmail()) : new User();
    }
}