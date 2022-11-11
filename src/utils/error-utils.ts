import {Dispatch} from "redux";
import {setAppError, setAppStatus} from "../redux/appReducer/app-reducer";

export const serverErrorsHandlers = (dispatch: Dispatch, error: string) => {
    dispatch(setAppStatus("failed"))
    dispatch(setAppError(error))
}

