// SwipePage.js

import {
	acceptAdvertisement,
	declineAdvertisement,
} from "@/clients/http-client.ts";
import { type RootState, store } from "@/lib/store.ts";
import { advertisementThunk } from "@/lib/thunks/AdvertisementThunk.ts";
import { AdvertisementImage, Card, SwipeInfo } from "@/styles/swipecard.styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../atoms/Button.component";

function SwipePage() {
	const ownUser = useSelector((state: RootState) => state.login.userName);
	const advertisements = useSelector(
		(state: RootState) => state.advertisement.Advertisement,
	).filter(
		(ad) => ad.contractor === null && ad.advertiser.userName !== ownUser,
	);

	const [currentAdvertisement, setCurrentAdvertisement] = useState(0);

	if (advertisements.length === 0) {
		store.dispatch(advertisementThunk());
		return <h1>loading</h1>;
	}
	//Next task advertisements
	const handleNext = () => {
		setCurrentAdvertisement((currentAdvertisement + 1) % advertisements.length);
	};
	//Next task advertisements
	const handlePrev = () => {
		setCurrentAdvertisement(
			(currentAdvertisement - 1 + advertisements.length) %
				advertisements.length,
		);
	};

	const handleAccept = () => {
		// Add logic for accepting the active box
		acceptAdvertisement(advertisements[currentAdvertisement].id).then((res) =>
			console.log(res),
		);
		handleNext();
	};
	const handleReject = () => {
		declineAdvertisement(advertisements[currentAdvertisement].id).then((res) =>
			console.log(res),
		);
		handleNext();
	};
	return (
		<Card>
			<h2 className="headerGrid">
				{advertisements[currentAdvertisement].title}
			</h2>
			<AdvertisementImage
				src={advertisements[currentAdvertisement].image}
				alt={advertisements[currentAdvertisement].title}
			/>
			<SwipeInfo>
				<p>
					<b>Description</b> {advertisements[currentAdvertisement].description}
				</p>
				<p>
					<b>Price</b> {advertisements[currentAdvertisement].price} €
				</p>
				<p>
					<LocationOnIcon /> {`${advertisements[currentAdvertisement].plz} ${advertisements[currentAdvertisement].location}`}
				</p>
				<p>
					<CalendarMonthIcon />{" "}
					{advertisements[
						currentAdvertisement
					].creationTime.toLocaleDateString()}
				</p>
				<p>
					<PersonIcon />{" "}
					{advertisements[currentAdvertisement].advertiser.userName}
				</p>
			</SwipeInfo>
			<Button span={1} click={handleReject} text={"Reject"} />

			<Button span={1} click={handlePrev} text={"Previous"} />

			<Button span={1} click={handleAccept} text={"Accept"} />
		</Card>
	);
}

export default SwipePage;
