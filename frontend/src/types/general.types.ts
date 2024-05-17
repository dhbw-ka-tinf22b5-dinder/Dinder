export interface UserLogin {
	loginName: string;
	password: string;
}
export interface UserRegisterConfirmation {
	email: string;
	userName: string;
	password: string;
	confirmPassword: string;
}
export interface UserRegister {
	email: string;
	userName: string;
	password: string;
}
export interface User {
	userName: string;
}
export interface FrontendError {
	error: boolean;
	errorMessage: string;
}
