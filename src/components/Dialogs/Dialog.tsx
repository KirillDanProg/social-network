import React, {FC, memo} from 'react';
import {DialogType} from "../../redux/dialogsReducer/dialogs-reducer";
import defaultAvatar from "../../assets/user.png"
import {Avatar} from "../../common/superComponents/Avatar";
import styles from "./Dialogs.module.css"
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons/faCircleXmark";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppDispatch} from "../../utils/hooks/reduxHooks";
import {unfollowTC} from "../../redux/usersReducer/users-reducer";

type DialogPropsType = {
    dialogData: DialogType
    changeId: (id: number) => void
    setSenderData: (data: any) => void
}
export const Dialog: FC<DialogPropsType> = memo((props) => {
    const {dialogData} = props
    const avatar = dialogData.photos.small || defaultAvatar
    const dispatch = useAppDispatch()

    const changeIdHandler = () => {
        props.setSenderData(dialogData)
        props.changeId(dialogData.id)
    }
    const removeDialogHandler = () => {
        dispatch(unfollowTC(props.dialogData.id))

    }

    return (
        <div className={styles.dialogBox} onClick={changeIdHandler}>
            <Avatar src={avatar} width={"50px"}/>
            <div>{dialogData.userName}</div>
            <FontAwesomeIcon onClick={removeDialogHandler} className={styles.removeIcon} icon={faCircleXmark} />
        </div>
    );
});

