package com.ars.message;

import java.util.Locale;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class ApplicationMessages {

    private final Environment environment;

    public ApplicationMessages(Environment environment) {
        this.environment = environment;
    }

    public String get(String propertyName, Object... arguments) {
        String message = environment.getRequiredProperty(propertyName);
        return arguments.length == 0 ? message : String.format(Locale.ROOT, message, arguments);
    }
}
