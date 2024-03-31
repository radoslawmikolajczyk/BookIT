package com.bai.controllers;

import com.bai.entities.Group;
import com.bai.repositories.GroupRepository;
import com.bai.utils.PasswordHash;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

@Singleton
public class GroupController {

    protected final GroupRepository groupRepository;

    @Inject
    public GroupController(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    public Boolean isAuthorized(Group group) {
        return this.groupRepository.findByName(group.getName()).getPassword().trim().equals(new PasswordHash().getEncodedPassword(group.getPassword()));
    }
}
