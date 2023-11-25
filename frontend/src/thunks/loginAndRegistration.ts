import { loginReducer } from '../slices/login';
import {UserLogin,User,Error} from "../types/general.types";
import {login} from "../test/mockBackend";
import {errorReducer} from "../slices/error";

export const loginThunk= (userLogin:UserLogin)=> async dispatch=>{
    login(userLogin).then((response)=> {
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