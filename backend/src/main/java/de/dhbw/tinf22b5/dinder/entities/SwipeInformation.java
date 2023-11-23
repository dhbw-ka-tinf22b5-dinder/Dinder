package de.dhbw.tinf22b5.dinder.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table
@Getter
@Setter
public class SwipeInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int swipeId;

    private Instant swipeTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "advertisement_id")
    private Advertisement advertisementId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contractor_email")
    private Users contractorEmail;
}