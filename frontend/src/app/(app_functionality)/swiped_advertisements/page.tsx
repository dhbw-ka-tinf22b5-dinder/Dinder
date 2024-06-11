"use client";
import { Button } from "@/components/atoms/Button.component.tsx";
import {
	CardGrid,
	CardGridItem,
	InformationImage,
} from "@/styles/advertisementManagement.styles.ts";
import { Info } from "@/components/atoms/Info.component";
import style from "../Advertisement.module.css";
import { type Advertisement } from "@/types/general.types.ts";
import { useSelector } from "react-redux";
import { RootState, store } from "@/lib/store.ts";
import { OwnSwipeThunk } from "@/lib/thunks/SwipeThunk.ts";

export default function SwipedAdvertisement() {
	store.dispatch(OwnSwipeThunk());
	const advertisements = useSelector(
		(state: RootState) => state.advertisement.Advertisement,
	);
	const swipes = useSelector((state: RootState) => state.swipes.ownSwipes);
	const AdvertisementIDsFromSwipe: number[] = swipes
		.filter((swipe) => swipe.swipeState == "ACCEPTED")
		.map((swipe) => swipe.advertisementID);
	return (
		<CardGrid>
			<div className={style.grid}>
				{advertisements
					?.filter((ad) => AdvertisementIDsFromSwipe.includes(ad.id))
					.map((advertisement) => {
						return (
							<Advertisement
								key={advertisement.id}
								advertisement={advertisement}
							/>
						);
					})}
			</div>
		</CardGrid>
	);
}

function Advertisement({ advertisement }: { advertisement: Advertisement }) {
	return (
		<CardGridItem>
			<InformationImage src={advertisement.image} alt={advertisement.title} />
			<Info advertisement={advertisement} />

			<SwipeState key={advertisement.id} advertisement={advertisement} />
		</CardGridItem>
	);
}

function SwipeState({ advertisement }: { advertisement: Advertisement }) {
	const valueUser = useSelector((state: RootState) => state.login.userName);
	if (advertisement.contractor == null) {
		return (
			<label className={style.state} style={{ backgroundColor: "yellow" }}>
				Pending
			</label>
		);
	} else if (advertisement.contractor.userName == valueUser) {
		return (
			<label className={style.state} style={{ backgroundColor: "lightgreen" }}>
				Accepted
			</label>
		);
	} else {
		return (
			<label className={style.state} style={{ backgroundColor: "red" }}>
				Declined
			</label>
		);
	}
}
