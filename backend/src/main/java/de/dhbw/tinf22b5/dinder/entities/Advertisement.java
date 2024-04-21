package de.dhbw.tinf22b5.dinder.entities;

import de.dhbw.tinf22b5.dinder.models.response.AdvertisementInformationModel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table
@Getter
@Setter
public class Advertisement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int advertisementId;
    private String title;
    private double price;
    private String location;
    @Column(name = "postal_code")
    private int plz;
    private String description;
    @Column(name = "image")
    private String imagePath;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "advertiser", nullable = false)
    private Users advertiser;

    @ManyToOne
    @JoinColumn(name = "contractor")
    private Users contractor;

    private Instant creationTime;

    @OneToMany(mappedBy = "advertisementId")
    private Set<SwipeInformation> swipeInformations = new LinkedHashSet<>();

    public AdvertisementInformationModel toInformationModel() {
        return new AdvertisementInformationModel(title, price, location, plz, description, imagePath, advertiser.toInformationModel(), creationTime);
    }
}