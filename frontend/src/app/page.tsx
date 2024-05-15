"use client";
import StartPage from "@/components/pages/startPage.tsx";
import SwipePage from "@/components/pages/SwipePage.tsx";
import type { User } from "@/types/general.types.ts";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store.ts";

const MainPage = () => {
	const valueUser: User = useSelector((state: RootState) => state.login);
	return <>{valueUser.userName ? <SwipePage /> : <StartPage />}</>;
};
export default MainPage;
