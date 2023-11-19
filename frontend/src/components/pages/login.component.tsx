import {MainBackgroundImg, MainContainer} from "../../styles/mainPage.styles";
import {Button} from "../atoms/Button.component";
import {APP_ROUTES} from "../../routes/routes";
import {useNavigate, useParams} from "react-router-dom";
import {Input} from "../atoms/Input.component";
import {selectAllUsers, selectUserById} from "../../redux/usersSlice";
import User from "../../types/general.types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const LoginComponent = ()    => {
    const params = useParams();
    const userId = params.userId ?? "";
    const users = useSelector(selectAllUsers) as User [];
    const navigate = useNavigate();

    const nav = (s: string) => {
        console.log(users)
        navigate("/"+s)
    }
    const renderedUsers = users.map((user) => (
        <li >
            {user.name}
        </li>
    ));
    return<>
        <MainBackgroundImg src={"./pictures/startBackground.png"}/>
        <MainContainer>
            E-Mail:<Input  name={"email"} type={"text"}/>
            Password:<Input name={"password"} type={"password"}/>
            <Button span={2} click={() => nav(APP_ROUTES.login)} text={"Login"} />
            <ul>{renderedUsers}</ul>
        </MainContainer>
    </>
}

export default LoginComponent;