import React, {FC, memo} from 'react';
import {DialogType} from "../../redux/dialogsReducer/dialogs-reducer";
import defaultAvatar from "../../assets/user.png"
import {Avatar} from "../../common/superComponents/Avatar";
import styles from "./Dialogs.module.css"

type DialogPropsType = {
    dialogData: DialogType
    changeId: (id: number) => void
    setSenderData: (data: any) => void
}
export const Dialog: FC<DialogPropsType> = memo((props) => {
    const {dialogData} = props
    const avatar = dialogData.photos.small || defaultAvatar

    const changeIdHandler = () => {
        props.setSenderData(dialogData)
        props.changeId(dialogData.id)
    }

    return (
        <div className={styles.dialogBox} onClick={changeIdHandler}>
            <Avatar src={avatar} width={"70px"}/>
            <div>{dialogData.userName}</div>
        </div>
    );
});

