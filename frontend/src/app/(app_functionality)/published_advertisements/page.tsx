'use client';
import style from '../Advertisement.module.css';
import {Info} from "@/styles/swipecard.styles.ts";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {Button} from "@/components/atoms/Button.component.tsx";
import {CardGrid, CardGridItem, InformationImage} from "@/styles/advertisementManagement.styles.ts";
/* eslint-disable @typescript-eslint/no-explicit-any */


const advertisements = [
	{
		id: 1,
		title: "Rasenmähen",
		creationTime: "01.01.2001",
		location: "Freiburg, Deutschland",
        price: 10,
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwfqFhXDTDDPNU_4T8migaRz1T7Uc-XCFU3mYONa_4hw&s",
	},
	{
		id: 2,
		title: "Wände streichen",
        creationTime: "01.01.2001",
		location: "Karlsruhe, Deutschland",
        price: 10,
		image:
			"https://u-s-e.org/wp-content/uploads/Malerei_01_1024x683-1024x683.jpg",
	},
	{
		id: 3,
		title: "Umzughilfe",
        creationTime: "01.01.2001",
        price: 10,
		location: "Frankfurt, Deutschland",
		image:
			"https://cdn.lagerbox.com/thumb/media/1027/studenten-umzugshilfe_01749679_9fb2a0d8_1_l75-w1366-h650-c--l75-w1920-h914-c--l75-w375-h450-c--l75-w750-h900-c.webp",
	},
	{
		id: 4,
		title: "Holz tragen",
        creationTime: "01.01.2001",
        price: 10,
		location: "Stuttgart, Deutschland",
		image:
			"https://imgix.obi.de/api/disc/cms/public/dam/DE-AT-Assets/Aussenbereich/holz-stapeln/1_Holz-stapeln_01256989.jpg?crop=focalpoint&fit=crop&fp-x=0.346&fp-y=0.584&fp-z=1&w=480&auto=format%2Ccompress&h=270",
	},
    {
        id: 5,
        title: "Holz tragen",
        creationTime: "01.01.2001",
        price: 10,
        location: "Stuttgart, Deutschland",
        image:
                "https://imgix.obi.de/api/disc/cms/public/dam/DE-AT-Assets/Aussenbereich/holz-stapeln/1_Holz-stapeln_01256989.jpg?crop=focalpoint&fit=crop&fp-x=0.346&fp-y=0.584&fp-z=1&w=480&auto=format%2Ccompress&h=270",
    },
    {
        id: 6,
        title: "Holz tragen",
        creationTime: "01.01.2001",
        price: 10,
        location: "Stuttgart, Deutschland",
        image:
                "https://imgix.obi.de/api/disc/cms/public/dam/DE-AT-Assets/Aussenbereich/holz-stapeln/1_Holz-stapeln_01256989.jpg?crop=focalpoint&fit=crop&fp-x=0.346&fp-y=0.584&fp-z=1&w=480&auto=format%2Ccompress&h=270",
    },
    {
        id: 7,
        title: "Holz tragen",
        creationTime: "01.01.2001",
        price: 10,
        location: "Stuttgart, Deutschland",
        image:
                "https://imgix.obi.de/api/disc/cms/public/dam/DE-AT-Assets/Aussenbereich/holz-stapeln/1_Holz-stapeln_01256989.jpg?crop=focalpoint&fit=crop&fp-x=0.346&fp-y=0.584&fp-z=1&w=480&auto=format%2Ccompress&h=270",
    },
    {
        id: 8,
        title: "Holz tragen",
        creationTime: "01.01.2001",
        price: 10,
        location: "Stuttgart, Deutschland",
        image:
                "https://imgix.obi.de/api/disc/cms/public/dam/DE-AT-Assets/Aussenbereich/holz-stapeln/1_Holz-stapeln_01256989.jpg?crop=focalpoint&fit=crop&fp-x=0.346&fp-y=0.584&fp-z=1&w=480&auto=format%2Ccompress&h=270",
    },
    {
        id: 9,
        title: "Holz tragen",
        creationTime: "01.01.2001",
        price: 10,
        location: "Stuttgart, Deutschland",
        image:
                "https://imgix.obi.de/api/disc/cms/public/dam/DE-AT-Assets/Aussenbereich/holz-stapeln/1_Holz-stapeln_01256989.jpg?crop=focalpoint&fit=crop&fp-x=0.346&fp-y=0.584&fp-z=1&w=480&auto=format%2Ccompress&h=270",
    }
];

export default function PublishedAdvertisements() {
    //const advertisements //TODO: Get advertisements from backend
	return (
            <CardGrid>
                <div className={style.grid}>
                    {advertisements?.map((advertisement) => {
                        return <Advertisement key={advertisement.id} advertisement={advertisement}/>;
                    })}
                </div>
            </CardGrid>
    );
}

function Advertisement({advertisement}: any) {

    return (
            <CardGridItem>
                <InformationImage src={advertisement.image} alt={advertisement.title}/>
                <Info>
                <h2>{advertisement.title}</h2>
                    <p>
                        <b>Description</b> {advertisement.description}
                    </p>
                    <p>
                        <b>Price</b> {advertisement.price} €
                    </p>
                    <p>
                        <LocationOnIcon /> {advertisement.plz} {advertisement.location}
                    </p>
                    <p>
                        <CalendarMonthIcon /> {advertisement.creationTime}
                    </p>
                </Info>
                <Button span={3} click={handleShowSwipes} text={"Show swipes"} />
            </CardGridItem>
    );
}

const handleShowSwipes = () => {
    //TODO: Show swipes
};
