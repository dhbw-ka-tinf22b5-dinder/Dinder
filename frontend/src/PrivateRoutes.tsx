import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { User } from "./types/general.types";
const PrivateRoutes = () => {
	const valueUser: User = useAppSelector((state) => state.login);
	return valueUser.userName ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoutes;
