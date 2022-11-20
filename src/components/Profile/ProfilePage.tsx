import React, {FC, memo} from "react";
import AdminProfile from "./admin/AdminProfile";
import {GuestProfile} from "./guest/GuestProfile";


type ProfilePagePropsType = {
    idFromURL?: number
}

export const ProfilePage: FC<ProfilePagePropsType> = memo(({idFromURL}) => {
    return (
        <div>
            {
                idFromURL ?
                    <GuestProfile idFromURL={idFromURL}/>
                    :
                    <AdminProfile/>
            }

        </div>
    )
})

