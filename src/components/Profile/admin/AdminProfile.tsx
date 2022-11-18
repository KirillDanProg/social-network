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
import {UserStatus} from "./UserStatus";
import {UserInfo} from "./UserInfo";


export const StyledProfileInfoContainer = styled.div`
  position: relative;
  max-width: 240px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
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

            <UserInfo fullName={fullName} editMode={editUserInfoMode}/>

        </StyledProfileInfoContainer>
    )
})


export default WithAuthRedirect(AdminProfile)