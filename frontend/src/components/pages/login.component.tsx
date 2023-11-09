import {Button, Input} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {APP_ROUTES} from "../../routes/routes";
import {MainBackgroundImg} from "../../styles/mainPage.styles";
const LoginComponent = ()    => {
    const navigate = useNavigate();

    const nav = (s: string) => {
        navigate(s)
    }
    return<>
        <MainBackgroundImg onClick={()=> nav(APP_ROUTES.home)} src={"https://wohnungsgesellschaft.de/wp-content/uploads/2019/02/Handwerker-1.jpg"}/>
        E-Mail<Input/>
        Passwort<Input/>
        <Button onClick={()=>console.log("login")}></Button>
    </>
}

export default LoginComponent;