package com.bai.utils;

import com.bai.entities.Group;
import com.bai.entities.User;
import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Serdeable.Serializable
@Introspected
public class RequestResponse {
    User user;
    Group group;
    List<Group> groups;
    String message;
    Boolean isSuccess;

    public RequestResponse(String message, Boolean isSuccess) {
        this.message = message;
        this.isSuccess = isSuccess;
    }
}
