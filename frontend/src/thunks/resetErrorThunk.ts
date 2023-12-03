import {errorReducer} from "../slices/error";
import { Error } from "../types/general.types";
export const resetError= ()=> (dispatch: (arg0: { payload: Error; type: "error/errorReducer"; }) => void)=>{
    const errorObject: Error = {
        error: false,
        errorMessage: "",
    }
    dispatch(errorReducer(errorObject));
}
