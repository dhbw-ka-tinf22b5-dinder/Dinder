import {login,sum} from "../clients/http-client"
import {describe, expect, it} from "vitest";

const testUser ={
    email: "test@test.de",
    pwd: "testPassword"
}
describe("http-client", () => {
    it("sum",()=>{
        expect(sum(1,2)).toBe(3);
    });
    it("login",()=>{
        expect(login()).toStrictEqual(testUser);
    })
});