import {MainBackgroundImg} from "../../styles/mainPage.styles";
import {ButtonSubmit} from "../atoms/Button.component";
import {Input} from "../atoms/Input.component";
/*import {APP_ROUTES} from "../../routes/routes";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {HttpContext} from "../../App";*/
import {MessageStyles} from "../../styles/Message.styles";
import  {useState} from "react";
import {Form} from "../atoms/Form.component";
import {Error} from "../../types/general.types";
import { useAppSelector } from "../../app/hooks";

// eslint-disable-next-line react-hooks/rules-of-hooks

const RegistrationComponent = ()=> {
    const valueError: Error = useAppSelector((state) => state.error);
    /*
    const register = useContext(HttpContext);
    const navigate = useNavigate();
    const nav = (s: string) => {
        navigate("/"+s)
    }*/
const register=(e)=>{
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
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

