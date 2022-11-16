import React, {FC, memo} from "react";
import styles from "../Profile.module.css"
import EditableSpan from "../../../common/superComponents/EditableSpan";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";
import {Avatar} from "../../../common/superComponents/Avatar";
import defaultUserImg from "../../../assets/user.png"
import {changeUserStatusTC, updateUserPhotoTC} from "../../../redux/profileReducer/profile-reducer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/reduxHooks";
import {Button} from "../../../common/superComponents/Button";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Flex} from "../../../common/superComponents/Flex";
import {useNavigate} from "react-router-dom";
import {refreshDialogTC} from "../../../redux/dialogsReducer/dialogs-reducer";


const AdminProfile = memo(() => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const adminProfileData = useAppSelector(state => state.userAccess.personalData)

    const changeStatusHandler = (status: string) => {
        dispatch(changeUserStatusTC(status))
    }
    const goToDialogsHandler = () => {
        navigate("/dialogs")
        dispatch(refreshDialogTC(adminProfileData.userId))
    }

    const photo = adminProfileData.photos.large || defaultUserImg

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

                <div className={styles.name}>{adminProfileData.fullName}</div>

                <Button onClick={goToDialogsHandler}>
                    Send message
                    <FontAwesomeIcon size={"lg"} icon={faEnvelope}/>
                </Button>
            </Flex>
            <>
                <UserStatus
                    value={adminProfileData.status}
                    callback={changeStatusHandler}
                />

            </>
        </div>
    )
})


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

export default WithAuthRedirect(AdminProfile)