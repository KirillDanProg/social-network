import React, {useState} from "react";
import styles from "./Dialogs.module.css"
import DialogsForm from "./Message/DialogsForm";
import {addUserMessageTC, DialogType} from "../../redux/dialogsReducer/dialogs-reducer";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {Dialog} from "./Dialog";
import {DialogMessages} from "./DialogMessages";
import {useAppDispatch} from "../../utils/hooks/reduxHooks";

export const Dialogs = () => {

    const dispatch = useAppDispatch()
    const dialogItems = useSelector<RootState, DialogType[]>(state => state.dialogs.dialogsData)

    const [id, setId] = useState<number | null>(null)
    const [senderData, setSenderData] = useState<DialogType>({} as DialogType)

    const changeId = (id: number) => {
        setId(id)
    }
    const setSenderDataHandler = (data: DialogType) => {
        setSenderData(data)
    }
    const mappedDialogs = dialogItems.map(dialog => {
        return (
            <Dialog key={dialog.id} dialogData={dialog} changeId={changeId} setSenderData={setSenderDataHandler}/>
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
                    id && <DialogMessages  data={senderData}/>
                }

                    <DialogsForm onSubmit={addMessageHandler}/>

            </div>
        </div>
    )
}


