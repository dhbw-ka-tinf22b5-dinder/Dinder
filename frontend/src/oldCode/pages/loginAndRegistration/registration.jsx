import {Component} from "react";
import './style.css'
import Button from '../../components/atoms/button/Button.jsx'
import Input from '../../components/atoms/input-field/InputField.jsx'
import {useNavigate} from "react-router-dom";
import Background from "../../components/atoms/background/Background.jsx";


export default function Registration() {
    const navigate = useNavigate();
    return (<Background className={"startUpBackground"}>{<div className={"loginPage"}>
            E-Mail<Input id={"email"}/>
            Passwort<Input id={"password"} type={"password"}/>
            Passwort wiederholen<Input id={"password"} type={"password"}/>
            <Button label={"Registrierung"} onClick={()=> console.log("Registrierung")} className={"SpanLogin"}/>
        </div>}</Background>)
}