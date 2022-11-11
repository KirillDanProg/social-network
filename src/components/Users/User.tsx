import React, {FC} from "react";
import styles from "./Users.module.css";
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../utils/hooks/reduxHooks";
import {followTC, unfollowTC} from "../../redux/usersReducer/users-reducer";
import {Avatar} from "../Avatar";
import userAvatar from "../../assets/user.png"


type UserPropsType = {
    userId: number
    fullName: string
    photos: { small: string | null, large: string | null }
    followed: boolean
    status?: string | null
    disabled?: number | null
}

export const User: FC<UserPropsType> = (props) => {
    const dispatch = useAppDispatch()
    const disabled = props.disabled === props.userId

    const followHandler = () => {
         dispatch(followTC(props.userId))
    }
    const unfollowHandler = () => {
         dispatch(unfollowTC(props.userId))
    }
    return (
        <div className={styles.userBox}>
            <NavLink to={`/profile/${props.userId}`}>
               <Avatar src={props.photos.small || userAvatar }/>
            </NavLink>
            <div>{props.fullName}</div>
            <div>{props.status}</div>
            <button
                disabled={disabled}
                className={disabled ? styles.disabled : ""}
                onClick={props.followed ? unfollowHandler : followHandler}
            >
                {props.followed ? "Unfollow" : "Follow"}
            </button>
        </div>
    )
}