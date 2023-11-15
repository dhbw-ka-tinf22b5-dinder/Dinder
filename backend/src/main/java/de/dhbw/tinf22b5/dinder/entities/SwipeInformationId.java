package de.dhbw.tinf22b5.dinder.entities;

import jakarta.persistence.*;

import java.io.Serializable;

@Embeddable
public class SwipeInformationId implements Serializable {
    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "advertisement_id")
    private int advertisementId;
}