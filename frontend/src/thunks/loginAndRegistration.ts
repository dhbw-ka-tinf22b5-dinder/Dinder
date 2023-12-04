import { loginReducer } from '../slices/login';
import {UserLogin, User, Error, UserRegister,UserRegisterConfirmation} from "../types/general.types";
import {login,register} from "../clients/http-client";
import {errorReducer} from "../slices/error";
import * as validator from 'email-validator';

export const loginThunk= (userLogin:UserLogin)=> async (dispatch: (arg0: { payload: Error | User; type: "error/errorReducer" | "login/loginReducer"; }) => void)=>{
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
    login(userLogin).then((res)=> {
        console.log(res);
        const user: User = {//User wird gesetzt
            userName: userLogin.loginName,
        }
        const errorObject: Error = {//Error Message wird zurückgesetzt
            error: false,
            errorMessage: "",
        }
        //states werden geupdated
        dispatch(loginReducer(user));
        dispatch(errorReducer(errorObject));
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
