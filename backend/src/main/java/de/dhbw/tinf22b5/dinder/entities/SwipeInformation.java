package de.dhbw.tinf22b5.dinder.entities;

import jakarta.persistence.*;
import org.springframework.context.annotation.Primary;

import java.time.Instant;

@Entity
@Table
public class SwipeInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int swipeId;

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