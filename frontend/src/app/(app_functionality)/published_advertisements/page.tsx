"use client";
import { Button } from "@/components/atoms/Button.component.tsx";
import { RootState, store } from "@/lib/store.ts";
import {
	CardGrid,
	CardGridItem,
	InformationImage,
} from "@/styles/advertisementManagement.styles.ts";
import { Info } from "@/styles/swipecard.styles.ts";
import type { Advertisement, swipe } from "@/types/general.types.ts";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSelector } from "react-redux";
import style from "../Advertisement.module.css";
import { swipeThunk } from "@/lib/thunks/SwipeThunk.ts";

let swipes: swipe[] = [];
function usePublishedAdvertisements(): Advertisement[] {
	const publishedAdvertisements: Advertisement[] = [];
	const advertisementSelector: Advertisement[] = useSelector(
		(state: RootState) => state.advertisement.Advertisement,
	);
	const username: string = useSelector(
		(state: RootState) => state.login.userName,
	);
	store.dispatch(swipeThunk(username, advertisementSelector));
	for (const advertisement of advertisementSelector) {
		if (advertisement.advertiser.userName === username) {
			publishedAdvertisements.push(advertisement);
		}
	}
	return publishedAdvertisements;
}
function handleShowSwipes(id: number) {
	const user: string[] = [];
	for (const swipe of swipes) {
		if (swipe.advertisementID == id && swipe.swipeState == "ACCEPTED")
			user.push(swipe.userName);
	}
	alert(user);
	//TODO: Show swipes
}
export default function PublishedAdvertisements() {
	const advertisements: Advertisement[] = usePublishedAdvertisements();
	swipes = useSelector((state: RootState) => state.swipes);
	return (
		<CardGrid>
			<div className={style.grid}>
				{advertisements?.map((advertisement) => {
					return (
						<AdvertisementItem
							key={advertisement.id}
							advertisementProp={advertisement}
						/>
					);
				})}
			</div>
		</CardGrid>
	);
}

const AdvertisementItem = ({
	advertisementProp,
}: { advertisementProp: Advertisement }) => {
	return (
		<CardGridItem>
			<InformationImage
				src={advertisementProp.image}
				alt={advertisementProp.title}
			/>
			<Info>
				<h2>{advertisementProp.title}</h2>
				<p>
					<b>Description</b> {advertisementProp.description}
				</p>
				<p>
					<b>Price</b> {advertisementProp.price} €
				</p>
				<p>
					<LocationOnIcon /> {advertisementProp.plz}{" "}
					{advertisementProp.location}
				</p>
				<p>
					<CalendarMonthIcon />{" "}
					{advertisementProp.creationTime.toLocaleDateString()}
				</p>
			</Info>
			<Button
				span={3}
				click={() => handleShowSwipes(advertisementProp.id)}
				text={"Show swipes"}
			/>
		</CardGridItem>
	);
};
