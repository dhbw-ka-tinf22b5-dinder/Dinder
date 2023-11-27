package de.dhbw.tinf22b5.dinder.models.request;

public record RegisterModel(String email, String userName, String password) implements RequestModel {
    @Override
    public boolean isInvalid() {
        // TODO: Better + more checks
        return this.email() == null || this.email().isBlank() ||
                this.userName() == null || this.userName().isBlank() ||
                this.password() == null || this.password().isBlank();
    }
}

