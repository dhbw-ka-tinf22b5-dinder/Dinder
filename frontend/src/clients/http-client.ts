import {UserLogin,UserRegister,Advertisement} from "../types/general.types";
import axios from "axios";

export function login(user:UserLogin):Promise<boolean>{// later this will be a json
    return axios.post('http://localhost:8080/api/v1/login', user)
        .then(res=> {
            console.log(res)
            return res.data

        })

        .catch(error => error.status);
}
export function register(user:UserRegister):Promise<number> {// later this will be a json
    return axios.post('http://localhost:8080/api/v1/register', user)
        .then(res => res.status)
        .catch(error => error.status);
}
export function getUserName():Promise<string>{
    return axios.get('http://localhost:8080/api/v1/user/me')
        .then(res=> {
            console.log(res)
            return res.data.userName

        })
        .catch(error => error.status);
}
export function getAdvertisementIDS():Promise<number[]>{
    return axios.get('http://localhost:8080/api/v1/advertisement/all')
        .then(res=> {
            return res.data;

        })
        .catch(error => error.status);
}
export function getAdvertisementById(id:number):Promise<Advertisement>{
    return axios.get('http://localhost:8080/api/v1/advertisement/'+id)
        .then(res=> {
            console.log(res)
            return res.data

        })
        .catch(error => error.status);
}
export async function getAllAdvertisements():Promise<Advertisement[]>{
    const ids:Promise<number[]> = getAdvertisementIDS();
    const ads:Advertisement[]= [];
    ids.then((res)=>{
        res.forEach((id)=>{
            getAdvertisementById(id).then((res)=>ads.push(res));
        })
    });
    return ads;

}
