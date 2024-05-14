package de.dhbw.tinf22b5.dinder.models.request;

//TODO generate image, creation time
public record AddAdvertisementModel(String title, double price, String location, int postalCode, String description) implements RequestModel {
    @Override
    public boolean isInvalid() {
        return false;
    }
}
