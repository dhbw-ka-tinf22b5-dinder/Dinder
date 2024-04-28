// import HandymanIcon from "@mui/icons-material/Handyman";
// import { Outlet, useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../lib/hooks.ts";
// import { Header, Nav } from "../../styles/universal.styles";
// import { resetError } from "@/lib/thunks/resetErrorThunk";
// import type { User } from "../../types/general.types";
// const NavBarComponent = () => {
// 	const navigate = useNavigate();
// 	const dispatch = useAppDispatch();
// 	const valueUser: User = useAppSelector((state) => state.login);
// 	const nav = () => {
// 		navigate("/");
// 		dispatch(resetError());
// 	};
// 	return (
// 		<>
// 			<Nav>
// 				<HandymanIcon fontSize={"large"} onClick={() => nav()} />
// 				<Header onClick={() => nav()}>DINDER</Header>
// 				{valueUser.userName}
// 			</Nav>
// 			<Outlet />
// 		</>
// 	);
// };
//
// export default NavBarComponent;
