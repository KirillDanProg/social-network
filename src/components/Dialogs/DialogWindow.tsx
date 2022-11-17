import {Avatar} from "../../common/superComponents/Avatar";
import {Message} from "./Message";
import DialogsForm from "./Message/DialogsForm";
import styled from "styled-components";
import {FC} from "react";
import {addUserMessageTC, deleteUserMessageTC} from "../../redux/dialogsReducer/dialogs-reducer";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/reduxHooks";
import {ChatDataType} from "./Dialogs";

export type DialogWindowPropsType = {
    chatData: ChatDataType
}

const StyledDialogWindow = styled.div`
  width: 100%;

  .dialogHeader {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
    padding: 14px;
  }

  .userInfo {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .userLastActivity {
      font-size: 12px;
      color: ${props => props.theme.subTextColor}
    }
  }
`
export const DialogWindow: FC<DialogWindowPropsType> = ({chatData}) => {
    const date = new Date(chatData.lastUserActivity)
    const dispatch = useAppDispatch()
    const messages = useAppSelector(state => state.dialogs.messagesData)

    const lastSeen = `last seen ${date.getDate()}
     ${date.toLocaleString('default', {month: 'long'})}
     ${date.toLocaleTimeString()}
     `
    const addMessageHandler = (message: string) => {
        dispatch(addUserMessageTC(chatData.id, message))
    }

    const deleteMessageHandler = (id: string) => {
        dispatch(deleteUserMessageTC(chatData.id, id))
    }

    return (
        <StyledDialogWindow>
            <div className={"dialogHeader"}>
                <Avatar src={chatData.avatar} width={"40px"}/>
                <div className={"userInfo"}>
                    <span className={"userName"}>{chatData.userName}</span>
                    <span className={"userLastActivity"}>{lastSeen}</span>
                </div>
            </div>
            <div>
                {messages[String(chatData.id)].map(message => {
                    return <Message key={message.id}
                                    deleteMessage={deleteMessageHandler}
                                    messageData={message}/>
                })}
            </div>
            <DialogsForm onSubmit={addMessageHandler}/>
        </StyledDialogWindow>
    )
}