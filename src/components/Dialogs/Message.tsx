import {useAppSelector} from "../../utils/hooks/reduxHooks";
import {MessageContainer} from "../../common/superComponents/MessageContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./Dialogs.module.css";
import {Avatar} from "../../common/superComponents/Avatar";
import {DialogMessage} from "./Message/DialogMessage";
import React, {FC} from "react";
import {MessageType} from "../../types /DialogsType/DialogsTypes";
import {Indicator} from "../../common/superComponents/Indicator";

type MessagePropsType = {
    messageData: MessageType
    deleteMessage: (id: string) => void
}

export const Message: FC<MessagePropsType> = ({messageData, deleteMessage}) => {

    const profileMePhoto = useAppSelector(state => state.profile.profileData.photos.small)
    const viewed = messageData.viewed
    return (
        <MessageContainer key={messageData.id}>
            {!viewed && <Indicator/>}
            <FontAwesomeIcon icon={["fas", "trash"]}
                             className={styles.icon}
                             onClick={() => deleteMessage(messageData.id)}
            />
            <Avatar src={profileMePhoto} width={"50px"}/>
            <DialogMessage>
                <div style={{fontSize: "14px"}}> {messageData.body}</div>
            </DialogMessage>
        </MessageContainer>
    )
}