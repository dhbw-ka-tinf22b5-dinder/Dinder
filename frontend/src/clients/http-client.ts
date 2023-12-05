import {UserLogin,UserRegister} from "../types/general.types";
import axios from "axios";

export function login(user:UserLogin):Promise<boolean>{// later this will be a json
    return axios.post('http://localhost:8080/api/v1/login', user)
        .then(res=> true)

        .catch(error => error.status);
}
export function register(user:UserRegister):Promise<number> {// later this will be a json
    return axios.post('http://localhost:8080/api/v1/register', user)
        .then(res => res.status)
        .catch(error => error.status);
}