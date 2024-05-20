import axios from "axios";
import type {Advertisement, UserLogin, UserRegister} from "../types/general.types";

const url = "http://localhost:8080/api/v1/";

interface advertisementFromServer{

	title: string;
	price: number;
	location: string;
	plz: number;
	description: string;
	advertiser: {
		userName: string;
	};
	creationTime: string;

}

export function login(user: UserLogin): Promise<boolean> {
	// later this will be a json
	return axios
		.post(url+"login", user)
		.then((res) => {
			console.log("Hallo "+res);
			return res.data;
		})

		.catch((error) => error.status);
}
export function register(user: UserRegister): Promise<number> {
	// later this will be a json
	return axios
		.post(url+"register", user)
		.then((res) => res.status)
		.catch((error) => error.status);
}
export function getUserName(): Promise<string> {
	return axios
		.get(url+"user/me")
		.then((res) => {
			console.log(res);
			return res.data.userName;
		})
		.catch((error) => error.status);
}
export function fetchListOfAdvertisements(): Promise<number[]> {
	// later this will be a json
	return axios
		.get(url+"advertisement/all")
		.then((res) => res.data)
		.catch((error) => error.status);
}
export function fetchAdvertisementById(id: number): Promise<Advertisement> {
	// later this will be a json
	return axios
		.get(url+"advertisement/"+id)

		.then((res) =>{
			const rawAdvertisement : advertisementFromServer = res.data;
			return fetchImageForAdvertisement(id,rawAdvertisement);
		} )
		.catch((error) => error.status);
}
function fetchImageForAdvertisement(id: number, rawAdvertisement: advertisementFromServer): Promise<Advertisement> {
	return axios
		.get(url+"advertisement/"+id+"/image")
		.then((res) =>{
			const image :string = res.data;
			return parseToAdvertisement(rawAdvertisement, id, image);
		})
		.catch((error) => parseToAdvertisement(rawAdvertisement, id, error.status));
}
function parseToAdvertisement(data: advertisementFromServer,id: number,image: string): Advertisement {
	return {
		id: id,
		title: data.title,
		price: data.price,
		location: data.location,
		plz: data.plz,
		description: data.description,
		image: image,
		advertiser: data.advertiser,

		creationTime: new Date(data.creationTime)
	};
}