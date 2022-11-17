import {PostDataType, ProfileDataType, ProfileType} from "../../types /ProfileType/ProfileTypes";
import {AppThunk} from "../store";
import {profileAPI} from "../../api/profile-api";
import {userAPI} from "../../api/users-api";

export type ProfileActionsType = ReturnType<typeof setProfileDataAC> |
    ReturnType<typeof getUserStatusAC>

const SET_PROFILE_DATA = "SET-PROFILE-DATA"
const GET_USER_STATUS = "GET-USER-STATUS"

const initialState: ProfileType = {
    postsData: [] as PostDataType[],
    profileData: {} as ProfileDataType,
}


const profileReducer = (state: ProfileType = initialState, action: ProfileActionsType): ProfileType => {
    switch (action.type) {
        case SET_PROFILE_DATA:
            return {...state, profileData: action.data}
        case GET_USER_STATUS:
            return {...state, profileData: {...state.profileData, status: action.status}}
        default:
            return state
    }
}

export const getUserStatusAC = (status: string) => {
    return {
        type: GET_USER_STATUS,
        status
    } as const
}

export const setProfileDataAC = (data: ProfileDataType) => {
    return {
        type: SET_PROFILE_DATA,
        data
    } as const
}


// THUNK CREATORS
export const getProfileDataTC = (userId: number): AppThunk => async dispatch => {
    const data = await userAPI.getProfileData(userId)
    const status = await dispatch(getUserStatusTC(data.userId))
    const profileData = {...data, status}
    dispatch(setProfileDataAC(profileData))
}

export const getUserStatusTC = (id: number): AppThunk => async () => {
    return await profileAPI.getUserStatus(id)

}


export default profileReducer