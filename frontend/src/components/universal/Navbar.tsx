"use client";
//import { useEffect, useState} from "react";
import NavBarAppFunctionalityComponent from "@/components/universal/navBar_appFunctionality.component.tsx";
import NavBarStartComponent from "@/components/universal/navBar_start.component.tsx";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store.ts";

const NavBar = () => {
	const valueUser = useSelector((state: RootState) => state.login.userName);
	return (
		<>
			{valueUser ? (
				<NavBarAppFunctionalityComponent />
			) : (
				<NavBarStartComponent />
			)}
		</>
	);
};
export default NavBar;
