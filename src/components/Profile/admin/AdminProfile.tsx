import React, {ChangeEvent, FC, memo} from "react";
import styles from "../Profile.module.css"
import EditableSpan from "../../../common/superComponents/EditableSpan";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";
import {Avatar} from "../../../common/superComponents/Avatar";
import defaultUserImg from "../../../assets/user.png"
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/reduxHooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Flex} from "../../../common/superComponents/Flex";
import {faArrowUpFromBracket} from "@fortawesome/free-solid-svg-icons/faArrowUpFromBracket";
import styled from "styled-components";
import {device} from "../../../common/mediaqueries/media";
import {changeUserStatusTC, updateUserPhotoTC} from "../../../redux/accessRightsReducer/access-reducer";


export const StyledProfileInfoContainer = styled.div`
  position: relative;
  max-width: 240px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto ;
  padding: 20px;
  @media ${device.mobileS} {
    padding: 5px;
  }
  @media ${device.tablet} {
    justify-content: flex-start;
  }
`
const AdminProfile = memo(() => {
    const dispatch = useAppDispatch()

    const fullName = useAppSelector(state => state.userAccess.personalData.fullName)
    const photo = useAppSelector(state => state.userAccess.personalData.photos.large)
    const status = useAppSelector(state => state.userAccess.personalData.status)

    const changeStatusHandler = (status: string) => {
        dispatch(changeUserStatusTC(status))
    }


    const updateUserPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.files && dispatch(updateUserPhotoTC(e.target.files[0]))
    }

    return (
        <StyledProfileInfoContainer>
            <Flex direction={"column"} gap={"10px"}>
                <div style={{position: "relative"}}>
                 <span className={styles.editIcon}>
                    <label htmlFor={"upload-photo"} style={{cursor: "pointer"}}>
                        <FontAwesomeIcon size={"lg"}
                                         icon={faArrowUpFromBracket}/>
                    </label>
                 </span>
                    <input type={"file"}
                           accept={"image/png, image/gif, image/jpeg"}
                           id={"upload-photo"}
                           style={{display: "none"}}
                           onChange={updateUserPhoto}
                    />
                    <Avatar width={"200px"}
                        profile={"true"}
                            shape={"square"}
                            src={photo}
                    />
                </div>
                <div className={styles.name}>{fullName}</div>
            </Flex>
                <UserStatus
                    value={status}
                    callback={changeStatusHandler}
                />
        </StyledProfileInfoContainer>
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