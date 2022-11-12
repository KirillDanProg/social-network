import React, {FC, useState} from "react";
import styles from "./Dialogs.module.css"
import DialogsForm from "./Message/DialogsForm";
import {addUserMessageTC, DialogType} from "../../redux/dialogsReducer/dialogs-reducer";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {Dialog} from "./Dialog";
import {DialogMessages} from "./DialogMessages";
import {useAppDispatch} from "../../utils/hooks/reduxHooks";

export const Dialogs: FC<any> = (props) => {

    const dispatch = useAppDispatch()
    const dialogItems = useSelector<RootState, DialogType[]>(state => state.dialogs.dialogsData)
    const [id, setId] = useState<number | null>(null)

    const changeId = (id: number) => {
        setId(id)
    }
    const mappedDialogs = dialogItems.map(dialog => {
        return (
            <Dialog key={dialog.id} dialogData={dialog} changeId={changeId}/>
        )
    })

    const addMessageHandler = (message: string) => {
       id && dispatch(addUserMessageTC(id, message))
    }


    return (
        <div className={styles.dialogsContainer}>

            <div className={styles.colDialogs}>
                {mappedDialogs}
            </div>

            <div className={styles.colMessages}>

                {
                    id && <DialogMessages id={id}/>
                }

                <div className={styles.sendMessageBox}>
                    <DialogsForm onSubmit={addMessageHandler}/>
                </div>

            </div>
        </div>
    )
}


