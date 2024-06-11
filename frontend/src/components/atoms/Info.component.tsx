import { type Advertisement } from "@/types/general.types.ts";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { InfoStyle } from "@/styles/swipecard.styles.ts";

interface Props {
	advertisement: Advertisement;
}
export const Info = (props: Props) => {
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
				<LocationOnIcon /> {props.advertisement.plz}{" "}
				{props.advertisement.location}
			</p>
			<p>
				<CalendarMonthIcon />{" "}
				{props.advertisement.creationTime.toLocaleDateString()}
			</p>
		</InfoStyle>
	);
};
