
export interface UserLogin{
    loginName: string;
    password: string
}
export interface UserRegisterConfirmation{
    email:string;
    userName:string;
    password:string;
    confirmPassword:string;
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
export interface Advertiser{
    userName:string;
}
export interface Advertisement{
    title:string;
    price:number;
    location:string;
    plz:number;
    description:string;
    imagePath:string;
    advertiser:Advertiser;
    creationTime:string;
}