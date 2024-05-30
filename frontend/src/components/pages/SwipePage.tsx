// SwipePage.js

import { AdvertismentImage, Card, Info } from "@/styles/swipecard.styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
//import './App.css';
import { Button } from "../atoms/Button.component";
import { advertisementThunk } from "@/lib/thunks/AdvertisementThunk.ts";
import { RootState, store } from "@/lib/store.ts";
import { useSelector } from "react-redux";
import {
	decrementDisplay,
	incrementDisplay,
} from "@/lib/slices/advertisement.ts";

/*const data = [
	{
		imageUrl:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwfqFhXDTDDPNU_4T8migaRz1T7Uc-XCFU3mYONa_4hw&s",
	},
	{
		imageUrl:
			"https://u-s-e.org/wp-content/uploads/Malerei_01_1024x683-1024x683.jpg",
	},
	{
		imageUrl:
			"https://cdn.lagerbox.com/thumb/media/1027/studenten-umzugshilfe_01749679_9fb2a0d8_1_l75-w1366-h650-c--l75-w1920-h914-c--l75-w375-h450-c--l75-w750-h900-c.webp",
	},
	{
		imageUrl:
			"https://imgix.obi.de/api/disc/cms/public/dam/DE-AT-Assets/Aussenbereich/holz-stapeln/1_Holz-stapeln_01256989.jpg?crop=focalpoint&fit=crop&fp-x=0.346&fp-y=0.584&fp-z=1&w=480&auto=format%2Ccompress&h=270",
	},
];*/

function SwipePage() {
	const advertisements = useSelector(
		(state: RootState) => state.advertisement.Advertisement,
	);
	const currentAdvertisement = useSelector(
		(state: RootState) => state.advertisement.displayedAdvertisement,
	);
	if (advertisements.length == 0) {
		store.dispatch(advertisementThunk());
	}
	//Next task advertisements
	const handleNext = () => {
		store.dispatch(incrementDisplay());
	};
	//Next task advertisements
	const handlePrev = () => {
		store.dispatch(decrementDisplay());
	};

	const handleAccept = () => {
		// Add logic for accepting the active box
		console.log(advertisements[currentAdvertisement]);
	};
	if (advertisements.length === 0) {
		return <h1>loading</h1>;
	}
	console.log("test Seite");
	const currentItem = advertisements[currentAdvertisement];
	return (
		<Card>
			<AdvertismentImage src={currentItem.image} alt={currentItem.title} />
			<Info>
				<h2>{currentItem.title}</h2>
				<p>
					<b>Beschreibung</b> {currentItem.description}
				</p>
				<p>
					<b>Preis</b> {currentItem.price}
				</p>
				<p>
					<LocationOnIcon /> {currentItem.plz} {currentItem.location}
				</p>
				<p>
					<CalendarMonthIcon />
					{currentItem.creationTime.toLocaleDateString()}
				</p>
				<p>
					<PersonIcon /> {currentItem.advertiser.userName}
				</p>
			</Info>
			<Button span={1} click={handlePrev} text={"Previous"} />

			<Button span={1} click={handleAccept} text={"Accept"} />

			<Button span={1} click={handleNext} text={"Next"} />
		</Card>
	);
}

export default SwipePage;
