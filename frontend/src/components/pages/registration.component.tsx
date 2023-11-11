import {MainBackgroundImg, MainContainer} from "../../styles/mainPage.styles";
import {Button} from "../atoms/Button.component";
import {APP_ROUTES} from "../../routes/routes";
import {useNavigate} from "react-router-dom";
import {Input} from "../atoms/Input.component";

const RegistrationComponent = ()=> {
    const navigate = useNavigate();

    const nav = (s: string) => {
        navigate("/"+s)
    }
    return<>
        <MainBackgroundImg src={"./pictures/startBackground.png"}/>
        <MainContainer>
            E-Mail:<Input id={"email"} type={"text"}/>
            Password:<Input id={"password"} type={"password"}/>
            Password:<Input id={"password"} type={"password"}/>
            <Button span={2} click={() => nav(APP_ROUTES.login)} text={"Register"} />
        </MainContainer>
    </>
}

export default RegistrationComponent;
