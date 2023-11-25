import {MainBackgroundImg, MainContainer} from "../../styles/mainPage.styles";
import {Button, ButtonSubmit} from "../atoms/Button.component";
import {APP_ROUTES} from "../../routes/routes";
import {MessageStyles} from "../../styles/Message.styles";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch,useAppSelector} from "../../app/hooks";
import {Input} from "../atoms/Input.component";
import {loginThunk} from "../../thunks/loginAndRegistration";
import {Form} from "../atoms/Form.component";
import {UserLogin,Error,User} from "../../types/general.types";
const LoginComponent = ()    => {
    const navigate = useNavigate();
    const valueError:Error= useAppSelector((state) => state.error)
    const dispatch = useAppDispatch();
    function handleClick(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const userLogin :UserLogin= {
            loginName:formData.get("email").toString(),
            password:formData.get("password").toString()
        }
        dispatch(loginThunk(userLogin));
    }

    const nav = (s: string) => {
        navigate("/"+s)
    }
    return<>
        <MainBackgroundImg src={"./pictures/startBackground.png"}/>
        <MessageStyles $isError ={valueError.error} $isHidden={!valueError.error}>{valueError.errorMessage}</MessageStyles>
        <Form method={"post"} submit={handleClick}>
            E-Mail:<Input  name={"email"} type={"text"}/>
            Password:<Input name={"password"} type={"password"}/>
            <ButtonSubmit span={2}>Login</ButtonSubmit>
        </Form>
    </>
}

export default LoginComponent;