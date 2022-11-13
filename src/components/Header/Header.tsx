import React, {FC} from "react";
import styles from "./Header.module.css"
import {initialAuthStateType} from "../../redux/authReducer/authReducer";
import {NavLink} from "react-router-dom";
import LogoutContainer from "../Login/Logout";
import {ThemeSwitch} from "../../common/superComponents/DarkModeSwitch";
import {StyledHeaderContainer} from "../../common/superComponents/StyledHeader";


type HeaderPropsTypeInner = {
    authData: initialAuthStateType
}

export const Header: FC<HeaderPropsTypeInner> = (props) => {

    return (
        <StyledHeaderContainer className={styles.header}>
            <Logo/>
            {
                props.authData.login ? props.authData.login && <LogoutContainer/> :  <NavLink to={"login"}>Login</NavLink>
            }
            <ThemeSwitch/>
        </StyledHeaderContainer>
    )
}

const Logo = () => {
    return (
        <span className={styles.logo}>VN</span>
    )
}