
const testUser ={
    email: "test@test.de",
    pwd: "testPassword"
}
export function login():{email:string,pwd:string}{
    return testUser;
}
export function sum(a:number,b:number):number{
    return a+b;
}