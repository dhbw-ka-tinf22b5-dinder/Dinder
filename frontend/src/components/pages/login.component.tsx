import {MainBackgroundImg, MainContainer} from "../../styles/mainPage.styles";
import {Button} from "../atoms/Button.component";
import {APP_ROUTES} from "../../routes/routes";
import {useNavigate, useParams} from "react-router-dom";
import {Input} from "../atoms/Input.component";
const LoginComponent = ()    => {
    const navigate = useNavigate();

    const nav = (s: string) => {
        navigate("/"+s)
    }
    return<>
        <MainBackgroundImg src={"./pictures/startBackground.png"}/>
        <MainContainer>
            E-Mail:<Input  name={"email"} type={"text"}/>
            Password:<Input name={"password"} type={"password"}/>
            <Button span={2} click={() => nav(APP_ROUTES.login)} text={"Login"} />
        </MainContainer>
    </>
}

export default LoginComponent;