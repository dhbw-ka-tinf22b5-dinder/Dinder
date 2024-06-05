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
export interface Advertiser {
	userName: string;
}
export interface Advertisement {
	id: number;
	title: string;
	price: number;
	location: string;
	plz: number;
	description: string;
	advertiser: Advertiser;
	image: string;
	creationTime: Date;
}
export interface CreateAdvertisementPayload {
	json: {
		title: string;
		price: number;
		location: string;
		postalCode: number;
		description: string;
	};
	file?: string;
}
