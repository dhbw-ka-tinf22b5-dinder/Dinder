package de.dhbw.tinf22b5.dinder.models.response;

import de.dhbw.tinf22b5.dinder.models.SwipeState;

import java.time.Instant;

public record SwipeInformationModel(int swipeId, Instant swipeTime, SwipeState swipeState,
                                    AdvertisementInformationModel advertisement, UserInformationModel user) {
}