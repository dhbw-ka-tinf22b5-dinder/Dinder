"use client";
import StartPage from "@/components/pages/startPage.tsx";
import {useEffect, useState} from "react";
import SwipePage from "@/components/pages/SwipePage.tsx";

const MainPage = () => {
    const [loggedIn,setLoggedIn] = useState(0)
    useEffect(() => {
            const status = window.sessionStorage.getItem("isLoggedIn");
            if (status==="1"){
                setLoggedIn(1)
            }
            else setLoggedIn(2)

    }, []);
    if (loggedIn===0){
        return <h1>Loading</h1>
    }
	return <>{loggedIn===1 ? <SwipePage /> : <StartPage />}</>;
};
export default MainPage;
