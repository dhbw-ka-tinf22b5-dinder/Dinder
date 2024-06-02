package de.dhbw.tinf22b5.dinder.models.request;

import de.dhbw.tinf22b5.dinder.models.SwipeState;

public record AddSwipeInformationModel(SwipeState swipeState) implements RequestModel {
    @Override
    public boolean isInvalid() {
        //always return false, the single value can be whatever
        return false;
    }
}