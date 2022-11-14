import {v1} from "uuid";
import img from "../../assets/images.jpeg"
import {PostDataType, ProfileDataType, ProfileType} from "../../types /ProfileType/ProfileTypes";
import {userAPI} from "../../api/api";
import {AppThunk} from "../store";
import {ResultCode} from "../../api/api-types";
import {profileAPI} from "../../api/profile-api";

export type ProfileActionsType = ReturnType<typeof deletePostAC> |
    ReturnType<typeof updatePostTextAC> |
    ReturnType<typeof addPostAC> |
    ReturnType<typeof setProfileDataAC> |
    ReturnType<typeof updateUserStatusAC> |
    ReturnType<typeof getUserStatusAC> |
    ReturnType<typeof updateUserPhotoAC>

const ADD_POST = "ADD-POST"
const UPDATE_POST_TEXT = "UPDATE-POST-TEXT"
const DELETE_POST = "DELETE-POST"
const SET_PROFILE_DATA = "SET-PROFILE-DATA"
const UPDATE_USER_STATUS = "UPDATE-USER-STATUS"
const GET_USER_STATUS = "GET-USER-STATUS"
const UPDATE_USER_PHOTO = "UPDATE-USER-PHOTO"

const initialState: ProfileType = {
    postsData: [] as PostDataType[],
    profileData: {} as ProfileDataType,
}


const profileReducer = (state: ProfileType = initialState, action: ProfileActionsType): ProfileType => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: v1(),
                postText: action.postText,
                likes: 0,
                img: img
            }
            return {...state, postsData: [...state.postsData, newPost]}
        case DELETE_POST:
            return {...state, postsData: state.postsData.filter(post => post.id !== action.payload)}
        case SET_PROFILE_DATA:
            return {...state, profileData: action.data}
        case UPDATE_USER_STATUS:
            return {...state, profileData: {...state.profileData, status: action.payload.status}}
        case GET_USER_STATUS:
            return {...state, profileData: {...state.profileData, status: action.status}}
        case UPDATE_USER_PHOTO:
            return {...state, profileData: {...state.profileData, photos: {...action.photos}}}
        default:
            return state
    }
}

export const addPostAC = (postText: string) => {
    return {
        type: ADD_POST,
        postText
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

export const getUserStatusAC = (status: string) => {
    return {
        type: GET_USER_STATUS,
        status
    } as const
}

export const updatePostTextAC = (newPostText: string) => {
    return {
        type: UPDATE_POST_TEXT,
        payload: newPostText
    } as const
}


export const deletePostAC = (id: string) => {
    return {
        type: DELETE_POST,
        payload: id
    } as const
}

export const setProfileDataAC = (data: ProfileDataType) => {
    return {
        type: SET_PROFILE_DATA,
        data
    } as const
}

export const updateUserPhotoAC = (photos: any) => {
    return {
        type: UPDATE_USER_PHOTO,
        photos
    } as const
}
// THUNK CREATORS
export const getProfileDataTC = (userId: number): AppThunk => dispatch => {
    return userAPI.getProfileData(userId)
        .then(data => {
            profileAPI.getUserStatus(userId)
                .then(status => {
                    const profileData = {...data, status}
                    dispatch(setProfileDataAC(profileData))
                })
                .catch(err => console.warn(err))
        })
        .catch(e => {
            console.warn(e.message)
        })
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
export const getUserStatusTC = (id: number): AppThunk => dispatch => {
    profileAPI.getUserStatus(id)
        .then(data => dispatch(getUserStatusAC(data)))
        .catch(err => console.warn(err))
}

export const updateUserPhotoTC = (photo: File): AppThunk => async dispatch => {
    try {
        const res = await profileAPI.updateUserPhoto(photo)
        if(res.data.message)
        dispatch(updateUserPhotoAC(res.data.data.photos))
    } catch (e) {
        console.log(e)
    }

}
export default profileReducer