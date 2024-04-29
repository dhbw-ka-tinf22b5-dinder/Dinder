import * as validator from "email-validator";
import { getUserName, login, register } from "@/clients/http-client.ts";
import { errorReducer } from "@/lib/slices/error.ts";
import { loginReducer } from "@/lib/slices/login.ts";
import type {
	Error,
	User,
	UserLogin,
	UserRegister,
	UserRegisterConfirmation,
} from "@/types/general.types.ts";

interface LoginData {
	user: User;
	errorStatus: Error;
}
const wrongPassword: LoginData = {
	user: {
		userName: "",
	},
	errorStatus: {
		error: true,
		errorMessage: "E-Mail or password is wrong",
	},
};
const successfulLogin = (): Promise<LoginData> => {
	return getUserName().then((res) => {
		const user: User = {
			userName: res,
		};
		const errorObject: Error = {
			error: false,
			errorMessage: "",
		};
		const loginData: LoginData = {
			user: user,
			errorStatus: errorObject,
		};
		return loginData;
	});
};
export const loginThunk =(userLogin: UserLogin) =>
	async (
		dispatch: (arg0: {
			payload: Error | User;
			type: "error/errorReducer" | "login/loginReducer";
		}) => void,
	) => {
	console.log(userLogin);
		if (!validator.validate(userLogin.loginName)) {
			//Error Message wird gesetzt
			const errorObject: Error = {
				error: true,
				errorMessage: "Invalid email",
			};
			//states werden geupdated
			return errorReducer(errorObject);
		}
		login(userLogin)
			.then((res) => {
				let loginData: LoginData;
				if (res) {
					successfulLogin().then((res) => {
						loginData = res;
						//dispatch(loginReducer(loginData.user));
						return errorReducer(loginData.errorStatus);
					});
				} else {
					loginData = wrongPassword;
					//dispatch(loginReducer(loginData.user));
					return errorReducer(loginData.errorStatus);
				}
				//states werden geupdated
			})
			.catch((errorValue) => {
				//Error Message wird gesetzt
				const errorObject: Error = {
					error: true,
					errorMessage: errorValue,
				};
				//states werden geupdated
				return errorReducer(errorObject);
			});
	};
export const loginByCookie =
	() =>
	async (
		dispatch: (arg0: {
			payload: Error | User;
			type: "error/errorReducer" | "login/loginReducer";
		}) => void,
	) => {
		successfulLogin().then((res) => {
			dispatch(loginReducer(res.user));
			dispatch(errorReducer(res.errorStatus));
		});
	};
export const registerThunk =
	(userRegister: UserRegisterConfirmation) =>
	async (
		dispatch: (arg0: { payload: Error; type: "error/errorReducer" }) => void,
	) => {
		if (userRegister.password !== userRegister.confirmPassword) {
			const errorObject: Error = {
				error: true,
				errorMessage: "Passwords do not match",
			};
			dispatch(errorReducer(errorObject));
			return;
		}
		if (!validator.validate(userRegister.email)) {
			const errorObject: Error = {
				error: true,
				errorMessage: "Invalid email",
			};
			dispatch(errorReducer(errorObject));
			return;
		}
		const userRegisterSend: UserRegister = {
			email: userRegister.email,
			userName: userRegister.userName,
			password: userRegister.password,
		};
		register(userRegisterSend)
			.then(() => {
				const errorObject: Error = {
					error: false,
					errorMessage: "",
				};
				dispatch(errorReducer(errorObject));
			})
			.catch((errorValue) => {
				const errorObject: Error = {
					error: true,
					errorMessage: errorValue,
				};
				dispatch(errorReducer(errorObject));
			});
	};
