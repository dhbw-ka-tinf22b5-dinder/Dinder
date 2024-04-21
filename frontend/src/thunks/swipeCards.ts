import {swipeReducer} from "../slices/swipe";
import {Advertisement} from "../types/general.types";
import {getAllAdvertisements} from "../clients/http-client";

export const swipeThunk = (dispatch: (arg0: { payload: Advertisement[]; type: "swipe/swipeReducer"; }) => void) =>
    getAllAdvertisements().then((res)=>dispatch(swipeReducer(res)));
