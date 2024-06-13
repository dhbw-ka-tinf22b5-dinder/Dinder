import { InfoStyle } from "@/styles/swipecard.styles.ts";
import type { Advertisement } from "@/types/general.types.ts";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";

interface Props {
	advertisement: Advertisement;
	isSwipe?: boolean;
}
export const Info = (props: Props) => {
	console.log(props.advertisement.plz);
	return (
		<InfoStyle>
			<h2>{props.advertisement.title}</h2>
			<p>
				<b>Description</b> {props.advertisement.description}
			</p>
			<p>
				<b>Price</b> {props.advertisement.price} €
			</p>
			<p>
				<LocationOnIcon />{" "}
				{`${props.advertisement.plz} ${props.advertisement.location}`}
			</p>
			<p>
				<CalendarMonthIcon />{" "}
				{props.advertisement.creationTime.toLocaleDateString()}
			</p>
			{props.isSwipe && (
				<p>
					<PersonIcon /> {props.advertisement.advertiser.userName}
				</p>
			)}
		</InfoStyle>
	);
};
