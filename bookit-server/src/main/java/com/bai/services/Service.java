package com.bai.services;

import com.bai.configuration.Config;
import jakarta.inject.Inject;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public abstract class Service {
    @Inject
    Config config;

    protected Timestamp getParsedDate(String dateToParse) {
        if (dateToParse == null) {
            return null;
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(config.getDateFormat());
        LocalDateTime dateTime = LocalDateTime.parse(dateToParse, formatter);
        return Timestamp.valueOf(dateTime);
    }
}
