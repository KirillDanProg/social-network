import styles from "../Profile.module.css";
import EditableSpan from "../../../common/superComponents/EditableSpan";
import {FC} from "react";

export type UserStatusType = {
    value: string | null
    callback: (value: string) => void
}

export const UserStatus: FC<UserStatusType> = (props) => {
    return (
        <div className={styles.status}>
            <EditableSpan value={props.value} callback={props.callback}/>
        </div>
    )
}