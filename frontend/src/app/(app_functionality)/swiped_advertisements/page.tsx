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
import { RootState } from "@/lib/store.ts";

export default function SwipedAdvertisement() {
	const advertisements = useSelector(
		(state: RootState) => state.advertisement.Advertisement,
	); //TODO: Get advertisements from backend
	const swipes = useSelector((state: RootState) => state.swipes.ownSwipes);
	const SwipeIDs: number[] = swipes.map((swipe) => swipe.advertisementID);
	return (
		<CardGrid>
			<div className={style.grid}>
				{advertisements
					?.filter((ad) => SwipeIDs.includes(ad.id))
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

			<label className={style.state}>Pending</label>
			<Button span={3} click={handleDecline} text={"Delete"} />
		</CardGridItem>
	);
}

//TODO: State -> Pending, Accepted, Declined (Label)

const handleDecline = () => {
	//TODO: Delete advertisement
};
