import {ProfileType} from "./ProfileType/ProfileTypes";
import { MessageDataType} from "./DialogsType/DialogsTypes";
import {DialogType} from "../redux/dialogsReducer/dialogs-reducer";

export type StateType = {
    dialogs: {
        dialogsData: Array<DialogType>
        messagesData: Array<MessageDataType>
        messageText: string
    }
    profile: ProfileType
    sidebar: {
        friends: Array<FriendType>
    }

}

export type FriendType = {
    id: string
    name: string
    img: string,
}

export type AppPropsType = {
    // state: {
       // store: string
       //  // addPost: () => void
       //  // updatePostText: (newPostText: string) => void
       //  // deletePost: (id: string) => void
       //  // updateMessageText: (newMessageText: string) => void
       //  // addMessage: () => void
    // }
    store: any
}

export type NavLinkComponentType = {
    title: string
    friends?: Array<FriendType>
}





