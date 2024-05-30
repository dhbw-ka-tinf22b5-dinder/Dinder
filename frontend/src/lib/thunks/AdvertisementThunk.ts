// import { errorReducer } from "@/lib/slices/error";
import type {
	// Error,
	Advertisement,
	// Advertiser
} from "@/types/general.types.ts";
import {
	fetchAdvertisementById,
	fetchListOfAdvertisements,
} from "@/clients/http-client.ts";
import { advertisementReducer } from "@/lib/slices/advertisement.ts";

function getAdvertisements(ids: number[]): Promise<Advertisement[]> {
	return Promise.all(ids.map((id) => fetchAdvertisementById(id)));
}

function getAdvertisementList(): Promise<Advertisement[]> {
	return fetchListOfAdvertisements().then((res) => getAdvertisements(res));
}
export const advertisementThunk =
	() =>
	async (
		dispatch: (arg0: {
			payload: Advertisement[];
			type: "error/advertisementReducer";
		}) => void,
	) => {
		getAdvertisementList().then((res) => {
			dispatch(advertisementReducer(res));
		});
	};
