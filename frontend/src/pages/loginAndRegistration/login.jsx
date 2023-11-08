import './style.css'
import Button from '../../components/atoms/button/Button'
import Input from '../../components/atoms/input-field/InputField'
import Background from "../../components/atoms/background/Background";
import {useNavigate} from "react-router-dom";
export  default  function Login() {
    const navigate = useNavigate();
    return(<Background className={"startUpBackground"}>{<div className={"loginPage"}>
        E-Mail<Input id={"email"}/>
        Passwort<Input id={"password"} type={"password"}/>
        <Button label={"Login"} onClick={()=>console.log("login")} className={"SpanLogin"}/>
    </div>}</Background>)
}
