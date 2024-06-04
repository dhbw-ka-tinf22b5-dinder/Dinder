// SwipePage.js

import {
	decrementDisplay,
	incrementDisplay,
} from "@/lib/slices/advertisement.ts";
import { type RootState, store } from "@/lib/store.ts";
import { advertisementThunk } from "@/lib/thunks/AdvertisementThunk.ts";
import { AdvertismentImage, Card, Info } from "@/styles/swipecard.styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import { Button } from "../atoms/Button.component";
import { acceptAdvertisement } from "@/clients/http-client.ts";

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

	const currentItem = advertisements[currentAdvertisement];
	const handleAccept = () => {
		// Add logic for accepting the active box
		acceptAdvertisement(currentItem.id).then((res) => console.log(res));
	};
	return (
		<Card>
			<AdvertismentImage src={currentItem.image} alt={currentItem.title} />
			<Info>
				<h2>{currentItem.title}</h2>
				<p>
					<b>Description</b> {currentItem.description}
				</p>
				<p>
					<b>Price</b> {currentItem.price} €
				</p>
				<p>
					<LocationOnIcon /> {currentItem.plz} {currentItem.location}
				</p>
				<p>
					<CalendarMonthIcon /> {currentItem.creationTime.toLocaleDateString()}
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
