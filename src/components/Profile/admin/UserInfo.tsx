import {ChangeEvent} from "react";
import {UserInfoForm} from "./UserInfoForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpFromBracket} from "@fortawesome/free-solid-svg-icons/faArrowUpFromBracket";
import {updateUserPhotoTC} from "../../../redux/accessRightsReducer/access-reducer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/reduxHooks";
import vk from "../../../assets/icons/vk.svg"
import inst from "../../../assets/icons/instagram.svg"
import github from "../../../assets/icons/github.svg"
import styles from "../Profile.module.css"
import styled from "styled-components";

const StyledUserInfo = styled.div`
  width: 100%;

  .media {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .icon img {
      width: 40px;
    }
  }

  .brandIcon img {
  }
`
export const UserInfo = (props: { fullName, editMode }) => {
    const dispatch = useAppDispatch()
    const updateUserPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.files && dispatch(updateUserPhotoTC(e.target.files[0]))
    }

    const {fullName, lookingForAJob, contacts} = useAppSelector(state => state.userAccess.personalData)

    return (
        <StyledUserInfo>
            {
                props.editMode
                    ? <>
                        <UserInfoForm userName={fullName}/>
                        <input type={"file"}
                               accept={"image/png, image/gif, image/jpeg"}
                               id={"upload-photo"}
                               style={{display: "none"}}
                               onChange={updateUserPhoto}
                        />
                        <span className={styles.editIcon}>
                                    <label htmlFor={"upload-photo"} style={{cursor: "pointer"}}>
                                        <FontAwesomeIcon size={"lg"}
                                                         icon={faArrowUpFromBracket}/>
                                    </label>
                    </span>
                    </>
                    :
                    <>
                        <div>{fullName}</div>
                        <div>{contacts && contacts.github}</div>
                        <div>{contacts && contacts.vk}</div>
                        <div>{contacts && contacts.instagram}</div>
                    </>
            }
        </StyledUserInfo>
    )
}

{/*<div className={"media"}>*/
}
{/*    <a className={"icon"} href={"https://google.com"} target={"_blank"}>*/
}
{/*        <img src={vk}/>*/
}
{/*    </a>*/
}
{/*    <a className={"icon"} href={"https://google.com"} target={"_blank"}>*/
}
{/*        <img src={github}/>*/
}
{/*    </a>*/
}
{/*    <a className={"icon"} href={"https://google.com"} target={"_blank"}>*/
}
{/*        <img src={inst}/>*/
}
{/*    </a>*/
}
{/*</div>*/
}