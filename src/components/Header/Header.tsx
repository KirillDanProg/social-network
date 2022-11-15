import React, {FC} from "react";
import styles from "./Header.module.css"
import {initialAuthStateType} from "../../redux/authReducer/authReducer";
import {NavLink} from "react-router-dom";
import LogoutContainer from "../Login/Logout";
import {ThemeSwitch} from "../../common/superComponents/DarkModeSwitch";
import {StyledHeaderContainer} from "../../common/superComponents/StyledHeader";
import styled from "styled-components";
import {device} from "../../common/mediaqueries/media";
import {Burger} from "../../common/superComponents/Burger";


type HeaderPropsTypeInner = {
    authData: initialAuthStateType
}

export const Header: FC<HeaderPropsTypeInner> = (props) => {

    return (
        <StyledHeaderContainer className={styles.header}>
            <Logo/>
            <Burger/>
            {
                props.authData.login ? props.authData.login && <LogoutContainer/> :
                    <NavLink to={"login"}>Login</NavLink>
            }
            <ThemeSwitch/>
        </StyledHeaderContainer>
    )
}

const StyledLogo = styled.span`
  display: none;
  @media ${device.tablet} {
    display: block;
  }
`
const Logo = () => {
    return (
        <StyledLogo className={styles.logo}>VN</StyledLogo>
    )
}