package com.bai.entities;

import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Serdeable
@MappedEntity
@Table(name="rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "building_name")
    private String buildingName;

    @NotNull
    @Column(name = "floor_number")
    private int floorNumber;

    @NotNull
    @Column(name = "room_name")
    private String roomName;

    @OneToMany(mappedBy = "reservation", cascade = {CascadeType.REMOVE, CascadeType.MERGE})
    private List<Reservation> reservations;
}
