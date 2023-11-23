package de.dhbw.tinf22b5.dinder.entities;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table
public class SwipeInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int swipeId;


    @ManyToOne
    @JoinColumn(name = "user_email")
    private Users user;


    @ManyToOne
    @JoinColumn(name = "advertisement_id")
    private Advertisement advertisement;

    private Instant swipeTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "advertisementid")
    private Advertisement advertisementid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contractoremail")
    private Users contractoremail;

    public Users getContractoremail() {
        return contractoremail;
    }

    public void setContractoremail(Users contractoremail) {
        this.contractoremail = contractoremail;
    }

    public Advertisement getAdvertisementid() {
        return advertisementid;
    }

    public void setAdvertisementid(Advertisement advertisementid) {
        this.advertisementid = advertisementid;
    }
}