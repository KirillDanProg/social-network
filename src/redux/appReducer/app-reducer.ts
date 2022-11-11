import {authMeTC} from "../authReducer/authReducer";
import {getProfileDataTC} from "../profileReducer/profile-reducer";
import {AppThunk} from "../store";
import {AxiosError} from "axios";
import {RequestStatusType} from "../../api/api-types";
import {serverErrorsHandlers} from "../../utils/error-utils";
import {fetchDialogsTC} from "../dialogsReducer/dialogs-reducer";

const initialState = {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInit: false
}
export type InitStateType = typeof initialState
export type ActionType =
    ReturnType<typeof setAppInitializing>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>


export const appReducer = (state: InitStateType = initialState, action: ActionType): InitStateType => {
    switch (action.type) {
        case "APP/SET-INITIALIZING":
            return {
                ...state,
                isInit: action.payload.initStatus
            }
        case "SET-APP-STATUS":
            return {
                ...state,
                status: action.status
            }
        case "SET-APP-ERROR":
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

export const setAppInitializing = (initStatus: boolean) => {
    return {
        type: "APP/SET-INITIALIZING",
        payload: {
            initStatus
        }
    } as const
}
export const setAppStatus = (status: RequestStatusType) => {
    return {
        type: "SET-APP-STATUS",
        status
    } as const
}
export const setAppError = (error: string) => {
    return {
        type: "SET-APP-ERROR",
        error
    } as const
}

export const appInit = (): AppThunk => (dispatch, getState) => {
    dispatch(setAppInitializing(false))
    dispatch(authMeTC())
        .then(res => {
            const userID = getState().auth.id
            dispatch(getProfileDataTC(userID as number))
                .then(res => {
                    dispatch(setAppInitializing(true))

                })
        })
    dispatch(fetchDialogsTC())
        .catch((e: AxiosError) => {
            serverErrorsHandlers(dispatch, e.message)
        })

}