"use client";
import { Button } from "@/components/atoms/Button.component.tsx";
import { swipeThunk } from "@/lib/thunks/SwipeThunk.ts";
import { ConfirmationBoxComponent } from "@/components/atoms/ConfirmationBox.Component.tsx";
import { Info } from "@/components/atoms/Info.component.tsx";
import { type RootState, store } from "@/lib/store.ts";
import {
	CardGrid,
	CardGridItem,
	InformationImage,
} from "@/styles/advertisementManagement.styles.ts";
import type { Advertisement, swipe } from "@/types/general.types.ts";
import { useSelector } from "react-redux";
import style from "../Advertisement.module.css";

let swipes: swipe[] = [];
let user: string[] = [];
let currentList = 0;
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
	console.log(publishedAdvertisements);
	return publishedAdvertisements;
}
function handleShowSwipes(id: number) {
	if (id === currentList) return;
	user = [];
	for (const swipe of swipes) {
		if (swipe.advertisementID === id && swipe.swipeState === "ACCEPTED")
			user.push(swipe.userName);
	}
	currentList = id;
}
export default function PublishedAdvertisements() {
	const advertisements: Advertisement[] = usePublishedAdvertisements();
	swipes = useSelector((state: RootState) => state.swipes.otherSwipes);
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
			<Info advertisement={advertisementProp} />
			<Button
				span={3}
				click={() => handleShowSwipes(advertisementProp.id)}
				text={"Show swipes"}
			/>
			{advertisementProp.id === currentList && user.length === 0 && (
				<p style={{ textAlign: "center", gridColumn: "span 3" }}>
					No swipes yet
				</p>
			)}
			{advertisementProp.id === currentList &&
				advertisementProp.contractor != null && (
					<p style={{ textAlign: "center", gridColumn: "span 3" }}>
						{advertisementProp.contractor.userName}
					</p>
				)}
			{advertisementProp.id === currentList &&
				user.length !== 0 &&
				advertisementProp.contractor == null && (
					<ConfirmationBoxComponent names={user} swipes={swipes} />
				)}
		</CardGridItem>
	);
};
