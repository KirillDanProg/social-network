import React from "react";
import styles from "./Profile.module.css"
import ProfileInfoContainer from "./ProfileInfoContainer";
import PostsContainer from "./posts/PostsContainer";

export const ProfilePage = () => {

    return (
        <div className={styles.profile}>
            <ProfileInfoContainer/>
            <PostsContainer/>
        </div>
    )
}


