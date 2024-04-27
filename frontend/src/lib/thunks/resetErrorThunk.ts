import { errorReducer } from "@/lib/slices/error.ts";
import type { Error } from "../../types/general.types.ts";
export const resetError =
	() =>
	(
		dispatch: (arg0: { payload: Error; type: "error/errorReducer" }) => void,
	) => {
		const errorObject: Error = {
			error: false,
			errorMessage: "",
		};
		dispatch(errorReducer(errorObject));
	};
