import axios from "axios";
import type {
	Advertisement,
	CreateAdvertisementPayload,
	UserLogin,
	UserRegister,
	swipe,
} from "../types/general.types";

const url = "http://localhost:8080/api/v1/";

interface AdvertisementFromServer {
	title: string;
	price: number;
	location: string;
	postalCode: number;
	description: string;
	advertiser: {
		userName: string;
	};
	creationTime: string;
	contractor: {
		userName: string;
	};
}
interface SwipeFromServer {
	swipeId: number;
	swipeState: string;
	user: {
		userName: string;
	};
	advertisement: {
		advertisementId: number;
	};
}
export function login(user: UserLogin): Promise<boolean> {
	// later this will be a json
	return axios
		.post(`${url}login`, user)
		.then((res) => {
			return res.data;
		})

		.catch((error) => error.status);
}
export function register(user: UserRegister): Promise<number> {
	// later this will be a json
	return axios
		.post(`${url}register`, user)
		.then((res) => res.status)
		.catch((error) => error.status);
}
export function getUserName(): Promise<string> {
	return axios
		.get(`${url}user/me`)
		.then((res) => {
			return res.data.userName;
		})
		.catch((error) => error.status);
}
export function fetchListOfAdvertisements(): Promise<number[]> {
	return axios
		.get(`${url}advertisement/all`)
		.then((res) => res.data)
		.catch((error) => error.status);
}
export function fetchAdvertisementById(id: number): Promise<Advertisement> {
	// later this will be a json
	return axios
		.get(`${url}advertisement/${id}`)

		.then((res) => {
			const rawAdvertisement: AdvertisementFromServer = res.data;
            console.log(rawAdvertisement)
			return parseToAdvertisement(rawAdvertisement, id);
		})
		.catch((error) => error.status);
}
export function confirmSwipe(advertisementID: number, swipeID: number) {
	return axios.post(
		`${url}advertisement/${advertisementID}/swipe/${swipeID}/accept`,
	);
}
function parseToAdvertisement(
	data: AdvertisementFromServer,
	id: number,
): Advertisement {
	return {
		id: id,
		title: data.title,
		price: data.price,
		location: data.location,
		plz: data.postalCode,
		description: data.description,
		image: `${url}advertisement/${id}/image`,
		advertiser: data.advertiser,
		creationTime: new Date(data.creationTime),
		contractor: data.contractor,
	};
}
export function acceptAdvertisement(id: number) {
	return axios.post(`${url}advertisement/${id}/swipe`, {
		swipeState: "ACCEPTED",
	});
}
export function declineAdvertisement(id: number) {
	return axios.post(`${url}advertisement/${id}/swipe`, {
		swipeState: "DECLINED",
	});
}
export function getOwnSwipes(): Promise<swipe[]> {
	return axios.get(`${url}user/swipes`).then((res) => {
		const rawSwipe: SwipeFromServer[] = res.data;
		return parseToSwipes(rawSwipe);
	});
}
export function getSwipes(id: number): Promise<swipe[]> {
	return axios.get(`${url}advertisement/${id}/swipe/all`).then((res) => {
        console.log(res)
		const rawSwipe: SwipeFromServer[] = res.data;
		return parseToSwipes(rawSwipe);
	});
}
function parseToSwipes(swipe: SwipeFromServer[]): swipe[] {
	const betterSwipes: swipe[] = [];
	for (const swipeFromServer of swipe) {
		betterSwipes.push({
			swipeID: swipeFromServer.swipeId,
			swipeState: swipeFromServer.swipeState,
			userName: swipeFromServer.user.userName,
			advertisementID: swipeFromServer.advertisement.advertisementId,
		});
	}
	return betterSwipes;
}
export function publishAdvertisement(payload: CreateAdvertisementPayload) {
	return axios
		.post(`${url}advertisement`, payload.json)
		.then((res) => {
			axios
				.put(
					`${url}advertisement/${res.data.advertisementId}/image`,
					payload.file,
					{
						headers: {
							"Content-Type": "application/octet-stream",
						},
					},
				)
				.then((resImage) => resImage)
				.catch((resError) => resError);
		})
		.catch((res) => res);
}
