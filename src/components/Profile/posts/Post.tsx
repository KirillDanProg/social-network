import React, {FC} from "react";
import styles from "./Posts.module.css"

import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
library.add(fas)

type PostPropsType = {
    id: string
    postText: string
    likes: number
    img: string
    deletePost: (id: string) => void
}

export const Post: FC<PostPropsType> = (props) => {

    const deletePostHandler = () => {
        props.deletePost(props.id)
    }
    return (
        <div className={styles.postContainer}>
            <img className={styles.postImg} src={props.img} alt={"#"}/>
            <div className={styles.postText}>{props.postText}</div>
            <span className={styles.postLikes}>
                {props.likes}
            </span>
            <button onClick={deletePostHandler}>delete</button>
        </div>
    )
}