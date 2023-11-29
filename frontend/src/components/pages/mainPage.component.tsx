import {MainBackgroundImg, MainContainer} from "../../styles/mainPage.styles";
import {useNavigate} from "react-router-dom";
import {APP_ROUTES} from "../../routes/routes";
import {Button} from "../atoms/Button.component";


const MainPageComponent = () => {
    const navigate = useNavigate();

    const nav = (s: string) => {
        navigate(s)
    }

    return <>
        <MainBackgroundImg src={"./pictures/startBackground.png"} />
        <MainContainer $isMain>
            <Button span={1} click={() => nav(APP_ROUTES.login)} text={"Login"} />
            <Button span={1} click={() => nav(APP_ROUTES.registration)} text={"Registrierung"} />
        </MainContainer>
    </>
}
export default MainPageComponent;