import React, {FC} from 'react';
import {DialogType} from "../../redux/dialogsReducer/dialogs-reducer";
import defaultAvatar from "../../assets/user.png"
import {Avatar} from "../Avatar";

type DialogPropsType = {
    dialogData: DialogType
}
export const Dialog: FC<DialogPropsType> = (props) => {
    const {dialogData} = props
    const avatar = dialogData.photos.small || defaultAvatar

    return (
        <div>
            <Avatar src={avatar}/>
            <div>{dialogData.userName}</div>

        </div>
    );
};

