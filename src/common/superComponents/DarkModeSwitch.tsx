import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/reduxHooks";
import {setAppThemeTC} from "../../redux/appReducer/app-reducer";


export const ThemeSwitch = () => {
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
                        <FontAwesomeIcon color={"#143068"} size={"2x"} icon={["fas", "moon"]}/>
                    </div>
                    :
                    <FontAwesomeIcon color={"#fff900"} size={"2x"} icon={["fas", "sun"]}/>
            }
        </div>
    );
};


