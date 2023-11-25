
export interface UserLogin{
    loginName: string;
    password: string
}
export interface UserRegister{
    email:string;
    userName:string;
    password:string;
}
export interface User{
    userName:string;
}
export interface Error{
    error:boolean;
    errorMessage:string;
}