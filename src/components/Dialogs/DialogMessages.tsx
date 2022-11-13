import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../utils/hooks/reduxHooks";
import {deleteUserMessageTC, DialogType, fetchMessagesTC} from "../../redux/dialogsReducer/dialogs-reducer";
import {DialogMessage} from "./Message/DialogMessage";
import {Avatar} from "../../common/superComponents/Avatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {MessageContainer} from "../../common/superComponents/MessageContainer";
import styles from "./Dialogs.module.css"


export const DialogMessages = (props: { data: DialogType }) => {

    const dispatch = useAppDispatch()
    const sandedMessages = useAppSelector(state => state.dialogs.messagesData[props.data.id + ""])
    const profileMePhoto = useAppSelector(state => state.profile.profileData.photos.small)

    const deleteMessageHandler = (id: string) => {
        dispatch(deleteUserMessageTC(props.data.id, id))
    }

    useEffect(() => {
        if (props.data.id) {
            dispatch(fetchMessagesTC(props.data.id))
        }
    }, [props.data.id])

    return (
        <div>
            {sandedMessages?.map(m => {
                return (
                    <MessageContainer key={m.id}>
                        <FontAwesomeIcon icon={["fas", "trash"]}
                                         className={styles.icon}
                                         onClick={() => deleteMessageHandler(m.id)}
                        />
                        <Avatar src={profileMePhoto} width={"50px"}/>
                        <DialogMessage>
                            <div style={{fontSize: "14px"}}> {m.body}</div>
                        </DialogMessage>
                    </MessageContainer>

                )
            })}
        </div>
    );
};

