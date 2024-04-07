package com.bai.services;

import com.bai.configuration.Config;
import com.bai.entities.Room;
import com.bai.repositories.ReservationRepository;
import com.bai.repositories.RoomRepository;
import com.bai.utils.RequestResponse;
import io.micronaut.core.annotation.Introspected;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.inject.Inject;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Controller("/api/rooms")
public class RoomService {

    protected final RoomRepository roomRepository;
    protected final ReservationRepository reservationRepository;

    @Inject
    private Config config;

    @Inject
    public RoomService(RoomRepository roomRepository, ReservationRepository reservationRepository) {
        this.roomRepository = roomRepository;
        this.reservationRepository = reservationRepository;
    }

    @Post(value = "/createRooms", consumes = MediaType.APPLICATION_JSON)
    public RequestResponse createRooms(@Body List<Room> rooms) {
        RequestResponse requestResponse = new RequestResponse();
        try {
            requestResponse.setRooms(roomRepository.saveAll(rooms));
            requestResponse.setIsSuccess(true);
        } catch (Exception ex) {
            return new RequestResponse("Exception occurred: " + ex.getMessage(), false);
        }
        return requestResponse;
    }

    @Get("/getAllRooms")
    public RequestResponse getAllRooms() {
        RequestResponse requestResponse = new RequestResponse();
        try {
            requestResponse.setRooms(roomRepository.findAll());
            requestResponse.setIsSuccess(true);
        } catch (Exception ex) {
            return new RequestResponse("Exception occurred: " + ex.getMessage(), false);
        }
        return requestResponse;
    }

    @Post(value = "/getAvailableRooms", consumes = MediaType.APPLICATION_JSON)
    public RequestResponse getAvailableRooms(@Body RoomRequest request) {
        RequestResponse requestResponse = new RequestResponse();
        try {
            requestResponse.setRooms(roomRepository.findAvailableRooms(getParsedDate(request.getStartTime()), getParsedDate(request.getEndTime())));
            requestResponse.setIsSuccess(true);
        } catch (Exception ex) {
            return new RequestResponse("Exception occurred: " + ex.toString(), false);
        }
        return requestResponse;
    }

    private Timestamp getParsedDate(String dateToParse) {
        if (dateToParse == null) {
            return null;
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(config.getDateFormat());
        LocalDateTime dateTime = LocalDateTime.parse(dateToParse, formatter);
        return Timestamp.valueOf(dateTime);
    }

    @Getter
    @Setter
    @Serdeable.Deserializable
    @Introspected
    public static class RoomRequest {
        @NotNull
        String startTime;
        String endTime;
        String buildingName;
        int floorNumber;
        int range;
    }
}
