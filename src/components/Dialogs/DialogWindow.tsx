import {Avatar} from "../../common/superComponents/Avatar";
import {Message} from "./Message";
import DialogsForm from "./Message/DialogsForm";
import styled from "styled-components";
import {FC, useEffect, useRef} from "react";
import {addUserMessageTC, deleteUserMessageTC} from "../../redux/dialogsReducer/dialogs-reducer";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/reduxHooks";
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
    const date = new Date(chatData.lastUserActivity)
    const dispatch = useAppDispatch()
    const messages = useAppSelector(state => state.dialogs.messagesData)

    const ref: any = useRef()

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView(
                {
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest'
                })
        }
    })

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

    const goToPreviousPage = () => {
        goBackToDialogs(false)
    }
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
            <div className={"dialogMessagesBox"} ref={ref as any}>
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