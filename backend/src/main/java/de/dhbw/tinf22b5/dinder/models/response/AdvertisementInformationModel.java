package de.dhbw.tinf22b5.dinder.models.response;

import java.time.Instant;

public record AdvertisementInformationModel(int advertisementId, String title, double price, String location,
                                            int postalCode, String description, String imagePath,
                                            UserInformationModel advertiser, UserInformationModel contractor,
                                            Instant creationTime) {
}
