"use client";
import { useEffect, useState } from "react";
import NavBarAppFunctionalityComponent from "@/components/universal/navBar_appFunctionality.component.tsx";
import NavBarStartComponent from "@/components/universal/navBar_start.component.tsx";

const NavBar = () => {
	const [loggedIn, setLoggedIn] = useState(0);
	useEffect(() => {
		const status = window.sessionStorage.getItem("isLoggedIn");
		if (status === "1") {
			setLoggedIn(1);
		} else setLoggedIn(2);
	}, []);
	return (
		<>
			{loggedIn === 1 ? (
				<NavBarAppFunctionalityComponent />
			) : (
				<NavBarStartComponent />
			)}
		</>
	);
};
export default NavBar;
