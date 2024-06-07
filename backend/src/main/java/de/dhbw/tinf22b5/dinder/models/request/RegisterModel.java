package de.dhbw.tinf22b5.dinder.models.request;

import java.util.regex.Pattern;

@SuppressWarnings("RegExpUnnecessaryNonCapturingGroup")
public record RegisterModel(String email, String userName, String password) implements RequestModel {
    private static final String EMAIL_REGEX_USERNAME = "(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\" +
            ".[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f" +
            "]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")";

    private static final String EMAIL_REGEX_DOMAIN = "(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9]" +
            "(?:[a-z0-9-]*[a-z0-9])?)";

    private static final Pattern EMAIL_REGEX = Pattern.compile(EMAIL_REGEX_USERNAME + "@" + EMAIL_REGEX_DOMAIN);

    @Override
    public boolean isInvalid() {
        return this.email() == null || this.email().isBlank() ||
                this.userName() == null || this.userName().isBlank() ||
                this.password() == null || this.password().isBlank() ||
                !EMAIL_REGEX.matcher(this.email()).matches() ||
                this.userName().contains(" ") ||
                this.password().length() < 3;
    }
}

