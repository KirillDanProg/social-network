import React, {memo, useEffect, useState} from "react";
import styled from "styled-components";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/reduxHooks";
import {device} from "../../../common/mediaqueries/media";
import {Flex, Avatar} from "../../../common";
import {changeUserStatusTC, setAdminAccessRights} from "../../../redux/accessRightsReducer/access-reducer";
import {UserStatus} from "../userInfo/UserStatus";
import {UserInfoContainer} from "../userInfo/UserInfoContainer";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import defaultUserImg from "../../../assets/user.png";
import styles from "../Profile.module.css"


export const StyledProfileInfoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: start;
  justify-content: center;
  margin: auto;
  padding: 5px;
  @media ${device.tablet} {
    justify-content: start;
    margin: 0;
  }
`
const AdminProfile = memo(() => {
    const dispatch = useAppDispatch()

    const adminId = useAppSelector(state => state.auth.id)

    const fullName = useAppSelector(state => state.userAccess.personalData.fullName)
    //todo fix img update
    const photo = useAppSelector(state => state.userAccess.personalData.photos?.large) || defaultUserImg
    const status = useAppSelector(state => state.userAccess.personalData.status)

    const [editUserInfoMode, setEditMode] = useState(false)

    const [photoPreview, setPhotoPreview] = useState(null)

    const changeStatusHandler = (status: string) => {
        dispatch(changeUserStatusTC(status))
    }

    const editUserInfoHandler = () => {
        setEditMode(!editUserInfoMode)
    }

    useEffect(() => {
        adminId && dispatch(setAdminAccessRights(adminId))
    }, [])

    return (
        <StyledProfileInfoContainer>
            <Flex direction={"column"} gap={"10px"}>
                <div style={{position: "relative"}}>
                    <Avatar width={"200px"}
                            profile={"true"}
                            shape={"square"}
                            src={photoPreview ? JSON.stringify(photoPreview) : photo}
                    />
                    <span className={styles.editIcon} onClick={editUserInfoHandler}>
                      <FontAwesomeIcon icon={faPenToSquare}/>
                  </span>
                </div>
                <div className={styles.name}>{fullName}</div>
                <UserStatus
                    value={status}
                    callback={changeStatusHandler}
                />
            </Flex>

            <UserInfoContainer fullName={fullName}
                               editMode={editUserInfoMode}
                               setEditMode={editUserInfoHandler}
                               setPhotoPreview={setPhotoPreview}
            />
        </StyledProfileInfoContainer>
    )
})


export default WithAuthRedirect(AdminProfile)