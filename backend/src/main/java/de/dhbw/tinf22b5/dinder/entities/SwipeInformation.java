package de.dhbw.tinf22b5.dinder.entities;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table
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

    public Users getContractoremail() {
        return contractorEmail;
    }

    public void setContractoremail(Users contractoremail) {
        this.contractorEmail = contractoremail;
    }

    public Advertisement getAdvertisementid() {
        return advertisementId;
    }

    public void setAdvertisementid(Advertisement advertisementid) {
        this.advertisementId = advertisementid;
    }
}