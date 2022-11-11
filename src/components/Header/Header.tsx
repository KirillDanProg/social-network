import React, {FC} from "react";
import styles from "./Header.module.css"
import ThemeToggle from "./ThemeToggle";
import {initialAuthStateType} from "../../redux/authReducer/authReducer";
import {NavLink} from "react-router-dom";
import LogoutContainer from "../Login/Logout";


type HeaderPropsTypeInner = {
    authData: initialAuthStateType
}
export const Header: FC<HeaderPropsTypeInner> = (props) => {

    const [darkMode, setDarkMode] = React.useState(false)

    const darkModeHandler = (darkMode: boolean) => {
        setDarkMode(darkMode)
    }
    return (
        <div className={styles.header}>
            <Logo/>

            {
                props.authData.login ? props.authData.login && <LogoutContainer/> :  <NavLink to={"login"}>Login</NavLink>
            }


            <ThemeToggle darkMode={darkMode} setDarkMode={darkModeHandler}/>
        </div>
    )
}
const Logo = () => {
    return (
        <span className={styles.logo}>VN</span>
    )
}