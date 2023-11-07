import {useNavigate} from "react-router-dom";
import Background from "../../components/atoms/background/Background";
import Button from "../../components/atoms/button/Button";
import  './mainPage.css'
export default function MainPage(){
    const navigate = useNavigate()
    return(
        <Background className={"startUpBackground"}>{
            <div className={"mainPage"}>
                <h1>Swipe Right®</h1>
                <Button label={"Login"} onClick={()=> navigate("/registrationAndLogin/login")} className={"login"}/>
                <Button label={"Registrieren"} onClick={()=> navigate("/registrationAndLogin/registration")} className={"login"}/>
            </div>
        }</Background>
    )
}