package de.dhbw.tinf22b5.dinder.models;

public record RegisterModel(String email, String userName, String password) implements Model {
    @Override
    public boolean isInvalid() {
        // TODO: Better + more checks
        return this.email() == null || this.userName() == null || this.password() == null;
    }
}

