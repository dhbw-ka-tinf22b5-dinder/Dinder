const testUser ={
    email: "test@test.de",
    pwd: "testPassword"
}
export default class HttpClient {
    constructor() {

    }
    async login(userCredentials){

    }
    async register(email: string, password: string){
        console.log("Nutzer mit "+email+" und "+password);
    }
}