package com.bai.services;

import com.bai.controllers.GroupController;
import com.bai.entities.Group;
import com.bai.entities.User;
import com.bai.repositories.GroupRepository;
import com.bai.repositories.UserRepository;
import com.bai.utils.PasswordHash;
import com.bai.utils.RequestResponse;
import io.micronaut.core.annotation.Introspected;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.inject.Inject;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Objects;

@Controller("/api/groups")
public class GroupService extends Service {

    protected final GroupRepository groupRepository;
    protected final UserRepository userRepository;

    @Inject
    public GroupService(GroupRepository groupRepository, UserRepository userRepository) {
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    @Get("/get/{id}")
    public RequestResponse getGroupById(Long id) {
        RequestResponse requestResponse = new RequestResponse();
        try {
            requestResponse.setGroup(groupRepository.findById(id).orElse(null));
            requestResponse.setIsSuccess(true);
        } catch (Exception ex) {
            return new RequestResponse("Exception occurred: " + ex.getMessage(), false);
        }
        return requestResponse;
    }

    @Get("/getAllGroups")
    public RequestResponse getAllGroups() {
        RequestResponse requestResponse = new RequestResponse();
        try {
            requestResponse.setGroups(groupRepository.findAll());
            requestResponse.setIsSuccess(true);
        } catch (Exception ex) {
            return new RequestResponse("Exception occurred: " + ex.getMessage(), false);
        }
        return requestResponse;
    }

    @Post(value = "/createGroups", consumes = MediaType.APPLICATION_JSON)
    public RequestResponse createGroups(@Body List<Group> groups) {
        RequestResponse requestResponse = new RequestResponse();
        try {
            PasswordHash passwordHash = new PasswordHash();
            for (Group group : groups) {
                group.setPassword(passwordHash.getEncodedPassword(group.getPassword().trim()));
            }
            requestResponse.setGroups(groupRepository.saveAll(groups));
            requestResponse.setIsSuccess(true);
        } catch (Exception ex) {
            return new RequestResponse("Exception occurred: " + ex.getMessage(), false);
        }
        return requestResponse;
    }

    @Post(value = "/addUserToGroup", consumes = MediaType.APPLICATION_JSON)
    public RequestResponse addUserToGroup(@Body UserGroupRequest userGroupRequest) {
        RequestResponse requestResponse = new RequestResponse();
        try {
            User user = this.userRepository.findByEmail(userGroupRequest.getUserEmail());
            Group group = this.groupRepository.findByName(userGroupRequest.getGroupName());
            group.setPassword(userGroupRequest.getGroupPassword());
            if (new GroupController(this.groupRepository).isAuthorized(group)) {
                Objects.requireNonNull(user).setGroup(group);
                this.userRepository.update(user);
                group.setPassword(null);
                user.setPassword(null);
                requestResponse.setIsSuccess(true);
                requestResponse.setUser(user);
            } else {
                return new RequestResponse("Group password incorrect!", false);
            }
        } catch (Exception exception) {
            return new RequestResponse("Exception occurred: " + exception.getMessage(), false);
        }
        return requestResponse;
    }

    @RequiredArgsConstructor
    @Getter
    @Setter
    @Serdeable.Deserializable
    @Introspected
    public static class UserGroupRequest {
        String userEmail;
        String groupName;
        String groupPassword;
    }
}
