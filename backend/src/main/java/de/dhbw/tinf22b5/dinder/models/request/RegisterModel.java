package de.dhbw.tinf22b5.dinder.models.request;

import java.util.regex.Pattern;

public record RegisterModel(String email, String userName, String password) implements RequestModel {
    private static final Pattern EMAIL_REGEX = Pattern.compile("(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\" +
            ".[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f" +
            "]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9]" +
            "(?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}" +
            "(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:" +
            "(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)])");

    @Override
    public boolean isInvalid() {
        // TODO: Better + more checks
        return this.email() == null || this.email().isBlank() ||
                this.userName() == null || this.userName().isBlank() ||
                this.password() == null || this.password().isBlank() ||
                !EMAIL_REGEX.matcher(this.email()).matches() ||
                this.userName().contains(" ") ||
                this.password().length() < 3;
    }
}

