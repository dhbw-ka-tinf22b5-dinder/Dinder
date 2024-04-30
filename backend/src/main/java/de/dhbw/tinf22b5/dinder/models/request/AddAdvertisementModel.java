package de.dhbw.tinf22b5.dinder.models.request;

public record AddAdvertisementModel(String name, String description) implements RequestModel {

    @Override
    public boolean isInvalid() {
        return false;
    }
}
