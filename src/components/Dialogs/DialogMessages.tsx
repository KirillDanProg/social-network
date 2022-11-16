import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../utils/hooks/reduxHooks";
import {deleteUserMessageTC, DialogType, fetchMessagesTC} from "../../redux/dialogsReducer/dialogs-reducer";
import {Message} from "./Message";


export const DialogMessages = (props: { data: DialogType }) => {

    const dispatch = useAppDispatch()
    const sandedMessages = useAppSelector(state => state.dialogs.messagesData[props.data.id + ""])


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
                   <Message key={m.id} messageData={m} deleteMessage={deleteMessageHandler}/>
                )
            })}
        </div>
    );
};

