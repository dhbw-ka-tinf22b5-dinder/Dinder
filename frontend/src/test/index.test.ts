import {login,register} from "../clients/http-client"
import {describe, expect, it} from "vitest";
import {UserLogin,UserRegister} from "../types/general.types";

const testUser:UserLogin={
    loginName: "fasdfas",
    password: "1234"
}
const testUser2:UserRegister={
    email:"test1@test.de",
    userName:"testt",
    password:"1234"
}
describe("http-client", () => {
    it("login",()=> {
        return login(testUser).then((value: Response) => {
            console.log(value);
            expect(value).toBe(200);
        });
    });
    it("register",()=> {
        return register(testUser2).then((value: Response) => {
            console.log(value);
            expect(value).toBe(409)
        });
    });
});