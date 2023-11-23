import {login} from "../clients/http-client"
import {describe, expect, it} from "vitest";
import {UserLogin} from "../types/general.types";

const testUser:UserLogin={
    loginName: "asdfas",
    password: "1234"
}
describe("http-client", () => {
    it("login",()=> {
        console.log("test");
        let result: Promise<boolean> = login(testUser);
        result.then((value: boolean) => {
            console.log(value);
            expect(value).toBe(false);
        });
        console.log("test1");
    });
});