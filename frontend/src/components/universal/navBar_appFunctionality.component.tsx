"use client";
import {
	Header,
	HeaderLogout,
	HeaderSubpages,
} from "@/styles/universal.styles";
import HandymanIcon from "@mui/icons-material/Handyman";
import axios from "axios";
import router from "next/dist/client/router";
import { useRouter } from "next/navigation";

const NavBarAppFunctionalityComponent = () => {
	const { push } = useRouter();
	const nav = (href: string) => {
		push(href);
	};

	return (
		<div className={"NavBar"}>
			<HandymanIcon fontSize={"large"} onClick={() => nav("/")} />
			<Header onClick={() => nav("/")}>DINDER</Header>
			<HeaderSubpages onClick={() => nav("/")}>SWIPE</HeaderSubpages>
			<HeaderSubpages onClick={() => nav("/published_advertisements")}>
				published advertisements
			</HeaderSubpages>
			<HeaderSubpages onClick={() => nav("/swiped_advertisements")}>
				swiped advertisements
			</HeaderSubpages>
			<HeaderSubpages onClick={() => nav("/new_advertisement")}>
				new advertisement
			</HeaderSubpages>
			<HeaderLogout
				onClick={() =>
					axios.post("/api/v1/logout").then(() => {
						window.sessionStorage.setItem("isLoggedIn", "0");
						nav("/");
						router.reload();
					})
				}
			>
				logout
			</HeaderLogout>
		</div>
	);
};

export default NavBarAppFunctionalityComponent;
