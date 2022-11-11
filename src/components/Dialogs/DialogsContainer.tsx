import React from "react";
// import {DialogType} from "../../redux/dialogsReducer/dialogs-reducer";
// import {Dialogs} from "./Dialogs";
// import {connect} from "react-redux";
// import {compose, Dispatch} from "redux";
// import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
// import {RootState} from "../../redux/store";
// import { MessageDataType} from "../../types /DialogsType/DialogsTypes";
//
// type MapStateToPropsType = {
//     dialogs: {
//         dialogsData: Array<DialogType>
//         messagesData: Array<MessageDataType>
//         // messageText: string
//     }
// }
// const mapStateToProps = (state: RootState): MapStateToPropsType => {
//     return {
//         dialogs: state.dialogs
//     }
// }
// type MapDispatchToPropsType = {
//     addMessage: (message: string) => void
// }
// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
//     return {
//         addMessage: (message: string) => {
//             dispatch(addMessageAC(message))
//         }
//     }
// }
//
// export const DialogsContainer = compose<React.ComponentType>(
//     connect(mapStateToProps, mapDispatchToProps),
//     WithAuthRedirect,
// )(Dialogs)
