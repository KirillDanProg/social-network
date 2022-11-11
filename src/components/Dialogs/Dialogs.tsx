import React, {FC, useEffect} from "react";
import styles from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import {DialogMessage} from "./Message/DialogMessage";
import { MessageDataType} from "../../types /DialogsType/DialogsTypes";
import DialogsForm from "./Message/DialogsForm";
import {DialogType} from "../../redux/dialogsReducer/dialogs-reducer";
import {useAppSelector} from "../../common/hooks";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {Dialog} from "./Dialog";
import {Avatar} from "../Avatar";


// export type DialogsPropsType = {
//     dialogs: {
//         dialogsData: Array<DialogType>
//         messagesData: Array<MessageDataType>
//     }
// }
export const Dialogs: FC<any> = (props) => {


    const dialogItems = useSelector<RootState, DialogType[]>(state => state.dialogs.dialogsData)

    const mappedDialogs  = dialogItems.map(dialog => {
        return (
            <Dialog key={dialog.id} dialogData={dialog}/>
        )
    })

    const addMessageHandler = (message: string) => {
    }


    return (
        <div className={styles.dialogsContainer}>

            <div className={styles.colDialogs}>
                {mappedDialogs}
            </div>

            <div className={styles.colMessages}>

                <DialogsForm onSubmit={addMessageHandler}/>

            </div>
        </div>
    )
}


