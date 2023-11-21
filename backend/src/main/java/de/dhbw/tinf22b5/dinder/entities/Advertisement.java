package de.dhbw.tinf22b5.dinder.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

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
    private Users advertiser;

    @ManyToOne
    @JoinColumn(name = "contractor_email")
    private Users contractor;

    private Instant creationTime;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "advertisementid", nullable = false)
    private Integer id;

    @Column(name = "postalcode", nullable = false)
    private Integer postalcode;

    @Column(name = "image")
    private String image;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "advertiser", nullable = false)
    private Users advertiser1;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "contractor")
    private Users contractor1;

    @OneToMany(mappedBy = "advertisementid")
    private Set<SwipeInformation> swipeInformations = new LinkedHashSet<>();

    public Set<SwipeInformation> getSwipeInformations() {
        return swipeInformations;
    }

    public void setSwipeInformations(Set<SwipeInformation> swipeInformations) {
        this.swipeInformations = swipeInformations;
    }

    public Users getContractor1() {
        return contractor1;
    }

    public void setContractor1(Users contractor1) {
        this.contractor1 = contractor1;
    }

    public Users getAdvertiser1() {
        return advertiser1;
    }

    public void setAdvertiser1(Users advertiser1) {
        this.advertiser1 = advertiser1;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getPostalcode() {
        return postalcode;
    }

    public void setPostalcode(Integer postalcode) {
        this.postalcode = postalcode;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Users getContractor() {
        return contractor;
    }

    public void setContractor(Users contractor) {
        this.contractor = contractor;
    }
}