import React, {FC, memo} from 'react';
import {DialogType} from "../../redux/dialogsReducer/dialogs-reducer";
import defaultAvatar from "../../assets/user.png"
import {Avatar} from "../Avatar";
import styles from "./Dialogs.module.css"

type DialogPropsType = {
    dialogData: DialogType
    changeId: (id: number) => void
}
export const Dialog: FC<DialogPropsType> = memo((props) => {
    const {dialogData} = props
    const avatar = dialogData.photos.small || defaultAvatar

    const changeIdHandler = () => {
        props.changeId(dialogData.id)
    }

    return (
        <div className={styles.dialogBox} onClick={changeIdHandler}>
            <Avatar src={avatar}/>
            <div>{dialogData.userName}</div>
        </div>
    );
});

