package de.dhbw.tinf22b5.dinder.models.request;

public record LoginModel (String loginName, String password) implements RequestModel {
    @Override
    public boolean isInvalid() {
        return this.loginName() == null || this.loginName().isBlank() || this.password() == null || this.password().isBlank();
    }
}
