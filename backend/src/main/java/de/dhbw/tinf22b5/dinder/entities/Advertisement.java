package de.dhbw.tinf22b5.dinder.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Entity
@Table
public class Advertisement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "advertisement_id")
    private int advertisementId;
    private String title;
    private double price;
    private String location;
    @Column(name = "postal_code")
    private int plz;
    private String description;
    @Column(length = 255)
    private String imagePath;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(nullable = false)
    private User creator;

    private Instant creationTime;
}