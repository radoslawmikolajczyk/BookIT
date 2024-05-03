package com.bai.services;

import com.bai.configuration.Config;
import com.bai.entities.Reservation;
import com.bai.entities.Room;
import com.bai.entities.User;
import com.bai.repositories.ReservationRepository;
import com.bai.repositories.RoomRepository;
import com.bai.repositories.UserRepository;
import com.bai.utils.RequestResponse;
import io.micronaut.core.annotation.Introspected;
import io.micronaut.core.annotation.NonNull;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.*;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.inject.Inject;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Controller("/api/reservations")
public class ReservationService extends Service {

    protected final ReservationRepository reservationRepository;
    protected final UserRepository userRepository;
    protected final RoomRepository roomRepository;

    @Inject
    private Config config;

    @Inject
    public ReservationService(ReservationRepository reservationRepository, UserRepository userRepository, RoomRepository roomRepository) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
    }

    @Get("/getAllUserReservations/{email}")
    public RequestResponse getUserReservations(String email) {
        RequestResponse requestResponse = new RequestResponse();
        try {
            requestResponse.setReservations(this.reservationRepository.findByUser(this.userRepository.findByEmail(email)));
            requestResponse.setIsSuccess(true);
        } catch (Exception ex) {
            return new RequestResponse("Exception occurred: " + ex.getMessage(), false);
        }
        return requestResponse;
    }

    @Get("/getHistoryReservations/{email}")
    public RequestResponse getPastReservations(String email) {
        RequestResponse requestResponse = new RequestResponse();
        try {
            Timestamp now = new Timestamp(System.currentTimeMillis());
            requestResponse.setReservations(this.reservationRepository.getPastReservations(this.userRepository.findByEmail(email).getId(), now));
            requestResponse.setIsSuccess(true);
        } catch (Exception ex) {
            return new RequestResponse("Exception occurred: " + ex.getMessage(), false);
        }
        return requestResponse;
    }

    @Get("/getCurrentReservations/{email}")
    public RequestResponse getCurrentReservations(String email) {
        RequestResponse requestResponse = new RequestResponse();
        try {
            Timestamp now = new Timestamp(System.currentTimeMillis());
            requestResponse.setReservations(this.reservationRepository.getCurrentReservations(this.userRepository.findByEmail(email).getId(), now));
            requestResponse.setIsSuccess(true);
        } catch (Exception ex) {
            return new RequestResponse("Exception occurred: " + ex.getMessage(), false);
        }
        return requestResponse;
    }

    @Post(value = "/getAllReservationsFromPeriod", consumes = MediaType.APPLICATION_JSON)
    public RequestResponse getAllReservationsFromPeriod(@Body ReservationRequest request) {
        RequestResponse requestResponse = new RequestResponse();
        try {
            Timestamp startDay = getParsedDate(request.getStartTime());
            Timestamp endDay = getParsedDate(request.getEndTime());

            requestResponse.setReservations(this.reservationRepository.getAllReservationsFromPeriod(startDay, endDay));
            requestResponse.setIsSuccess(true);
        } catch (Exception ex) {
            return new RequestResponse("Exception occurred: " + ex.getMessage(), false);
        }
        return requestResponse;
    }

    @Post(value = "/createReservation", consumes = MediaType.APPLICATION_JSON)
    public RequestResponse createReservation(@Body ReservationRequest request) {
        RequestResponse requestResponse = new RequestResponse();
        try {
            User user = this.userRepository.findByEmail(request.getUserEmail());
            @NonNull Optional<Room> room = this.roomRepository.findById(request.getRoomId());
            Reservation reservation = new Reservation();
            reservation.setRoom(room.orElse(null));
            reservation.setUser(user);
            reservation.setStartTime(getParsedDate(request.getStartTime()));
            reservation.setEndTime(getParsedDate(request.getEndTime()));
            requestResponse.setReservation(this.reservationRepository.save(reservation));
            requestResponse.setIsSuccess(true);
        } catch (Exception ex) {
            return new RequestResponse("Exception occurred: " + ex.getMessage(), false);
        }
        return requestResponse;
    }

    @Delete(value = "/deleteReservation", consumes = MediaType.APPLICATION_JSON)
    public RequestResponse deleteReservation(@Body ReservationRequest request) {
        RequestResponse requestResponse = new RequestResponse();
        try {
            User user = this.userRepository.findByEmail(request.getUserEmail());
            List<Reservation> reservations = this.reservationRepository.getReservation(user.getId(), request.getRoomId(),
                    getParsedDate(request.getStartTime()), getParsedDate(request.getEndTime()));
            if (reservations.isEmpty()) {
                requestResponse.setIsSuccess(false);
                requestResponse.setMessage("Reservation not found!");
            } else {
                this.reservationRepository.delete(reservations.get(0));
                requestResponse.setIsSuccess(true);
                requestResponse.setMessage("Reservation removed!");
            }
        } catch (Exception ex) {
            return new RequestResponse("Exception occurred: " + ex.getMessage(), false);
        }
        return requestResponse;
    }

    @NoArgsConstructor
    @Getter
    @Setter
    @Serdeable.Deserializable
    @Introspected
    public static class ReservationRequest {
        String userEmail;
        Long roomId;
        String startTime;
        String endTime;
    }
}
