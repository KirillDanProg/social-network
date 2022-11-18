import {ThunkDispatch} from "redux-thunk";
import {AppThunk, RootState} from "../store";
import {AnyAction} from "redux";
import {ProfileDataType} from "../../types /ProfileType/ProfileTypes";
import {
    addFriendToLocalStorage,
    getFriendsFromLocalStorage,
    removeFriendFromLocalStorage
} from "../../utils/localStorage/usersLS";
import {userAPI} from "../../api/users-api";
import {removeDialogAC} from "../dialogsReducer/dialogs-reducer";

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
    friendsId: {} as { [key: string]: number },
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
const ADD_FRIEND_ID = "ADD-FRIEND-ID"
const DELETE_FRIEND = "DELETE-FRIEND/social-network"
const SAVE_TO_FRIENDS = "SAVE-TO-FRIENDS/social-network"
const DELETE_FRIEND_ID = "DELETE-FRIEND-ID"

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
        case ADD_FRIEND_ID:
            return {
                ...state, friendsId: {...state.friendsId, [action.id]: action.id}
            }
        case SET_DISABLE:
            return {...state, disabled: action.id}
        case DELETE_FRIEND:
            return {
                ...state, friends: state.friends.filter(el => el.userId !== action.id)
            }
        case SAVE_TO_FRIENDS:
            return {
                ...state, friends: action.friendsData.map(friend => ({...friend, followed: true}))
            }
        case DELETE_FRIEND_ID:
            delete state.friendsId[action.id]
            return {
                ...state, friendsId: {...state.friendsId}
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
    | ReturnType<typeof addFriendId>
    | ReturnType<typeof deleteFromFriends>
    | ReturnType<typeof saveToFriends>
    | ReturnType<typeof deleteFriendId>
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
export const addFriendId = (id: number) => {
    return {
        type: ADD_FRIEND_ID,
        id
    } as const
}
export const deleteFriendId = (id: number) => {
    return {
        type: DELETE_FRIEND_ID,
        id
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
                addRemoveFriendTC("add", id, dispatch)
                // dispatch(getFriendsTC())
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
                addRemoveFriendTC("remove", id, dispatch)
                dispatch(deleteFromFriends(id))
                dispatch(setDisableAC(null))

                // remove from dialogs
                // fake delete request
                dispatch(removeDialogAC(id))
            }
        })
    }
}
export const getFriendsTC = (): AppThunk => async (dispatch) => {
    const friendsId = getFriendsFromLocalStorage()
    const friendsArr = [] as ProfileDataType[]
    if (friendsId) {
        await Promise.allSettled(friendsId.map(async (id) => {
            const friendItem = await userAPI.getProfileData(id)
            friendsArr.push(friendItem)
        }))
        dispatch(saveToFriends(friendsArr))
    }
}
export const addRemoveFriendTC = (action: string, id: number, dispatch) => {
    if (action === "add") {
        addFriendToLocalStorage(id)
        dispatch(addFriendId(id))
    }
    if (action === "remove") {
        removeFriendFromLocalStorage(id)
        dispatch(deleteFriendId(id))
    }
}

export const findUserTC = (term: string): AppThunk => async dispatch => {
    try {
        const res = await userAPI.findUser(term)
        dispatch(setUsersAC(res.data.items))
    } catch (e) {
        console.log(e)
    }

}