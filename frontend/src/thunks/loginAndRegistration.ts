import { loginReducer } from '../slices/login';
import {UserLogin, User, Error, UserRegister,UserRegisterConfirmation} from "../types/general.types";
import {login,register, getUserName} from "../clients/http-client";
import {errorReducer} from "../slices/error";
import * as validator from 'email-validator';

interface LoginData{
    user:User,
    errorStatus:Error,
}
const wrongPassword:LoginData = {
    user: {
        userName: ""
    },
    errorStatus: {
        error: true,
        errorMessage: "E-Mail or password is wrong",
    }
}
const successfulLogin=():Promise<LoginData>=>{
    return getUserName().then((res)=> {
        const user: User = {
            userName: res,
        }
        const errorObject: Error = {
            error: false,
            errorMessage: "",
        }
        const loginData: LoginData = {
            user: user,
            errorStatus: errorObject,
        }
        return loginData;
    })
}
export const loginThunk= (userLogin:UserLogin)=> async (dispatch: (arg0: { payload: Error | User; type: "error/errorReducer" | "login/loginReducer"; }) => void)=>{
    //validations
    if (!validator.validate(userLogin.loginName)) {
        //Error Message wird gesetzt
        const errorObject: Error = {
            error: true,
            errorMessage: "Invalid email",
        }
        //states werden geupdated
        dispatch(errorReducer(errorObject));
        return;
    }
    //eigentlicher login
    login(userLogin).then((res)=> {

        let loginData:LoginData;
        if (res){
            successfulLogin().then((res)=>{
                loginData=res;
                dispatch(loginReducer(loginData.user));
                dispatch(errorReducer(loginData.errorStatus));
            });
        }
        else{
            loginData= wrongPassword;
            dispatch(loginReducer(loginData.user));
            dispatch(errorReducer(loginData.errorStatus));
        }
        //states werden geupdated
    }).catch((errorValue) => {
        //Error Message wird gesetzt
        const errorObject: Error = {
            error: true,
            errorMessage: errorValue,
        }
        //states werden geupdated
        dispatch(errorReducer(errorObject));
    });
}

export const registerThunk= (userRegister:UserRegisterConfirmation)=> async (dispatch: (arg0: { payload: Error; type: "error/errorReducer"; }) => void)=>{
    if (userRegister.password !== userRegister.confirmPassword) {
        const errorObject: Error = {
            error: true,
            errorMessage: "Passwords do not match",
        }
        dispatch(errorReducer(errorObject));
        return;
    }
    if (!validator.validate(userRegister.email)) {
        const errorObject: Error = {
            error: true,
            errorMessage: "Invalid email",
        }
        dispatch(errorReducer(errorObject));
        return;
    }
    const userRegisterSend: UserRegister = {
        email: userRegister.email,
        userName: userRegister.userName,
        password: userRegister.password,
    }
    register(userRegisterSend).then(()=> {
        const errorObject: Error = {
            error: false,
            errorMessage: "",
        }
        dispatch(errorReducer(errorObject));
    }).catch((errorValue) => {
        const errorObject: Error = {
            error: true,
            errorMessage: errorValue,
        }
        dispatch(errorReducer(errorObject));
    });
}
