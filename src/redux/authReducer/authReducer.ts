import {authAPI} from "../../api/api";
import {LoginDataType} from "../../components/Login/Login";
import {ResultCode} from "../../api/api-types";
import {AppThunk} from "../store";
import {serverErrorsHandlers} from "../../utils/error-utils";

export type initialAuthStateType = {
    id: number | null
    email: string | null
    login: string | null
}
const initialState = {
    id: null,
    email: null,
    login: null,
}
export type AuthActionsType = ReturnType<typeof authMe>

export const USER_AUTH = "USER-AUTH"


export const authReducer = (state: initialAuthStateType = initialState, action: AuthActionsType): initialAuthStateType => {
    switch (action.type) {
        case USER_AUTH:
            return {
                ...state,
                id: action.payload.id,
                login: action.payload.login,
                email: action.payload.email,
            }
        default:
            return state
    }
}

export const authMe = (id: number | null, login: string | null, email: string | null) => {
    return {
        type: USER_AUTH,
        payload: {
            id,
            email,
            login,
        }
    } as const
}


export const authMeTC = (): AppThunk => async dispatch => {
    try {
        const res = await authAPI.me()
        if (res.data.messages.length === 0) {
            const data = res.data.data
            dispatch(authMe(data.id, data.login, data.email))
        } else {
            return
        }
    } catch (e) {
        console.log(e)
    }
}

export const loginTC = (data: LoginDataType): AppThunk => async dispatch => {
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === ResultCode.Ok) {
            const authRes = await authAPI.me()
            const data = authRes.data.data
            dispatch(authMe(data.id, data.login, data.email))
        } else if (res.data.messages.length > 0) {
            serverErrorsHandlers(dispatch, res.data.messages[0])
        }
    } catch (e) {
        serverErrorsHandlers(dispatch, e as string | Error)
    }
}

export const logoutTC = (): AppThunk => async dispatch => {
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === ResultCode.Ok) {
            dispatch(authMe(null, null, null))
        } else if (res.data.messages.length > 0) {
            serverErrorsHandlers(dispatch, res.data.messages[0])
        }
    } catch (e) {
        serverErrorsHandlers(dispatch, e as string | Error)
    }

}
