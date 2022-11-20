import {useAppSelector} from "../../utils/hooks/reduxHooks";
import {MessageContainer} from "../../common/superComponents/MessageContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./Dialogs.module.css";
import {Avatar} from "../../common/superComponents/Avatar";
import {DialogMessage} from "./Message/DialogMessage";
import React, {FC} from "react";
import {MessageType} from "../../types /DialogsType/DialogsTypes";
import {Indicator} from "../../common/superComponents/Indicator";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";

type MessagePropsType = {
    messageData: MessageType
    deleteMessage: (id: string) => void
    recipientPhoto: string
}

export const Message: FC<MessagePropsType> = ({messageData, deleteMessage, recipientPhoto}) => {

    const ownerId = useAppSelector(state => state.userAccess.personalData.userId)
    //owner avatar
    const profileMePhoto = useAppSelector(state => state.userAccess.personalData.photos.small)
    // if not owner photo than recipient photo
    const avatar = messageData.senderId !== ownerId ? recipientPhoto : profileMePhoto

    const viewed = messageData.viewed
    return (
        <MessageContainer recipientMessage={messageData.senderId !== ownerId}
                          key={messageData.id}>
            {!viewed && <Indicator/>}
            <FontAwesomeIcon icon={faTrash}
                             className={styles.icon}
                             onClick={() => deleteMessage(messageData.id)}
            />
            <Avatar src={avatar} width={"50px"}/>
            <DialogMessage recipientMessage={messageData.senderId !== ownerId}>
                <div style={{fontSize: "14px"}}> {messageData.body}</div>
            </DialogMessage>
        </MessageContainer>
    )
}