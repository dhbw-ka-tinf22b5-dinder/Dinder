"use client";
import { Button } from "@/components/atoms/Button.component.tsx";
import { ConfirmationBoxComponent } from "@/components/atoms/ConfirmationBox.Component.tsx";
import { Info } from "@/components/atoms/Info.component.tsx";
import { type RootState, store } from "@/lib/store.ts";
import { swipeThunk } from "@/lib/thunks/SwipeThunk.ts";
import {
	CardGrid,
	CardGridItem,
	InformationImage,
} from "@/styles/advertisementManagement.styles.ts";
import type { Advertisement, swipe } from "@/types/general.types.ts";
import { useState } from "react";
import { useSelector } from "react-redux";
import style from "../Advertisement.module.css";

function usePublishedAdvertisements(
	advertisementSelector: Advertisement[],
	username: string,
): Advertisement[] {
	const publishedAdvertisements: Advertisement[] = [];

	for (const advertisement of advertisementSelector) {
		if (advertisement.advertiser.userName === username) {
			publishedAdvertisements.push(advertisement);
		}
	}

	const swipeTester: swipe[] = useSelector(
		(state: RootState) => state.swipes.otherSwipes,
	);
	console.log(`swipes ${swipeTester.length}`);
	if (publishedAdvertisements.length === 0 || swipeTester.length !== 0)
		return publishedAdvertisements;
	store.dispatch(swipeThunk(publishedAdvertisements));
	return publishedAdvertisements;
}

export default function PublishedAdvertisements() {
	const [currentList, setList] = useState(0);
	const advertisementSelector: Advertisement[] = useSelector(
		(state: RootState) => state.advertisement.Advertisement,
	);
	const username: string = useSelector(
		(state: RootState) => state.login.userName,
	);
	//store.dispatch(swipeThunk(username, advertisementSelector));
	const advertisements: Advertisement[] = usePublishedAdvertisements(
		advertisementSelector,
		username,
	);
	const globalSwipes: swipe[] = useSelector(
		(state: RootState) => state.swipes.otherSwipes,
	);
	if (advertisements.length === 0) {
		return (
			<>
				<h1>Nothing to show here</h1>
			</>
		);
	}
	return (
		<CardGrid>
			<div className={style.grid}>
				{advertisements.map((advertisement) => {
					return (
						<AdvertisementItem
							key={advertisement.id}
							advertisement={advertisement}
							currentList={currentList}
							swipes={globalSwipes.filter(
								(s) => s.advertisementID === advertisement.id,
							)}
							setCurrentList={() => setList(advertisement.id)}
						/>
					);
				})}
			</div>
		</CardGrid>
	);
}
interface advertisementItems {
	advertisement: Advertisement;
	currentList: number;
	swipes: swipe[];
	setCurrentList: () => void;
}
const AdvertisementItem = (advertisementProp: advertisementItems) => {
	return (
		<CardGridItem>
			<InformationImage
				src={advertisementProp.advertisement.image}
				alt={advertisementProp.advertisement.title}
			/>
			<Info advertisement={advertisementProp.advertisement} />
			<Button
				span={3}
				click={advertisementProp.setCurrentList}
				text={"Show swipes"}
			/>
			{advertisementProp.advertisement.id === advertisementProp.currentList &&
				advertisementProp.swipes.length === 0 && (
					<p style={{ textAlign: "center", gridColumn: "span 3" }}>
						No swipes yet
					</p>
				)}
			{advertisementProp.advertisement.id === advertisementProp.currentList &&
				advertisementProp.advertisement.contractor != null && (
					<p style={{ textAlign: "center", gridColumn: "span 3" }}>
						{advertisementProp.advertisement.contractor.userName}
					</p>
				)}
			{advertisementProp.advertisement.id === advertisementProp.currentList &&
				advertisementProp.swipes.length !== 0 &&
				advertisementProp.advertisement.contractor == null && (
					<ConfirmationBoxComponent swipes={advertisementProp.swipes} />
				)}
		</CardGridItem>
	);
};
