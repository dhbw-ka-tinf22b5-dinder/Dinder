import {UserLogin,UserRegister} from "../types/general.types";
import axios from "axios";
export function login(user:UserLogin):Promise<number>{// later this will be a json
    return axios.post('http://localhost:8080/login', user)
        .then(res => res.status)
        .catch(error => error.status);
}
export function register(user:UserRegister):Promise<number> {// later this will be a json
    return axios.post('http://localhost:8080/register', user)
        .then(res => res.status)
        .catch(error => error.status);
}