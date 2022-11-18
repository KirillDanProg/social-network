import {ProfileDataType} from "../../types /ProfileType/ProfileTypes";
import {AppThunk} from "../store";
import {userAPI} from "../../api/users-api";
import {getUserStatusTC} from "../profileReducer/profile-reducer";
import {setAppInitializing} from "../appReducer/app-reducer";
import {profileAPI} from "../../api/profile-api";
import {ResultCode} from "../../api/api-types";

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
        case UPDATE_USER_PHOTO:
            return {...state, personalData: {...state.personalData, photos: {...action.photos}}}
        case UPDATE_USER_STATUS:
            return {...state, personalData: {...state.personalData, status: action.payload.status}}
        case UPDATE_USER_INFO:
            return {
                ...state, personalData: {
                    ...state.personalData,
                    ...action.userInfo,
                    contacts: {...action.userInfo.contacts}
                }
            }
        default:
            return state
    }

}
const SET_PERSONAL_DATA = "SET-PERSONAL-DATA/social#network"
const SET_ADMIN_STATUS = "SET-ADMIN-STATUS/social#network"
const UPDATE_USER_PHOTO = "UPDATE-USER-PHOTO"
const UPDATE_USER_STATUS = "UPDATE-USER-STATUS"
const UPDATE_USER_INFO = "UPDATE-USER-INFO"


export type AccessActionsType = ReturnType<typeof setPersonalData>
    | ReturnType<typeof setAdminStatus>
    | ReturnType<typeof updateUserPhotoAC>
    | ReturnType<typeof updateUserStatusAC>
    | ReturnType<typeof updateUserInfo>

export const setPersonalData = (data: ProfileDataType) => {
    return {
        type: SET_PERSONAL_DATA,
        data
    } as const
}
export const setAdminStatus = () => {
    return {
        type: SET_ADMIN_STATUS
    } as const
}

export const updateUserPhotoAC = (photos: any) => {
    return {
        type: UPDATE_USER_PHOTO,
        photos
    } as const
}

export const updateUserStatusAC = (status: string) => {
    return {
        type: UPDATE_USER_STATUS,
        payload: {
            status
        }
    } as const
}

export const updateUserInfo = (userInfo: UserInfoModelType) => {
    return {
        type: UPDATE_USER_INFO,
        userInfo
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


export const updateUserPhotoTC = (photo: File): AppThunk => async dispatch => {
    try {
        const res = await profileAPI.updateUserPhoto(photo)
        if (res.data.resultCode === 0) {
            dispatch(updateUserPhotoAC(res.data.data.photos))
        }
    } catch (e) {
        console.log(e)
    }

}
export const changeUserStatusTC = (status: string): AppThunk => dispatch => {
    profileAPI.updateUserStatus(status)
        .then(res => {
            if (res.resultCode === ResultCode.Ok) {
                dispatch(updateUserStatusAC(status))
            }
        })
        .catch(err => console.warn(err))
}
export type UserInfoModelType = {
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
}
type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export const updatePersonalData = (userInfoModel: UserInfoModelType): AppThunk => async dispatch => {
    const res = await profileAPI.updateUserInfo(userInfoModel)
    if (res.data.resultCode === 0) {
        dispatch(updateUserInfo(res.data.data))
    }

}