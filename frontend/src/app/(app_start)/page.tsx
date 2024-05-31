"use client";
import StartPage from "@/components/pages/startPage.tsx";
import type { User } from "@/types/general.types.ts";
import { useSelector } from "react-redux";
import {type RootState, store} from "@/lib/store.ts";
import LogInSwipe from "@/components/atoms/LogInSwipe.component.tsx";
import { useEffect} from "react";
import {loginByCookie} from "@/lib/thunks/loginAndRegistration.ts";

const MainPage = () => {
    useEffect(() => {
        if (window.localStorage.getItem("isLoggedIn")==="1"){
            console.log("is logged in");
            store.dispatch(loginByCookie())
        }
    }, []);
	const valueUser: User = useSelector((state: RootState) => state.login);
    console.log(valueUser)
	return <>{valueUser.userName ? <LogInSwipe /> : <StartPage />}</>;
};
export default MainPage;
