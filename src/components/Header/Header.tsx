import React from "react";
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../utils/hooks";
import {DarkModeSwitch, StyledHeader, Burger} from "../../common";
import styles from "./Header.module.css"
import {Logout} from "../Login/Logout";
import {Logo} from "./Logo";

export const Header = () => {

    const login = useAppSelector(state => state.auth.login)

    return (
        <StyledHeader className={styles.header}>
            <Logo/>
            <Burger/>
            {
                !!login
                    ? <Logout/>
                    : <NavLink to={"login"}>Login</NavLink>
            }
            <DarkModeSwitch/>
        </StyledHeader>
    )
}
