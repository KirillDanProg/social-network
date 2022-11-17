import React, {FC, memo} from 'react';
import {DialogType} from "../../redux/dialogsReducer/dialogs-reducer";
import defaultAvatar from "../../assets/user.png"
import {Avatar} from "../../common/superComponents/Avatar";
import styles from "./Dialogs.module.css"
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons/faCircleXmark";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/reduxHooks";
import {unfollowTC} from "../../redux/usersReducer/users-reducer";
import styled from "styled-components";

type DialogPropsType = {
    dialogData: DialogType
    goToDialogWindow: (chatData: any) => void
}

const StyledDialog = styled.div`
  .userName {
    font-size: 18px;
  }

  .messageText {
    color: ${props => props.theme.subTextColor}
  }
`
export const Dialog: FC<DialogPropsType> = memo((props) => {
    const {dialogData} = props
    const avatar = dialogData.photos.small || defaultAvatar
    const dispatch = useAppDispatch()
    const messages = useAppSelector(state => state.dialogs.messagesData)

    const messagesIndex = String(props.dialogData.id)
    let lastMessage
    if (messages[messagesIndex].length > 0) {
        lastMessage = messages[messagesIndex][messages[messagesIndex].length - 1]
    }

    const goToDialogWindowHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        const chatData = {
            avatar,
            userName: dialogData.userName,
            id: dialogData.id,
            lastUserActivity: dialogData.lastUserActivityDate
        }
        props.goToDialogWindow(chatData)
    }
    const removeDialogHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        dispatch(unfollowTC(props.dialogData.id))
    }

    return (
        <StyledDialog className={styles.dialogBox} onClick={goToDialogWindowHandler}>

            <div onClick={removeDialogHandler}
                 className={styles.removeIcon}
            >
                <FontAwesomeIcon
                    icon={faCircleXmark}/>
            </div>


            <div className={styles.userPreview}>
                <Avatar src={avatar} width={"50px"}/>
            </div>

            <div className={styles.messageContainer}>
                <span className={"userName"}>{dialogData.userName}</span>
                <div className={"messageText"}>
                    {lastMessage && lastMessage.body}
                </div>
            </div>
        </StyledDialog>
    );
});

