import React from "react";
import styles from "./Profile.module.css"
import ProfileInfoContainer from "./ProfileInfoContainer";
import PostsContainer from "./Posts/PostsContainer";

export const Profile = () => {

    return (
        <div className={styles.profile}>
            <ProfileInfoContainer/>
            <PostsContainer/>
        </div>
    )
}


