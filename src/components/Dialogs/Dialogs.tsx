import React, {memo, useEffect, useState} from "react";
import styles from "./Dialogs.module.css"
import {DialogType, fetchDialogsTC} from "../../redux/dialogsReducer/dialogs-reducer";
import { useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {Dialog} from "./Dialog";
import {DialogWindow} from "./DialogWindow";
import {useAppDispatch} from "../../utils/hooks/reduxHooks";

export type ChatDataType = {
    avatar: any
    id: number
    userName: any
    lastUserActivity: Date
}

export const Dialogs = memo(() => {

    const dialogItems = useSelector<RootState, DialogType[]>(state => state.dialogs.dialogsData)
    const [isDialogSelected, setIsDialogSelected] = useState(false)
    const [chatData, setChatData] = useState({} as ChatDataType)
    const dispatch = useAppDispatch()

    const goToDialogWindow = (chatData: any) => {
        setIsDialogSelected(true)
        setChatData(chatData)
    }

    const mappedDialogs = dialogItems.map(dialog => {
        return (
            <Dialog key={dialog.id} dialogData={dialog} goToDialogWindow={goToDialogWindow}/>
        )
    })

    useEffect(() => {
        dispatch(fetchDialogsTC())
    }, [])

    return (
        <div className={styles.dialogsContainer}>
            {
                isDialogSelected ?
                    <DialogWindow chatData={chatData} goBackToDialogs={setIsDialogSelected}/>
                    :
                    <div className={styles.colDialogs}>
                        {mappedDialogs}
                    </div>
            }
        </div>
    )
})

