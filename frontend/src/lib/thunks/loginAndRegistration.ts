import * as validator from "email-validator";
import { getUserName, login, register } from "@/clients/http-client.ts";
import { errorReducer } from "@/lib/slices/error.ts";
import { loginReducer } from "@/lib/slices/login.ts";
import type {
	FrontendError,
	User,
	UserLogin,
	UserRegister,
	UserRegisterConfirmation,
} from "@/types/general.types.ts";

interface LoginData {
	user: User;
	errorStatus: FrontendError;
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
function parseErrorToLoginData(errorValue: string): LoginData {
	const errorObject: FrontendError = {
		error: true,
		errorMessage: errorValue,
	};
	const loginData: LoginData = {
		user: {
			userName: "",
		},
		errorStatus: errorObject,
	};
	return loginData;
}
const successfulLogin = (): Promise<LoginData> => {
	return getUserName()
		.then((res) => {
			const user: User = {
				userName: res,
			};
			const errorObject: FrontendError = {
				error: false,
				errorMessage: "",
			};
			const loginData: LoginData = {
				user: user,
				errorStatus: errorObject,
			};
			return loginData;
		})
		.catch((errorValue) => parseErrorToLoginData(errorValue));
};

function loginHandler(userLogin: UserLogin): Promise<LoginData> {
	return login(userLogin)
		.then((res) => {
			if (res) {
                sessionStorage.setItem("isLoggedIn","1");
				return successfulLogin();
			}
			return wrongPassword;
		})
		.catch((errorValue) => parseErrorToLoginData(errorValue));
}
export const loginThunk =
	(userLogin: UserLogin) =>
	async (
		dispatch: (arg0: {
			payload: FrontendError | User;
			type: "error/errorReducer" | "login/loginReducer";
		}) => void,
	) => {
		if (!validator.validate(userLogin.loginName)) {
			const errorMessage: string = "Invalid email";
			//states werden geupdated
			dispatch(errorReducer(parseErrorToLoginData(errorMessage).errorStatus));
			return;
		}
		loginHandler(userLogin).then((res) => {
			dispatch(loginReducer(res.user));
			dispatch(errorReducer(res.errorStatus));
		});
	};
export const loginByCookie =() =>async (
    dispatch: (arg0: {
        payload: FrontendError | User;
        type: "error/errorReducer" | "login/loginReducer";
    }) => void,	) => {
    successfulLogin().then((res) => {
        dispatch(loginReducer(res.user));
        dispatch(errorReducer(res.errorStatus));
    });
};

function registerHandler(userRegister: UserRegister): Promise<FrontendError> {
	return register(userRegister)
		.then(() => parseErrorToLoginData("").errorStatus)
		.catch((errorValue) => parseErrorToLoginData(errorValue).errorStatus);
}
export const registerThunk =
	(userRegister: UserRegisterConfirmation) =>
	async (
		dispatch: (arg0: {
			payload: FrontendError;
			type: "error/errorReducer";
		}) => void,
	) => {
		if (userRegister.password !== userRegister.confirmPassword) {
			const errorMessage: string = "Passwords do not match";
			dispatch(errorReducer(parseErrorToLoginData(errorMessage).errorStatus));
			return;
		}
		if (!validator.validate(userRegister.email)) {
			const errorMessage: string = "Invalid email";
			//states werden geupdated
			dispatch(errorReducer(parseErrorToLoginData(errorMessage).errorStatus));
			return;
		}
		const userRegisterSend: UserRegister = {
			email: userRegister.email,
			userName: userRegister.userName,
			password: userRegister.password,
		};
		registerHandler(userRegisterSend).then((res) => {
			dispatch(errorReducer(res));
		});
	};
