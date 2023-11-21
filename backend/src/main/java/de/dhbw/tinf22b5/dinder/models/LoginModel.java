package de.dhbw.tinf22b5.dinder.models;

public record LoginModel (String loginName, String password) implements Model {
    @Override
    public boolean isValid() {
        return this.loginName() == null || this.loginName().isBlank() || this.password() == null || this.password().isBlank();
    }
}
