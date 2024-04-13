package com.bai.configuration;

import io.micronaut.context.annotation.Bean;
import io.micronaut.context.annotation.ConfigurationProperties;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Bean
@ConfigurationProperties("app")
@Getter
@Setter
public class Config {
    @NotNull
    private String dateFormat;
}
