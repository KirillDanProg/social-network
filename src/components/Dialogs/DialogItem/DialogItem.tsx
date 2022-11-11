import React, {FC} from "react";
import styles from "./DialogItem.module.css"
import img from "../../../assets/images.jpeg";

type DialogItemPropsType = {
    id: string
    name: string
    img: typeof img
}

export const DialogItem: FC<DialogItemPropsType> = (props) => {
    return (
        <div className={styles.dialogsItemContainer}>
            <img className={styles.dialogsImg} src={props.img}/>
            <div>{props.name}</div>
        </div>
    )
}