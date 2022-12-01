import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import {faSun} from "@fortawesome/free-solid-svg-icons/faSun";
import {faMoon} from "@fortawesome/free-solid-svg-icons/faMoon";
import {setAppThemeTC} from "../../redux/appReducer/app-reducer";


export const DarkModeSwitch = () => {
    const theme = useAppSelector(state => state.application.theme)
    const dispatch = useAppDispatch()
    const onClickHandler = () => {
        const changedTheme = theme === "dark" ? "light" : "dark"
        dispatch(setAppThemeTC(changedTheme))
    }
    return (
        <div onClick={onClickHandler}>
            {
                theme === "light" ?
                    <div>
                        <FontAwesomeIcon color={"#143068"} size={"2x"} icon={faMoon}/>
                    </div>
                    :
                    <FontAwesomeIcon color={"#fff900"} size={"2x"} icon={faSun}/>
            }
        </div>
    );
};


