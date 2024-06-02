"use client";
import { Header } from "@/styles/universal.styles";
import HandymanIcon from "@mui/icons-material/Handyman";
import { useRouter } from "next/navigation";

const NavBarStartComponent = () => {
	const { push } = useRouter();
	const nav = (href: string) => {
		push(href);
	};

	return (
		<div className={"NavBar"}>
			<HandymanIcon fontSize={"large"} onClick={() => nav("/")} />
			<Header onClick={() => nav("/")}>DINDER</Header>
		</div>
	);
};

export default NavBarStartComponent;
