import {Dispatch} from "redux";
import {setAppError, setAppInitializing, setAppStatus} from "../redux/appReducer/app-reducer";

export const serverErrorsHandlers = (dispatch: Dispatch, error: string | {message: string}) => {
    dispatch(setAppStatus("failed"))
    if(typeof error === "string") {
        dispatch(setAppError(error))
    } else if(error instanceof Error) {
        dispatch(setAppError(error.message))
    }
    dispatch(setAppInitializing(true))
}

