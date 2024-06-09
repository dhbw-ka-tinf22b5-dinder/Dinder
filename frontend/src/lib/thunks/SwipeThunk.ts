import { Advertisement, swipe } from "@/types/general.types.ts";
import { getSwipes } from "@/clients/http-client.ts";
import { swipeReducer } from "@/lib/slices/swipes.ts";

function getListOfAdvertisements(
	currentUser: string,
	Advertisements: Advertisement[],
): number[] {
	return Advertisements.filter(
		(value) => value.advertiser.userName == currentUser,
	).map((value) => value.id);
}
function getAllSwipes(
	user: string,
	Advertisements: Advertisement[],
): Promise<swipe[][]> {
	const advertisementList: number[] = getListOfAdvertisements(
		user,
		Advertisements,
	);
	return Promise.all(advertisementList.map((id) => getSwipes(id)));
}
function concatSwipes(
	user: string,
	Advertisements: Advertisement[],
): Promise<swipe[]> {
	return getAllSwipes(user, Advertisements).then((res) => {
		let listOfSwipes: swipe[] = [];
		res.forEach((e) => {
			listOfSwipes = listOfSwipes.concat(e);
		});
		return listOfSwipes;
	});
}
export const swipeThunk =
	(user: string, Advertisements: Advertisement[]) =>
	async (
		dispatch: (arg0: {
			payload: swipe[];
			type: "swipes/swipeReducer";
		}) => void,
	) => {
		concatSwipes(user, Advertisements).then((res) =>
			dispatch(swipeReducer(res)),
		);
	};
