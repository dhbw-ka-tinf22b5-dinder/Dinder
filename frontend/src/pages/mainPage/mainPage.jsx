import {Outlet, useNavigate} from "react-router-dom";
import Background from "../../components/atoms/background/Background";
import Button from "../../components/atoms/button/Button";
import  './mainPage.css'
import {Logo} from "../../styled-components/home.styles";
export default function MainPage(){
    const navigate = useNavigate()
    return(
        <Background className={"startUpBackground"}>{
            <divsrc className={"mainPage"}>
                <h1>Swipe Right®</h1>
                <Button label={"Login"} onClick={()=> navigate("/registrationAndLogin/login")} className={"login"}/>
                <Button label={"Registrieren"} onClick={()=> navigate("/registrationAndLogin/registration")} className={"login"}/>
                <Logo src={"https://media.tenor.com/-6UNg-GxYRIAAAAC/i-like-trains.gif"} />
            </divsrc>
        }</Background>

    )
}