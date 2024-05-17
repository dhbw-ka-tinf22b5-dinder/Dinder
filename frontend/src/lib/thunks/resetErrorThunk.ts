import { errorReducer } from "@/lib/slices/error.ts";
import type { FrontendError } from "../../types/general.types.ts";
export const resetError =
	() =>
	(
		dispatch: (arg0: { payload: FrontendError; type: "error/errorReducer" }) => void,
	) => {
		const errorObject: FrontendError = {
			error: false,
			errorMessage: "",
		};
		dispatch(errorReducer(errorObject));
	};
