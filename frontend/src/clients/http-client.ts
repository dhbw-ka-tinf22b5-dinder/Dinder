import {UserLogin,UserRegister} from "../types/general.types";
const testUser:UserLogin={
    loginName: "test",
    password: "1234"
}
// @ts-ignore
export function login(user:UserLogin):Promise<Response>{// later this will be a json
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    const request:RequestInfo = new Request('http://localhost:8080/login', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(user)
    });
    // @ts-ignore
    return fetch(request).then(res=> res.status);
}
export function register(user:UserRegister):Promise<Response>{// later this will be a json
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    const request:RequestInfo = new Request('http://localhost:8080/register', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(user)
    });
    // @ts-ignore
    return fetch(request).then(res=> res.status);
}