package de.dhbw.tinf22b5.dinder.entities;

import de.dhbw.tinf22b5.dinder.models.SwipeState;
import de.dhbw.tinf22b5.dinder.models.response.SwipeInformationModel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class SwipeInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int swipeId;

    private Instant swipeTime;

    @Enumerated
    @Column(name = "swipe_state", nullable = false)
    private SwipeState swipeState;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "advertisement_id")
    private Advertisement advertisement;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contractor_email")
    private Users contractor;

    public SwipeInformation(Instant swipeTime, SwipeState swipeState, Advertisement advertisement, Users contractor) {
        this.swipeTime = swipeTime;
        this.swipeState = swipeState;
        this.advertisement = advertisement;
        this.contractor = contractor;
    }

    public SwipeInformationModel toInformationModel() {
        return new SwipeInformationModel(swipeId, swipeTime, swipeState, advertisement.toInformationModel(),
                contractor.toInformationModel());
    }
}