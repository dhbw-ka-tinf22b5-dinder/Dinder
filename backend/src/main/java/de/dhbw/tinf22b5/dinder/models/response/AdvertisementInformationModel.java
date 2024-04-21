package de.dhbw.tinf22b5.dinder.models.response;

import java.time.Instant;

public record AdvertisementInformationModel (String title, double price, String location, int plz, String description, String imagePath, UserInformationModel advertiser, Instant creationTime) {
}
