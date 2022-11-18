import React from "react";
import styles from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {Logout} from "../Login/Logout";
import {ThemeSwitch} from "../../common/superComponents/DarkModeSwitch";
import {StyledHeaderContainer} from "../../common/superComponents/StyledHeader";
import {Burger} from "../../common/superComponents/Burger";
import {Logo} from "./Logo";
import {useAppSelector} from "../../common/hooks";

export const Header = () => {

    const login = useAppSelector(state => state.auth.login)

    return (
        <StyledHeaderContainer className={styles.header}>
            <Logo/>
            <Burger/>
            {
                !!login
                    ? <Logout/>
                    : <NavLink to={"login"}>Login</NavLink>
            }
            <ThemeSwitch/>
        </StyledHeaderContainer>
    )
}

