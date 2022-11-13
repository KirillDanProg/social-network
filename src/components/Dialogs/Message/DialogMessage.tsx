import React from "react";
import styles from "./DialogMessage.module.css";


export const DialogMessage = ({children}) => {

    return (
        <div className={styles.messageContainer}>
            {children}
        </div>
    )
}