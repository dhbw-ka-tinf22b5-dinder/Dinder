package de.dhbw.tinf22b5.dinder.models.request;

public record AddAdvertisementModel(String title, double price, String location, int postalCode, String description) implements RequestModel {
    @Override
    public boolean isInvalid() {
        return false;
    }
}
