import {UserLogin,UserRegister} from "../types/general.types";
export function login(user:UserLogin):Promise<number> {
    return new Promise(async (resolve, reject) => {
        if (user.loginName === "test" && user.password === "1234") {
            resolve(200);
        } else {
            reject(401);
        }
    });
}
export function register(user:UserRegister):Promise<number>{
    return new Promise(async (resolve, reject) => {
        await sleep(1000);
        if (user.email === "test@test.de" && user.userName === "test" && user.password === "1234") {
            resolve(200);
        } else {
            reject(409);
        }
    });
}
function sleep(ms:number) :Promise<void>{
  return new Promise(resolve => setTimeout(resolve, ms));
}