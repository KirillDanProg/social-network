import {FC} from "react";
import styled from "styled-components";
import {Avatar} from "../../common";
import {Message} from "./Message";
import DialogsForm from "./Message/DialogsForm";
import {addUserMessageTC, deleteUserMessageTC} from "../../redux/dialogsReducer/dialogs-reducer";
import {useAppDispatch, useAppSelector, useChatAutoScroll} from "../../utils/hooks";
import {ChatDataType} from "./Dialogs";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";

export type DialogWindowPropsType = {
    chatData: ChatDataType
    goBackToDialogs: (value: boolean) => void
}

const StyledDialogWindow = styled.div`
  position: relative;
  width: 100%;
  overflow-y: scroll;
  height: 90vh;

  .dialogHeader {
    position: sticky;
    top: 0;
    display: flex;
    gap: 10px;
    width: 100%;
    align-items: center;
    padding: 14px;
    background-color: ${props => props.theme.secondary};
    z-index: 2;
  }

  .dialogMessagesBox {
    padding-bottom: 50px;
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
export const DialogWindow: FC<DialogWindowPropsType> = ({chatData, goBackToDialogs}) => {
    const dispatch = useAppDispatch()
    const messages = useAppSelector(state => state.dialogs.messagesData)


// todo: refactoring last seen activity
    const lastActivityDate = new Date(chatData.lastUserActivity)
    const lastSeen = `last seen ${lastActivityDate.getDate()}
     ${lastActivityDate.toLocaleString('default', {month: 'long'})}
     ${lastActivityDate.toLocaleTimeString()}
     `
    const addMessageHandler = (message: string) => {
        dispatch(addUserMessageTC(chatData.id, message))
    }

    const deleteMessageHandler = (id: string) => {
        dispatch(deleteUserMessageTC(chatData.id, id))
    }

    const goToPreviousPage = () => {
        goBackToDialogs(false)
    }

    const ref = useChatAutoScroll(messages)

    return (
        <StyledDialogWindow>
            <div className={"dialogHeader"}>
                <FontAwesomeIcon icon={faArrowLeft} onClick={goToPreviousPage}/>
                <Avatar src={chatData.avatar} width={"40px"}/>
                <div className={"userInfo"}>
                    <span className={"userName"}>{chatData.userName}</span>
                    <span className={"userLastActivity"}>{lastSeen}</span>
                </div>
            </div>
            <div className={"dialogMessagesBox"} ref={ref}>
                {messages[String(chatData.id)].map(message => {
                    return <Message recipientPhoto={chatData.avatar}
                                    key={message.id}
                                    deleteMessage={deleteMessageHandler}
                                    messageData={message}/>
                })}
                <DialogsForm onSubmit={addMessageHandler}/>
            </div>


        </StyledDialogWindow>
    )
}