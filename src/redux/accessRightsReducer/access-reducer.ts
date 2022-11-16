import {ProfileDataType} from "../../types /ProfileType/ProfileTypes";
import {AppThunk} from "../store";
import {userAPI} from "../../api/users-api";
import {getUserStatusTC} from "../profileReducer/profile-reducer";
import {setAppInitializing} from "../appReducer/app-reducer";

export type InitAccessStateType = typeof initialState
export type accessStatusType = "admin" | "guest"

const initialState = {
    status: "guest" as accessStatusType,
    personalData: {} as ProfileDataType
}

export const accessReducer = (state: InitAccessStateType = initialState, action: AccessActionsType): InitAccessStateType => {
    switch (action.type) {
        case SET_PERSONAL_DATA:
            return {...state, personalData: {...action.data}}
        case SET_ADMIN_STATUS:
            return {...state, status: "admin"}
        default:
            return state
    }

}
const SET_PERSONAL_DATA = "SET-PERSONAL-DATA/social#network"
const SET_ADMIN_STATUS = "SET-ADMIN-STATUS/social#network"

export type AccessActionsType = ReturnType<typeof setPersonalData>
    | ReturnType<typeof setAdminStatus>


export const setPersonalData = (data: ProfileDataType) => {
    return {
        type: SET_PERSONAL_DATA,
        data
    }
}
export const setAdminStatus = () => {
    return {
        type: SET_ADMIN_STATUS
    } as const
}

export const setAdminAccessRights = (id: number): AppThunk => async dispatch => {
    const res = await userAPI.getProfileData(id)
    if (res.userId) {
        const status = await dispatch(getUserStatusTC(res.userId))
        dispatch(setPersonalData({...res, status}))
        dispatch(setAdminStatus())
        dispatch(setAppInitializing(true))
    }
}
