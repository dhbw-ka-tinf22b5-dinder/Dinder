import {MainBackgroundImg} from "../../styles/mainPage.styles";
import {ButtonSubmit} from "../atoms/Button.component";
import {Input} from "../atoms/Input.component";
import {MessageStyles} from "../../styles/Message.styles";
import {Form} from "../atoms/Form.component";
import {Error} from "../../types/general.types";
import {useAppDispatch, useAppSelector } from "../../app/hooks";
import {UserRegister} from "../../types/general.types";
import {registerThunk} from "../../thunks/loginAndRegistration";

// eslint-disable-next-line react-hooks/rules-of-hooks

const RegistrationComponent = ()=> {
    const valueError: Error = useAppSelector((state) => state.error);
    const dispatch = useAppDispatch();
    /*
    const register = useContext(HttpContext);
    const navigate = useNavigate();
    const nav = (s: string) => {
        navigate("/"+s)
    }*/
const register=(e)=> {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const user: UserRegister = {
        email: formData.get("email").toString(),
        userName: formData.get("username").toString(),
        password: formData.get("pwd").toString(),
        confirmPassword: formData.get("CtrlPwd").toString()
    }
    dispatch(registerThunk(user));
}
    return <>
        <MainBackgroundImg src={"./pictures/startBackground.png"}/>
        <MessageStyles $isError ={valueError.error} $isHidden={!valueError.error}>{valueError.errorMessage}</MessageStyles>
        <Form method="post" submit={register}>
            E-Mail:<Input type={"text"} name={"email"}/>
            Username:<Input type={"text"} name={"username"}/>
            Password:<Input  type={"password"} name={"pwd"}/>
            Password:<Input  type={"password"} name={"CtrlPwd"}/>
            <ButtonSubmit span={2}>Registrieren </ButtonSubmit>
        </Form>
    </>
}


export default RegistrationComponent;

