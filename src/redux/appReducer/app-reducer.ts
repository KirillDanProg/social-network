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
    isInit: false,
    theme: "light" as ThemeAppType
}
type ThemeAppType = "dark" | "light"
export type InitStateType = typeof initialState

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
        case "SET-APP-THEME":
            return {
                ...state, theme: action.themeValue
            }
        default:
            return state
    }
}

export type ActionType = ReturnType<typeof setAppInitializing>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setAppTheme>


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

export const setAppTheme = (themeValue: ThemeAppType) => {
    return {
        type: "SET-APP-THEME",
        themeValue
    } as const
}

export const appInit = (): AppThunk => (dispatch, getState) => {

    // there is no friends api/endpoint then I set an empty arr to save
    // them to localStorage on follow request
    if (!localStorage.getItem("friends")) {
        localStorage.setItem("friends", JSON.stringify([]))
    }
    // get theme from localStorage
    dispatch(getAppThemeTC())

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

export const setAppThemeTC = (themeValue: ThemeAppType): AppThunk => dispatch => {
    localStorage.setItem("appTheme", themeValue)
    dispatch(setAppTheme(themeValue))
}

export const getAppThemeTC = (): AppThunk => dispatch => {
   const theme = localStorage.getItem("appTheme")
    if(theme) {
        dispatch(setAppTheme(theme as ThemeAppType))
    }
}