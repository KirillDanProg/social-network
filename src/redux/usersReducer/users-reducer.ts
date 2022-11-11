import {ThunkDispatch} from "redux-thunk";
import {AppThunk, RootState} from "../store";
import {AnyAction} from "redux";
import {userAPI} from "../../api/api";
import {ProfileDataType} from "../../types /ProfileType/ProfileTypes";
import {
    addFriendToLocalStorage,
    getFriendsFromLocalStorage,
    removeFriendFromLocalStorage
} from "../../utils/localStorage/usersLS";

export type UserType = {
    "name": string
    "id": number
    "uniqueUrlName": null | string,
    "photos": {
        "small": null | string
        "large": null | string
    },
    "status": null | string
    "followed": boolean
}
const initialState = {
    users: [] as UserType[],
    friendsId: [] as number[],
    friends: [] as ProfileDataType[],
    error: "",
    total: 0,
    count: 10,
    page: 1,
    disabled: null as number | null
}
export type InitialUsersStateType = typeof initialState

const SET_USERS = "SET-USERS"
const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_PAGE = "SET-PAGE"
const SET_TOTAL = "SET-TOTAL"
const SET_DISABLE = "SET-DISABLE"
const SAVE_FRIEND_ID = "SAVE-FRIEND-ID/social-network"
const DELETE_FRIEND = "DELETE-FRIEND/social-network"
const SAVE_TO_FRIENDS = "SAVE-TO-FRIENDS/social-network"

export const usersReducer = (state: InitialUsersStateType = initialState, action: UsersActionsType): InitialUsersStateType => {
    switch (action.type) {
        case SET_USERS:
            return {...state, users: [...action.payload.users]}
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.payload.id ? {...u, followed: true} : u)}
        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.payload.id ? {...u, followed: false} : u)}
        case SET_PAGE:
            return {...state, page: action.page}
        case SET_TOTAL:
            return {...state, total: action.total}
        case SET_DISABLE:
            return {...state, disabled: action.id}
        case SAVE_FRIEND_ID:
            return {
                ...state, friendsId: [action.id, ...state.friendsId]
            }
        case DELETE_FRIEND:
            return {
                ...state, friendsId: state.friendsId.filter(friendId => friendId !== action.id)
            }
        case SAVE_TO_FRIENDS:
            return {
                ...state, friends: action.friendsData.map(friend => ({...friend, followed: true}))
            }
        default:
            return state
    }
}

export type UsersActionsType = ReturnType<typeof setUsersAC>
    | ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setPageAC>
    | ReturnType<typeof setTotalAC>
    | ReturnType<typeof setDisableAC>
    | ReturnType<typeof saveFriendId>
    | ReturnType<typeof deleteFromFriends>
    | ReturnType<typeof saveToFriends>

export const setUsersAC = (users: UserType[]) => {
    return {
        type: SET_USERS,
        payload: {
            users
        }
    } as const
}
export const followAC = (id: number) => {
    return {
        type: FOLLOW,
        payload: {
            id
        }
    } as const
}
export const unfollowAC = (id: number) => {
    return {
        type: UNFOLLOW,
        payload: {
            id
        }
    } as const
}
export const setPageAC = (page: number) => {
    return {
        type: SET_PAGE,
        page
    } as const
}
export const setTotalAC = (total: number) => {
    return {
        type: SET_TOTAL,
        total
    } as const
}
export const setDisableAC = (id: number | null) => {
    return {
        type: SET_DISABLE,
        id
    } as const
}
export const saveFriendId = (id: number) => {
    return {
        type: SAVE_FRIEND_ID,
        id
    } as const
}
export const deleteFromFriends = (id: number) => {
    return {
        type: DELETE_FRIEND,
        id
    } as const
}
export const saveToFriends = (friendsData: ProfileDataType[]) => {
    return {
        type: SAVE_TO_FRIENDS,
        friendsData
    } as const
}

// THUNK CREATORS
export const getUsersTC = (page: number, count: number) => {
    return (dispatch: ThunkDispatch<RootState, void, AnyAction>) => {
        userAPI.getUsers(page, count)
            .then(data => {
                dispatch(setUsersAC(data.items))
                dispatch(setTotalAC(data.totalCount))
            })
    }
}
export const followTC = (id: number) => {
    return (dispatch: ThunkDispatch<RootState, void, AnyAction>) => {
        setDisableAC(id)
        userAPI.follow(id).then(data => {
            if (data.resultCode === 0) {
                dispatch(followAC(id))
                addRemoveFriendTC("add", id)
                dispatch(getFriendsTC())
                dispatch(setDisableAC(null))
            }
        })
    }
}
export const unfollowTC = (id: number) => {
    return (dispatch: ThunkDispatch<RootState, void, AnyAction>) => {
        userAPI.unfollow(id).then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollowAC(id))
                addRemoveFriendTC("remove", id)
                dispatch(getFriendsTC())
                dispatch(setDisableAC(null))
            }
        })
    }
}
export const getFriendsTC = (): AppThunk => async (dispatch) => {
    const friendsArr = [] as ProfileDataType[]
    const friendsId = getFriendsFromLocalStorage()
    if (friendsId) {
        await Promise.allSettled(friendsId.map(async (id) => {
            const friendData = await userAPI.getProfileData(id)
            friendsArr.push(friendData)
        }))
        dispatch(saveToFriends(friendsArr))
    }
}
export const addRemoveFriendTC = (action: string, id: number) => {
    if (action === "add") {
        addFriendToLocalStorage(id)
    }
    if (action === "remove") {
        removeFriendFromLocalStorage(id)
    }
}
