package com.bai.services;

import com.bai.controllers.UserController;
import com.bai.entities.User;
import com.bai.repositories.UserRepository;
import com.bai.utils.PasswordHash;
import com.bai.utils.RequestResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import jakarta.inject.Inject;

@Controller("/api/users")
public class UserService {

    protected final UserRepository userRepository;

    @Inject
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Get("/{id}")
    public RequestResponse getUserById(Long id) {
        RequestResponse requestResponse = new RequestResponse();
        try {
            requestResponse.setUser(userRepository.findById(id).orElse(null));
            requestResponse.setIsSuccess(true);
        } catch (Exception ex) {
            return new RequestResponse("Exception occurred: " + ex.getMessage(), false);
        }
        return requestResponse;
    }

    @Get("/getByEmail/{email}")
    public RequestResponse getUserByEmail(String email) {
        RequestResponse requestResponse = new RequestResponse();
        try {
            requestResponse.setUser(userRepository.findByEmail(email));
            requestResponse.setIsSuccess(true);
        } catch (Exception ex) {
            return new RequestResponse("Exception occurred: " + ex.getMessage(), false);
        }
        return requestResponse;
    }

    @Post(value = "/register", consumes = MediaType.APPLICATION_JSON)
    public RequestResponse createUser(@Body User user) {
        RequestResponse requestResponse = new RequestResponse();
        try {
            user.setPassword(new PasswordHash().getEncodedPassword(user.getPassword()).trim());
            requestResponse.setUser(userRepository.save(user));
            requestResponse.setIsSuccess(true);
        } catch (Exception ex) {
            return new RequestResponse("Exception occurred: " + ex.getMessage(), false);
        }
        return requestResponse;
    }

    @Post(value = "/login", consumes = MediaType.APPLICATION_JSON)
    public RequestResponse login(@Body User user) {
        RequestResponse requestResponse = new RequestResponse();
        try {
            if (new UserController(this.userRepository).isAuthorized(user)) {
                requestResponse.setIsSuccess(true);
                requestResponse.setMessage("Authorized");
            } else {
                requestResponse.setIsSuccess(false);
                requestResponse.setMessage("Password incorrect!");
            }
        } catch (Exception ex) {
            return new RequestResponse("Exception occurred: " + ex.getMessage(), false);
        }
        return requestResponse;
    }
}