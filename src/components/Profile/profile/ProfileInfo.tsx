import React, {FC} from "react";
import styles from "../Profile.module.css"
import {ProfileDataType} from "../../../types /ProfileType/ProfileTypes";
import EditableSpan from "../../../common/superComponents/EditableSpan";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";
import Loader from "../../../common/Loader/Loader";
import {Avatar} from "../../../common/superComponents/Avatar";
import defaultUserImg from "../../../assets/user.png"
import {updateUserPhotoTC} from "../../../redux/profileReducer/profile-reducer";
import {useAppDispatch} from "../../../utils/hooks/reduxHooks";


type ProfileInfoType = {
    profileData: ProfileDataType
    changeStatus: (status: string) => void
    authID: number
}
const ProfileInfo: FC<ProfileInfoType> = (props) => {

    const dispatch = useAppDispatch()

    const changeStatusHandler = (status: string) => {
        props.changeStatus(status)
    }
    if (props.authID && props.profileData.userId) {

        const {profileData} = props
        const photo = profileData.photos.large || defaultUserImg

        const uploadPhotoHandler = (file: File) => {
           dispatch(updateUserPhotoTC(file))
        }
        return (
            <div className={styles.profileInfo}>
                <Avatar width={"200px"}
                        profile={"true"}
                        shape={"square"}
                        src={photo}
                        uploadPhoto={uploadPhotoHandler}
                />
                <div>
                    <div className={styles.name}>{profileData.fullName}</div>
                    <UserStatus value={profileData.status} callback={changeStatusHandler}/>
                </div>
            </div>
        )
    } else {
        return <Loader/>
    }

}
type UserStatusType = {
    value: string | null
    callback: (value: string) => void
}
export const UserStatus: FC<UserStatusType> = (props) => {
    return (
        <div>
            <EditableSpan value={props.value} callback={props.callback}/>
        </div>
    )
}

export default WithAuthRedirect(ProfileInfo)