"use client";
import { Header, Nav } from "@/styles/universal.styles";
import HandymanIcon from "@mui/icons-material/Handyman";
import { useRouter } from "next/navigation";
const NavBarStartComponent = () => {
	const { push } = useRouter();
	const nav = (href: string) => {
		push(href);
	};

	return (
		<Nav>
			<HandymanIcon fontSize={"large"} onClick={() => nav("/")} />
			<Header onClick={() => nav("/")}>DINDER</Header>
		</Nav>
	);
};

export default NavBarStartComponent;
