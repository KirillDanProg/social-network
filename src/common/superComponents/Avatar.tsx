import React, {ChangeEvent} from 'react';
import styled from "styled-components";
import styles from "../../components/Profile/Profile.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const StyledAvatar = styled.img<any>`
  width: ${props => props.width || "60px"};
  border-radius: ${props => props.shape === "square" ?
          "20px"
          : "50%"
  };
  user-select: none;
`

export const Avatar = (props) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      e.target.files && props.uploadPhoto(e.target.files[0])
    }
    return (
        <div style={{position: "relative"}}>
                <input type={"file"}
                       accept={"image/png, image/gif, image/jpeg"}
                       id={"upload-photo"}
                       style={{display: "none"}}
                       onChange={onChangeHandler}
                />

            {
                props.profile &&
                <span className={styles.editIcon}>
                    <label htmlFor={"upload-photo"} style={{cursor: "pointer"}}>
                        <FontAwesomeIcon size={"lg"}
                                         icon={["fas", "arrow-up-from-bracket"]}/>
                    </label>

                </span>
            }
            <StyledAvatar {...props}/>
        </div>
    );
};

