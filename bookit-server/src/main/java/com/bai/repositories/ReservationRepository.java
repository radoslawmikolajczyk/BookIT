package com.bai.repositories;

import com.bai.entities.Reservation;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;

@JdbcRepository(dialect = Dialect.POSTGRES)
public interface ReservationRepository extends CrudRepository<Reservation, Long> {
}
