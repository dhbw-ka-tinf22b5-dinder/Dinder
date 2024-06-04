"use client";
import { Button } from "@/components/atoms/Button.component.tsx";
import {
	CardGrid,
	CardGridItem,
	InformationImage,
} from "@/styles/advertisementManagement.styles.ts";
import { Info } from "@/styles/swipecard.styles.ts";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import style from "../Advertisement.module.css";
import {Advertisement} from "@/types/general.types.ts";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store.ts";

function usePublishedAdvertisements():Advertisement[]{
    const publishedAdvertisements: Advertisement[] = [];
    const advertisementSelector:Advertisement[] = useSelector((state:RootState) => state.advertisement.Advertisement)
    const username:string = useSelector((state:RootState) => state.login.userName)
    for (const advertisement of advertisementSelector) {
        if (advertisement.advertiser.userName===username){
            publishedAdvertisements.push(advertisement);
        }
    }
    return publishedAdvertisements;
}

export default function PublishedAdvertisements() {
	//const advertisements //TODO: Get advertisements from backend
    const advertisements:Advertisement[] = usePublishedAdvertisements()
	return (
		<CardGrid>
			<div className={style.grid}>
				{advertisements?.map((advertisement) => {
					return (
                            <AdvertisementItem key={advertisement.id} advertisementProp={advertisement}  />				);
				})}
			</div>
		</CardGrid>
	);
}



const AdvertisementItem = ({advertisementProp}:{advertisementProp:Advertisement}) => {
	return (
		<CardGridItem>
			<InformationImage src={advertisementProp.image} alt={advertisementProp.title} />
			<Info>
				<h2>{advertisementProp.title}</h2>
				<p>
					<b>Description</b> {advertisementProp.description}
				</p>
				<p>
					<b>Price</b> {advertisementProp.price} €
				</p>
				<p>
					<LocationOnIcon /> {advertisementProp.plz} {advertisementProp.location}
				</p>
				<p>
					<CalendarMonthIcon /> {advertisementProp.creationTime.toLocaleDateString()}
				</p>
			</Info>
			<Button span={3} click={handleShowSwipes} text={"Show swipes"} />
		</CardGridItem>
	);
}

const handleShowSwipes = () => {
	//TODO: Show swipes
};
