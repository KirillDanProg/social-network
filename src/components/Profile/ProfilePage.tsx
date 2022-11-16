import React, {FC, memo} from "react";
import styles from "./Profile.module.css"
import AdminProfile from "./admin/AdminProfile";
import {GuestProfile} from "./guest/GuestProfile";


type ProfilePagePropsType = {
    idFromURL?: number
}

export const ProfilePage: FC<ProfilePagePropsType> = memo(({idFromURL}) => {
    return (
        <div className={styles.profile}>
            {
                idFromURL ?
                    <GuestProfile idFromURL={idFromURL}/>
                    :
                    <AdminProfile/>
            }

        </div>
    )
})

