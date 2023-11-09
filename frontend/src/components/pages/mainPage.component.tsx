import {useNavigate} from "react-router-dom";
import {APP_ROUTES} from "../../routes/routes";
import {MainBackgroundImg, MainContainer} from "../../styles/mainPage.styles";
import {Button} from "../../styles/buttons.styles";

const MainPageComponent = () => {
    const navigate = useNavigate();

    const nav = (s: string) => {
        navigate(s)
    }

    return <>
        <MainBackgroundImg onClick={()=> nav(APP_ROUTES.home)} src={"https://wohnungsgesellschaft.de/wp-content/uploads/2019/02/Handwerker-1.jpg"}/>
        <MainContainer>
            <Button onClick={()=>nav(APP_ROUTES.login)}>Registration</Button>
            <Button onClick={()=> nav(APP_ROUTES.login)} >Login</Button>
        </MainContainer>
    </>
}

export default MainPageComponent;