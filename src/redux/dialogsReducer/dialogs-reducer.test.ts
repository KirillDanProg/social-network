import {MessageDataType} from "../../types /DialogsType/DialogsTypes";
import {dialogsReducer, DialogType, InitialStateType} from "./dialogs-reducer";

let startState: InitialStateType

beforeEach(() => {
    startState = {
        dialogsData: [] as DialogType[],
        messagesData: null
    }
})

test("dialogs should be loaded", () => {

    const action = {
        type: "FETCH-DIALOGS/social-network",
        dialogs: [
            {
                id: 1,
                userName: "alex",
                hasNewMessages: false,
                lastDialogActivityDate: "10.11",
                lastUserActivityDate: "11.12",
                newMessagesCount: 0,
                photos: {
                    small: null,
                    large: null
                }
            }
        ] as DialogType[]
    } as const

    const newState = dialogsReducer(startState, action)

    expect(newState.dialogsData.length).toBe(1)
    expect(newState.dialogsData.some(el => el.id === action.dialogs[0].id)).toBeTruthy()

})


