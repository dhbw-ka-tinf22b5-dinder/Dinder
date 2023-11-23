import {UserLogin} from "../types/general.types";
const testUser:UserLogin={
    loginName: "asdfas",
    password: "1234"
}
// @ts-ignore
export function login(user:UserLogin):Promise<boolean>{// later this will be a json
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'boolean');
    const request:RequestInfo = new Request('http://localhost:8080/login', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(user)
    });
    // @ts-ignore
    return fetch(request).then(res=> res);
}
login(testUser).then(res=>console.log(res));