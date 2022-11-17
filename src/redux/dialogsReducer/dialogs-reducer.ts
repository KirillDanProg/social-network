import {MessageDataType, MessageType, SandedMessageType} from "../../types /DialogsType/DialogsTypes";
import {AppThunk} from "../store";
import {dialogsAPI} from "../../api/dialogs-api";
import {filterUsers} from "../../utils/helpers";

export type DialogType = {
    id: number
    userName: string
    hasNewMessages: boolean
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: {
        small: string | null
        large: string | null
    }
}
const initialState = {
    dialogsData: [] as DialogType[],
    messagesData: {} as MessageDataType,
}

export type InitialStateType = typeof initialState

export const dialogsReducer = (state: InitialStateType = initialState, action: DialogsActionTypes): InitialStateType => {
    switch (action.type) {
        case FETCH_DIALOGS:
            return {...state, dialogsData: [...action.dialogs]}
        case SET_MESSAGES:
            return {
                ...state, messagesData: {
                    ...state.messagesData,
                    [String(action.id)]: [...action.messages]
                }
            }
        case ADD_MESSAGE:
            return {
                ...state, messagesData: {
                    ...state.messagesData,
                    [String(action.id)]: [...state.messagesData[String(action.id)], {...action.messageData}]
                }
            }
        case DELETE_MESSAGE:
            return {
                ...state, messagesData: {
                    ...state.messagesData,
                    [String(action.userId)]: state.messagesData[action.userId]
                        .filter(m => m.id !== action.messageId)
                }
            }
        case REMOVE_DIALOG:
            return {
                ...state, dialogsData: state.dialogsData.filter(dialog => dialog.id !== action.userId)
            }
        default:
            return state
    }
}

const FETCH_DIALOGS = "FETCH-DIALOGS/social-network"
const SET_MESSAGES = "SET-MESSAGES/social-network"
const ADD_MESSAGE = "ADD-MESSAGE/social-network"
const DELETE_MESSAGE = "DELETE-MESSAGE/social-network"
const REMOVE_DIALOG = "REMOVE-DIALOG/social-network"

export type DialogsActionTypes = ReturnType<typeof fetchDialogsAC>
    | ReturnType<typeof setUserMessagesAC>
    | ReturnType<typeof addUserMessageAC>
    | ReturnType<typeof deleteUserMessageAC>
    | ReturnType<typeof removeDialogAC>

export const fetchDialogsAC = (dialogs: DialogType[]) => {
    return {
        type: FETCH_DIALOGS,
        dialogs
    } as const
}

export const setUserMessagesAC = (id: number, messages: MessageType[]) => {
    return {
        type: SET_MESSAGES,
        messages,
        id
    } as const
}
export const addUserMessageAC = (id: number, messageData: SandedMessageType) => {
    return {
        type: ADD_MESSAGE,
        id,
        messageData
    } as const
}
export const deleteUserMessageAC = (userId: number, messageId: string) => {
    return {
        type: DELETE_MESSAGE,
        userId,
        messageId
    } as const
}
export const removeDialogAC = (userId: number) => {
    return {
        type: REMOVE_DIALOG,
        userId
    } as const
}
//thunk creators
export const fetchDialogsTC = (): AppThunk => async dispatch => {
    try {
        // fetching dialogs
        const res = await dialogsAPI.fetchDialogs()
        const friends: any = localStorage.getItem("friends")

        const filteredDialogs = filterUsers(res.data, JSON.parse(friends))

        await Promise.allSettled(filteredDialogs.map(dialog => {
            dispatch(fetchMessagesTC(dialog.id))
        }))

        dispatch(fetchDialogsAC(filteredDialogs))
    } catch (e) {
        console.log(e)
    }
}

export const fetchMessagesTC = (id: number): AppThunk => async dispatch => {
    const res = await dialogsAPI.fetchMessages(id)
    if (!res.data.error) {
        dispatch(setUserMessagesAC(id, res.data.items))
    }
}

export const addUserMessageTC = (id: number, message: string): AppThunk => async dispatch => {
    try {
        const res = await dialogsAPI.addUserMessage(id, message)
        dispatch(addUserMessageAC(id, res.data.data.message))
    } catch (e) {
        console.log(e)
    }
}
export const deleteUserMessageTC = (userId: number, messageId: string): AppThunk => async dispatch => {
    try {
        const res = await dialogsAPI.deleteUserMessage(messageId)
        if (res.data.resultCode === 0) {
            dispatch(deleteUserMessageAC(userId, messageId))
        }
    } catch (e) {
        console.log(e)
    }
}
export const refreshDialogTC = (userId: number): AppThunk => async dispatch => {
    try {
        const res = await dialogsAPI.refreshDialog(userId)
        if (res.data.resultCode === 0) {
            dispatch(fetchDialogsTC())
        }

    } catch (e) {
        console.log(e)
    }
}