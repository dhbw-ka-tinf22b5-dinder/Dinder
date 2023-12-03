import {login,register} from "./mockBackend"
import {describe, expect, it} from "vitest";
import {UserLogin,UserRegister} from "../types/general.types";
const testUser:UserLogin={
    loginName: "test1",
    password: "1234"
}
const testUser2:UserRegister={
    email:"test@test.de",
    userName:"1test",
    password:"1234"
}
describe("http-client", () => {
    it("login",()=> {
        return login(testUser).then((value: number) => {
            console.log(value);
            expect(value).toBe(200);
        }).catch((reason: number) => {
            console.log(reason);
            expect(reason).toBe(401);
        });
    });
    it("register",()=> {
        return register(testUser2).then((value: number) => {
            console.log(value);
            expect(value).toBe(200)
        }).catch((reason: number) => {
            console.log(reason);
            expect(reason).toBe(409);
        });
    });
});
/*describe("thunk",()=>{
    it("login",()=> {
        const dispatch = useAppDispatch();
        const value:string = useAppSelector((state) => state.login.userName)
        return dispatch(loginThunk(testUser)).then(() => {
            console.log(value);
            expect(value).toBeDefined();
        }).catch((reason: number) => {
            console.log(reason);
            expect(reason).toBe(401);
        });
    });
})*/