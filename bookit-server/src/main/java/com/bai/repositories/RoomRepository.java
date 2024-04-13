package com.bai.repositories;

import com.bai.entities.Room;
import io.micronaut.core.annotation.Nullable;
import io.micronaut.data.annotation.Query;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;
import io.micronaut.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@JdbcRepository(dialect = Dialect.POSTGRES)
public interface RoomRepository extends CrudRepository<Room, Long> {

    @Transactional
    @Query("SELECT * FROM rooms r WHERE r.id NOT IN " +
            "(SELECT res.room_id FROM reservations res " +
            "WHERE (:startTime >= res.start_time AND :startTime < res.end_time) OR " +
            "(:endTime > res.start_time AND :endTime <= res.end_time) OR " +
            "(res.start_time >= :startTime AND res.start_time < :endTime))")
    List<Room> findAvailableRooms(Timestamp startTime, @Nullable Timestamp endTime);

    @Transactional
    @Query("SELECT * FROM rooms r WHERE r.id NOT IN " +
            "(SELECT res.room_id FROM reservations res " +
            "WHERE (:startTime >= res.start_time AND :startTime < res.end_time) OR " +
            "(:endTime > res.start_time AND :endTime <= res.end_time) OR " +
            "(res.start_time >= :startTime AND res.start_time < :endTime)) AND r.building_name = :buildingName")
    List<Room> findAvailableRooms(Timestamp startTime, @Nullable Timestamp endTime, String buildingName);

    @Transactional
    @Query("SELECT * FROM rooms r WHERE r.id NOT IN " +
            "(SELECT res.room_id FROM reservations res " +
            "WHERE (:startTime >= res.start_time AND :startTime < res.end_time) OR " +
            "(:endTime > res.start_time AND :endTime <= res.end_time) OR " +
            "(res.start_time >= :startTime AND res.start_time < :endTime)) AND r.building_name = :buildingName AND r.floor_number = :floorNumber")
    List<Room> findAvailableRooms(Timestamp startTime, @Nullable Timestamp endTime, String buildingName, int floorNumber);

    @Transactional
    @Query("SELECT * FROM rooms r WHERE r.id NOT IN " +
            "(SELECT res.room_id FROM reservations res " +
            "WHERE (:startTime >= res.start_time AND :startTime < res.end_time) OR " +
            "(:endTime > res.start_time AND :endTime <= res.end_time) OR " +
            "(res.start_time >= :startTime AND res.start_time < :endTime)) AND r.floor_number = :floorNumber")
    List<Room> findAvailableRooms(Timestamp startTime, @Nullable Timestamp endTime, int floorNumber);
}
