package de.dhbw.tinf22b5.dinder.entities;

import de.dhbw.tinf22b5.dinder.models.request.AddAdvertisementModel;
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
    private int postalCode;
    private String description;
    @Column(name = "image")
    private String imagePath;

    @ManyToOne(optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "advertiser", nullable = false)
    private Users advertiser;

    @ManyToOne
    @JoinColumn(name = "contractor")
    private Users contractor;

    private Instant creationTime;

    @OneToMany(mappedBy = "advertisement")
    private Set<SwipeInformation> swipeInformations = new LinkedHashSet<>();

    public static Advertisement fromModel(AddAdvertisementModel addAdvertisementModel, Users advertiser, String image) {
        Advertisement advertisement = fromModel(addAdvertisementModel, advertiser);
        advertisement.setImagePath(image);
        return advertisement;
    }

    public static Advertisement fromModel(AddAdvertisementModel addAdvertisementModel, Users advertiser) {
        Advertisement advertisement = fromModel(addAdvertisementModel);
        advertisement.setAdvertiser(advertiser);
        return advertisement;
    }

    public static Advertisement fromModel(AddAdvertisementModel addAdvertisementModel) {
        Advertisement advertisement = new Advertisement();
        advertisement.setTitle(addAdvertisementModel.title());
        advertisement.setPrice(addAdvertisementModel.price());
        advertisement.setLocation(addAdvertisementModel.location());
        advertisement.setPostalCode(addAdvertisementModel.postalCode());
        advertisement.setDescription(addAdvertisementModel.description());
        advertisement.setCreationTime(Instant.now());
        return advertisement;
    }

    public String getFileName() {
        if (getImagePath() == null) {
            return "image";
        }

        try {
            String path = getImagePath().substring(getImagePath().indexOf("/") + 1);
            return path.substring(path.indexOf("/") + 1);
        }
        catch (StringIndexOutOfBoundsException e) {
            return "image";
        }
    }

    public AdvertisementInformationModel toInformationModel() {
        return new AdvertisementInformationModel(advertisementId, title, price, location, postalCode, description,
                imagePath, advertiser.toInformationModel(), contractor.toInformationModel(), creationTime);
    }
}