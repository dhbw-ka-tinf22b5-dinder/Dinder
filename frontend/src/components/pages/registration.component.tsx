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
import {useAppSelector} from "../../state/hooks";
import {RootState} from "../../state/store";

// eslint-disable-next-line react-hooks/rules-of-hooks

const RegistrationComponent = ()=> {
    /*
    const register = useContext(HttpContext);
    const navigate = useNavigate();
    const nav = (s: string) => {
        navigate("/"+s)
    }*/
    const [state,setState]=useState({
    isError:true,
    isHidden:true,
    message:"test"
})
const register=(e)=>{
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    if (formData.get("pwd")==formData.get("CtrlPwd")){
    setState({
        isError: false,
        isHidden: false,
        message: "erlaubt"
    })}
    else{
     setState({
        isError: true,
        isHidden: false,
        message: "Passwörter stimmen nicht überein"
    })
    }

}

    return <>
        <MainBackgroundImg src={"./pictures/startBackground.png"}/>
        <MessageStyles $isError ={state.isError} $isHidden={state.isHidden}>{state.message}</MessageStyles>
        <Form method="post" submit={register}>
            E-Mail:<Input type={"text"} name={"email"}/>
            Password:<Input  type={"password"} name={"pwd"}/>
            Password:<Input  type={"password"} name={"CtrlPwd"}/>
            <ButtonSubmit span={2}>Registrieren </ButtonSubmit>
        </Form>
    </>
}


export default RegistrationComponent;
