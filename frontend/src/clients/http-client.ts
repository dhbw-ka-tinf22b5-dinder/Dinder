import axios from "axios";
import type { UserLogin, UserRegister } from "../types/general.types";

export function login(user: UserLogin): Promise<boolean> {
	// later this will be a json
	return axios
		.post("http://localhost:8080/api/v1/login", user)
		.then((res) => {
			console.log("Hallo "+res);
			return res.data;
		})

		.catch((error) => error.status);
}
export function register(user: UserRegister): Promise<number> {
	// later this will be a json
	return axios
		.post("http://localhost:8080/api/v1/register", user)
		.then((res) => res.status)
		.catch((error) => error.status);
}
export function getUserName(): Promise<string> {
	return axios
		.get("http://localhost:8080/api/v1/user/me")
		.then((res) => {
			console.log(res);
			return res.data.userName;
		})
		.catch((error) => error.status);
}
