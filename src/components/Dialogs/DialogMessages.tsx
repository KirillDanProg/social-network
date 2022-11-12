import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../utils/hooks/reduxHooks";
import {fetchMessagesTC} from "../../redux/dialogsReducer/dialogs-reducer";

export const DialogMessages = (props: { id: number | null }) => {

    const dispatch = useAppDispatch()
    const messages = useAppSelector(state => state.dialogs.messagesData[props.id + ""])

    useEffect(() => {
        if (props.id) {
            dispatch(fetchMessagesTC(props.id))
        }
    }, [props.id])

    return (
        <div>
            {messages?.map(m => <div key={m.id}>{m.body}</div>)}
        </div>
    );
};

