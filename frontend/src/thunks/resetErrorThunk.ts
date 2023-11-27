import {errorReducer} from "../slices/error";
import { Error } from "../types/general.types";
export const resetError= ()=> dispatch=>{
    const errorObject: Error = {
        error: false,
        errorMessage: "",
    }
    dispatch(errorReducer(errorObject));
}
