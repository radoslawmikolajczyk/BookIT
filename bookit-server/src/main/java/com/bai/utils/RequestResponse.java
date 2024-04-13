package com.bai.utils;

import com.bai.entities.Group;
import com.bai.entities.Reservation;
import com.bai.entities.Room;
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
    Room room;
    Reservation reservation;
    List<Group> groups;
    List<Room> rooms;
    List<Reservation> reservations;
    String message;
    Boolean isSuccess;

    public RequestResponse(String message, Boolean isSuccess) {
        this.message = message;
        this.isSuccess = isSuccess;
    }
}
