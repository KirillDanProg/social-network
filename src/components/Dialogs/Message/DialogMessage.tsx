import React, {FC} from "react";
import styles from "./DialogMessage.module.css";
import img from "../../../assets/images.jpeg"

type DialogMessagePropsType = {
    id: string
    message: string
    img: typeof img
}
export const DialogMessage: FC<DialogMessagePropsType> = (props) => {

    return (
        <div className={styles.messageContainer}>
            <img src={props.img}/>
            <div className={styles.message}>{props.message}</div>
        </div>
    )
}