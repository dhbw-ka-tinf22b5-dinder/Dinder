import { getOwnSwipes, getSwipes } from "@/clients/http-client.ts";
import { ownSwipeReducer, swipeReducer } from "@/lib/slices/swipes.ts";
import type { Advertisement, swipe } from "@/types/general.types.ts";

function getAllSwipes(advertisementList: Advertisement[]): Promise<swipe[][]> {
	return Promise.all(advertisementList.map((ad) => getSwipes(ad.id)));
}
function concatSwipes(Advertisements: Advertisement[]): Promise<swipe[]> {
	return getAllSwipes(Advertisements).then((res) => {
		let listOfSwipes: swipe[] = [];
		for (const e of res) {
			listOfSwipes = listOfSwipes.concat(e);
		}
		return listOfSwipes;
	});
}
export const swipeThunk =
	(Advertisements: Advertisement[]) =>
	async (
		dispatch: (arg0: {
			payload: swipe[];
			type: "swipes/swipeReducer";
		}) => void,
	) => {
		concatSwipes(Advertisements).then((res) => dispatch(swipeReducer(res)));
	};

export const OwnSwipeThunk =
	() =>
	async (
		dispatch: (arg0: {
			payload: swipe[];
			type: "swipes/ownSwipeReducer";
		}) => void,
	) => {
		getOwnSwipes().then((res) => {
			dispatch(ownSwipeReducer(res));
		});
	};
