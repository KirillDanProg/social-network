import {ChangeEvent, FC} from "react";
import {updateUserPhotoTC} from "../../../redux/accessRightsReducer/access-reducer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/reduxHooks";
import styled from "styled-components";
import {UserInfoEdit} from "./UserInfoEdit";
import {UserInfo} from "./UserInfo";

const StyledUserInfo = styled.div`
  .userInfoContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    margin-top: 20px;

    .info-item {
      align-content: center;
      padding: 4px;
      border-bottom: 1px solid ${props => props.theme.color};
    }

    .media-icons {
      display: flex;
      align-items: center;
      gap: 10px;

      .icon {
        width: 50px;
      }

      .github {
        background-color: white;
        border-radius: 50%;
        border: 2px solid white;
      }
    }
  }

`
type UserInfoType = {
    fullName: string
    editMode: boolean
    setEditMode: () => void
}
export const UserInfoContainer: FC<UserInfoType> = ({editMode, setEditMode}) => {

    const dispatch = useAppDispatch()

    const userInfo = useAppSelector(state => state.userAccess.personalData)

    const updateUserPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.files && dispatch(updateUserPhotoTC(e.target.files[0]))
    }


    return (
        <StyledUserInfo>
            {
                editMode
                    ? <UserInfoEdit userInfo={userInfo}
                                    setEditMode={setEditMode}
                                    updatePhoto={updateUserPhoto}
                    />
                    : <UserInfo userInfo={userInfo}/>
            }
        </StyledUserInfo>
    )
}

