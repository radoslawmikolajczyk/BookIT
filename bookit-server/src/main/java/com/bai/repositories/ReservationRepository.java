package com.bai.repositories;

import com.bai.entities.Reservation;
import com.bai.entities.User;
import io.micronaut.data.annotation.Query;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;
import io.micronaut.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@JdbcRepository(dialect = Dialect.POSTGRES)
public interface ReservationRepository extends CrudRepository<Reservation, Long> {
    List<Reservation> findByUser(User user);

    @Transactional
    @Query("SELECT * FROM reservations r WHERE r.user_id = :userId AND r.end_time < :today")
    List<Reservation> getPastReservations(Long userId, Timestamp today);

    @Transactional
    @Query("SELECT * FROM reservations r WHERE r.user_id = :userId AND r.end_time >= :today")
    List<Reservation> getCurrentReservations(Long userId, Timestamp today);

    @Transactional
    @Query("SELECT * FROM reservations r WHERE r.user_id = :userId AND r.room_id = :roomId AND r.start_time = :startTime AND r.end_time = :endTime")
    List<Reservation> getReservation(Long userId, Long roomId, Timestamp startTime, Timestamp endTime);
}
