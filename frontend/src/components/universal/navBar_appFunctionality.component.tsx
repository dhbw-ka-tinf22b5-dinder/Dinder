"use client";
import HandymanIcon from "@mui/icons-material/Handyman";
import {
	Header,
	HeaderLogout,
	HeaderSubpages,
	Nav,
} from "@/styles/universal.styles";
import { useRouter } from "next/navigation";
const NavBarAppFunctionalityComponent = () => {
	const { push } = useRouter();
	const nav = (href: string) => {
		push(href);
	};

	return (
		<Nav>
			<HandymanIcon fontSize={"large"} onClick={() => nav("/")} />
			<Header onClick={() => nav("/")}>DINDER</Header>
			<HeaderSubpages onClick={() => nav("/swipe")}>SWIPE</HeaderSubpages>
			<HeaderSubpages onClick={() => nav("/published_advertisements")}>
				published advertisements
			</HeaderSubpages>
			<HeaderSubpages onClick={() => nav("/swiped_advertisements")}>
				swiped advertisements
			</HeaderSubpages>
			<HeaderSubpages onClick={() => nav("/new_advertisement")}>
				new advertisement
			</HeaderSubpages>
			<HeaderLogout onClick={() => nav("/")}>logout</HeaderLogout>
		</Nav>
	);
};

export default NavBarAppFunctionalityComponent;