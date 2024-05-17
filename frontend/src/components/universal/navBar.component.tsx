'use client'
import HandymanIcon from "@mui/icons-material/Handyman";
import { Header, Nav } from "@/styles/universal.styles";
import { resetError } from "@/lib/thunks/resetErrorThunk";
import type { User } from "@/types/general.types";
import {type RootState, store} from "@/lib/store.ts";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
const NavBarComponent = () => {
	const {push} = useRouter();

	const valueUser: User = useSelector((state:RootState) => state.login);
	const nav = () => {
		push("/");
		store.dispatch(resetError());
	};
	return (
		<Nav>
			<HandymanIcon fontSize={"large"} onClick={() => nav()}/>
			<Header onClick={() => nav()}>DINDER</Header>
			{valueUser.userName}
		</Nav>
	);
};

export default NavBarComponent;
