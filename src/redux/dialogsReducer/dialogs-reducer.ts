import {MessageDataType} from "../../types /DialogsType/DialogsTypes";
import {AppThunk} from "../store";
import {dialogsAPI} from "../../api/dialogs-api";

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
    messagesData: [] as MessageDataType[] | null,
}

export type InitialStateType = typeof initialState

export const dialogsReducer = (state: InitialStateType = initialState, action: DialogsActionTypes): InitialStateType => {
    switch (action.type) {
        case FETCH_DIALOGS:
            return {...state, dialogsData: [...action.dialogs]}
        default:
            return state
    }
}

const FETCH_DIALOGS = "FETCH-DIALOGS/social-network"

export type DialogsActionTypes = ReturnType<typeof fetchDialogsAC>

export const fetchDialogsAC = (dialogs: DialogType[]) => {
    return {
        type: FETCH_DIALOGS,
        dialogs
    } as const
}



//thunk creators
export const fetchDialogsTC = () : AppThunk => async dispatch => {
    try {
        const res = await dialogsAPI.fetchDialogs()
        dispatch(fetchDialogsAC(res.data))
    } catch (e) {
       console.log(e)
    }
}