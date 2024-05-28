"use client";
import StartPage from "@/components/pages/startPage.tsx";
import type { User } from "@/types/general.types.ts";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store.ts";
import LogInSwipe from "@/components/atoms/LogInSwipe.component.tsx";

const MainPage = () => {
	const valueUser: User = useSelector((state: RootState) => state.login);
	return <>{valueUser.userName ? <LogInSwipe/> : <StartPage />}</>;
};
export default MainPage;
