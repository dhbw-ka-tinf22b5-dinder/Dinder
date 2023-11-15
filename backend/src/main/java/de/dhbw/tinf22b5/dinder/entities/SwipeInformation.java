package de.dhbw.tinf22b5.dinder.entities;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table
public class SwipeInformation {
    @EmbeddedId
    private SwipeInformationId swipeInformationId;

    @MapsId("userEmail")
    @ManyToOne
    @JoinColumn(name = "user_email", referencedColumnName = "email")
    private User user;

    @MapsId("advertisementId")
    @ManyToOne
    @JoinColumn(name = "advertisement_id", referencedColumnName = "advertisement_id")
    private Advertisement advertisement;

    private Instant swipeTime;
}