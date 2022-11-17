import React, {FC, useEffect} from "react";
import styles from "../Profile.module.css"
import EditableSpan from "../../../common/superComponents/EditableSpan";
import {Avatar} from "../../../common/superComponents/Avatar";
import defaultUserImg from "../../../assets/user.png"
import {getProfileDataTC} from "../../../redux/profileReducer/profile-reducer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/reduxHooks";
import {ProfileDescription} from "./ProfileDescription";
import {Button} from "../../../common/superComponents/Button";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Flex} from "../../../common/superComponents/Flex";
import {useNavigate} from "react-router-dom";
import {refreshDialogTC} from "../../../redux/dialogsReducer/dialogs-reducer";
import {faUserGroup} from "@fortawesome/free-solid-svg-icons/faUserGroup";
import {followTC} from "../../../redux/usersReducer/users-reducer";
import {StyledProfileInfoContainer} from "../admin/AdminProfile";


type ProfileInfoType = {
    idFromURL: number
}
export const GuestProfile: FC<ProfileInfoType> = (props) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    let profileData = useAppSelector(state => state.profile.profileData)
    const userPhoto = (profileData.photos && profileData.photos.large) || defaultUserImg
    const goToDialogsHandler = () => {
        navigate("/dialogs")
        dispatch(refreshDialogTC(profileData.userId))
    }

    const addToFriends = () => {
        dispatch(followTC(profileData.userId))
    }
    useEffect(() => {
        dispatch(getProfileDataTC(props.idFromURL))
    }, [])

    return (
        <StyledProfileInfoContainer>
            <Flex direction={"column"} gap={"10px"}>

                <Avatar width={"200px"}
                        profile={"true"}
                        shape={"square"}
                        src={userPhoto}
                />

                <div className={styles.name}>{profileData.fullName}</div>
                <Button onClick={addToFriends}>
                    Follow
                    <FontAwesomeIcon icon={faUserGroup}/>
                </Button>

                <Button onClick={goToDialogsHandler}>
                    Send message
                    <FontAwesomeIcon size={"lg"} icon={faEnvelope}/>
                </Button>

            </Flex>
            <>
                <UserStatus
                    value={profileData.status}
                />

                <ProfileDescription/>
            </>
        </StyledProfileInfoContainer>
    )
}


type UserStatusType = {
    value: string | null
    callback?: (value: string) => void
}
export const UserStatus: FC<UserStatusType> = (props) => {
    return (
        <div className={styles.status}>
            <EditableSpan value={props.value} callback={props.callback}/>
        </div>
    )
}

