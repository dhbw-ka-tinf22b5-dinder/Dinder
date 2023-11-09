import {MainBackgroundImg} from "../../styles/mainPage.styles.ts";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {APP_ROUTES} from "../../routes/routes.ts";

const MainPageComponent = () => {
    const navigate = useNavigate();

    const nav = (s: string) => {
        navigate(s)
    }

    return <>
        <MainBackgroundImg onClick={()=> nav(APP_ROUTES.home)} src={"https://wohnungsgesellschaft.de/wp-content/uploads/2019/02/Handwerker-1.jpg"}/>
        <Button onClick={()=> nav(APP_ROUTES.login)} >Login</Button>
    </>
}

export default MainPageComponent;