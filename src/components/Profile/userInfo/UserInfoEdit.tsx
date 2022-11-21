import {UserInfoForm} from "./UserInfoForm";
import styles from "../Profile.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpFromBracket} from "@fortawesome/free-solid-svg-icons/faArrowUpFromBracket";
import {ChangeEvent, FC} from "react";
import {ProfileDataType} from "../../../types /ProfileType/ProfileTypes";
import {Flex} from "../../../common/superComponents/Flex";

type UserInfoEditPropsType = {
    userInfo: ProfileDataType
    updatePhoto: (e: ChangeEvent<HTMLInputElement>) => void
    setEditMode: () => void
}
export const UserInfoEdit: FC<UserInfoEditPropsType> = ({updatePhoto, userInfo, setEditMode}) => {

    return (
        <Flex direction={"column"}>
            <span className={styles.editIcon}>
                <label htmlFor={"upload-photo"} style={{cursor: "pointer"}}>
                    <span>Update photo </span>
                    <FontAwesomeIcon size={"lg"} icon={faArrowUpFromBracket}/>
                </label>
            </span>

            <UserInfoForm setEditMode={setEditMode}
                          userInfo={userInfo}/>

            <input type={"file"}
                   accept={"image/png, image/jpeg"}
                   id={"upload-photo"}
                   style={{display: "none"}}
                   onChange={updatePhoto}
            />
        </Flex>
    )
}
