import {Component} from "react";
import './style.css'

export default class LoginAndRegistration extends Component{
    state={
        element: this.mainLogin()
    };
    render(){
        return(<div id={"loginPage"}>
            {this.state.element}
        </div>)
    }
    changeState(element){
        this.setState({element: element})
    }
    mainRegistration() {
        return (<div id={"loginPage"}>
            E-Mail{this.loginInput("email", "email")}
            Passwort{this.loginInput("password", "password")}
            Passwort wiederholen{this.loginInput("password", "password")}
            {this.Buttons("Registrierung", this.register, "login")}
        </div>)
    }
    mainLogin() {
    return(<div id={"loginPage"}>
        E-Mail{this.loginInput("email","email")}
        Passwort{this.loginInput("password","password")}
        {this.Buttons("Login",this.login,"login")}
        {this.Buttons("Registrierung",()=> this.changeState(this.mainRegistration()),"login")}
    </div>)
}Buttons(label,onClick,className){
    return (<button type={"button"}
                    className={className}
                    onClick={()=>onClick()}>
            {label}
        </button>


)
}
loginInput(type,id) {
    return(
    <input type={type} id={id}/>)
}
login(){
    console.log(document.getElementById("email").value)
    console.log(document.getElementById("password").value)
}
register(){
        console.log("Login")
}

}