import {MainBackgroundImg} from "../../styles/mainPage.styles";
import {ButtonSubmit} from "../atoms/Button.component";
import {Input} from "../atoms/Input.component";
import {MessageStyles} from "../../styles/Message.styles";
import {Form} from "../atoms/Form.component";
import {Error, UserRegisterConfirmation} from "../../types/general.types";
import {useAppDispatch, useAppSelector } from "../../app/hooks";
import {registerThunk} from "../../thunks/loginAndRegistration";

// eslint-disable-next-line react-hooks/rules-of-hooks

const RegistrationComponent = ()=> {
    const valueError: Error = useAppSelector((state) => state.error);
    const dispatch = useAppDispatch();
const register=(e:React.SyntheticEvent)=> {
    e.preventDefault();
    const form = e.target as typeof e.target & {
        email: { value: string };
        username: { value: string };
        pwd: { value: string };
        CtrlPwd: { value: string };
    };
    const user: UserRegisterConfirmation = {
        email: form.email.value,
        userName: form.username.value,
        password: form.pwd.value,
        confirmPassword: form.CtrlPwd.value
    }
    dispatch(registerThunk(user));
}
    return <>
        <MainBackgroundImg src={"./pictures/startBackground.png"}/>
        <MessageStyles $isError ={valueError.error} $isHidden={!valueError.error}>{valueError.errorMessage}</MessageStyles>
        <Form method="POST" submit={register}>
            E-Mail:<Input type={"text"} name={"email"}/>
            Username:<Input type={"text"} name={"username"}/>
            Password:<Input  type={"password"} name={"pwd"}/>
            Password:<Input  type={"password"} name={"CtrlPwd"}/>
            <ButtonSubmit span={2}>Registrieren </ButtonSubmit>
        </Form>
    </>
}


export default RegistrationComponent;

