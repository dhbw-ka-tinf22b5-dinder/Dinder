// SwipePage.js

import { AdvertismentImage, Card, Info } from "@/styles/swipecard.styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "../atoms/Button.component";
import { advertisementThunk } from "@/lib/thunks/AdvertisementThunk.ts";
import { type RootState, store } from "@/lib/store.ts";
import { useSelector } from "react-redux";
import {
	decrementDisplay,
	incrementDisplay,
} from "@/lib/slices/advertisement.ts";

function SwipePage() {
	const advertisements = useSelector(
		(state: RootState) => state.advertisement.Advertisement,
	);
	const currentAdvertisement = useSelector(
		(state: RootState) => state.advertisement.displayedAdvertisement,
	);
	if (advertisements.length === 0) {
		store.dispatch(advertisementThunk());
		return <h1>loading</h1>;
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
