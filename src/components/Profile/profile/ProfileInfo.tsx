import React, {FC} from "react";
import styles from "../Profile.module.css"
import {ProfileDataType} from "../../../types /ProfileType/ProfileTypes";
import EditableSpan from "../../../common/superComponents/EditableSpan";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";
import Loader from "../../../common/Loader/Loader";
import {Avatar} from "../../../common/superComponents/Avatar";
import defaultUserImg from "../../../assets/user.png"
import {updateUserPhotoTC} from "../../../redux/profileReducer/profile-reducer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/reduxHooks";
import {ProfileDescription} from "./ProfileDescription";
import {Button} from "../../../common/superComponents/Button";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Flex} from "../../../common/superComponents/Flex";
import {useNavigate} from "react-router-dom";
import {refreshDialogTC} from "../../../redux/dialogsReducer/dialogs-reducer";


type ProfileInfoType = {
    profileData: ProfileDataType
    changeStatus: (status: string) => void
    authID: number
}
const ProfileInfo: FC<ProfileInfoType> = (props) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const profileId = useAppSelector(state => state.profile.profileData.userId)

    const changeStatusHandler = (status: string) => {
        props.changeStatus(status)
    }
    const sendMessageHandler = () => {
        navigate("/dialogs")
        dispatch(refreshDialogTC(profileId))
    }
    if (props.authID && props.profileData.userId) {

        const {profileData} = props
        const photo = profileData.photos.large || defaultUserImg

        const uploadPhotoHandler = (file: File) => {
            dispatch(updateUserPhotoTC(file))
        }
        return (
            <div className={styles.profileInfo}>
                <Flex direction={"column"} gap={"10px"}>

                    <Avatar width={"200px"}
                            profile={"true"}
                            shape={"square"}
                            src={photo}
                            uploadPhoto={uploadPhotoHandler}
                    />

                    <div className={styles.name}>{profileData.fullName}</div>
                    <Button>
                        Add to friends
                        <FontAwesomeIcon icon={["fas", "user-group"]} />
                    </Button>

                    <Button onClick={sendMessageHandler}>
                        Send message
                        <FontAwesomeIcon size={"lg"} icon={faEnvelope} />
                    </Button>
                </Flex>
                <>
                    <UserStatus
                        value={profileData.status}
                        callback={changeStatusHandler}
                    />

                    <ProfileDescription/>
                </>
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
        <div className={styles.status}>
            <EditableSpan value={props.value} callback={props.callback}/>
        </div>
    )
}

export default WithAuthRedirect(ProfileInfo)