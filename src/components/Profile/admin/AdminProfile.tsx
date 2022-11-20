import React, { memo, useState} from "react";
import styles from "../Profile.module.css"
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";
import {Avatar} from "../../../common/superComponents/Avatar";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/reduxHooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Flex} from "../../../common/superComponents/Flex";
import styled from "styled-components";
import {device} from "../../../common/mediaqueries/media";
import {changeUserStatusTC} from "../../../redux/accessRightsReducer/access-reducer";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import {UserStatus} from "../userInfo/UserStatus";
import {UserInfoContainer} from "../userInfo/UserInfoContainer";
import defaultUserImg from "../../../assets/user.png";


export const StyledProfileInfoContainer = styled.div`
  max-width: 95%;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
  padding: 5px;
  @media ${device.tablet} {
    max-width: 300px;
    margin: 0;
  }
`
const AdminProfile = memo(() => {
    const dispatch = useAppDispatch()

    const fullName = useAppSelector(state => state.userAccess.personalData.fullName)
    const photo = useAppSelector(state => state.userAccess.personalData.photos.large)  || defaultUserImg
    const status = useAppSelector(state => state.userAccess.personalData.status)
    const [editUserInfoMode, setEditMode] = useState(false)

    const changeStatusHandler = (status: string) => {
        dispatch(changeUserStatusTC(status))
    }

    const editUserInfoHandler = () => {
        setEditMode(!editUserInfoMode)
    }

    return (
        <StyledProfileInfoContainer>
            <Flex direction={"column"} gap={"10px"}>
                <div style={{position: "relative"}}>
                    <Avatar width={"200px"}
                            profile={"true"}
                            shape={"square"}
                            src={photo}
                    />
                    <span className={styles.editIcon} onClick={editUserInfoHandler}>
                      <FontAwesomeIcon icon={faPenToSquare}/>
                  </span>
                </div>
                <div className={styles.name}>{fullName}</div>
            </Flex>
            <UserStatus
                value={status}
                callback={changeStatusHandler}
            />

            <UserInfoContainer fullName={fullName}
                               editMode={editUserInfoMode}
                               setEditMode={editUserInfoHandler}
            />

        </StyledProfileInfoContainer>
    )
})


export default WithAuthRedirect(AdminProfile)