import {authAPI} from "../../api/api";
import {LoginDataType} from "../../components/Login/Login";
import {ResultCode} from "../../api/api-types";
import {AppThunk} from "../store";
import {setAdminAccessRights} from "../accessRightsReducer/access-reducer";

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
    const res = await authAPI.me()
    const data = res.data.data
    dispatch(authMe(data.id, data.login, data.email))
    await dispatch(setAdminAccessRights(data.id))
}

export const loginTC = (data: LoginDataType): AppThunk => dispatch => {
    authAPI.login(data).then(res => {
        if (res.data.resultCode === ResultCode.Ok) {
            authAPI.me().then(response => response.data.data)
                .then(data => {
                    dispatch(authMe(data.id, data.login, data.email))
                })
        }
    })
}

export const logoutTC = (): AppThunk => dispatch => {
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === ResultCode.Ok) {
                dispatch(authMe(null, null, null))
            }
        })
}
