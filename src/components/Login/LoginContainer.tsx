import React from "react"
import {Navigate} from "react-router-dom";
import {Login} from "./Login";
import {PositionedComponent} from "../../common/superComponents/PositionComponent";
import {useAppSelector} from "../../utils/hooks/reduxHooks";


export const LoginContainer = () => {

    const isAuth = useAppSelector(state => state.auth.login)

    return (
        <PositionedComponent center>
            {
                !!isAuth
                    ? <Navigate to={"/profile"}/>
                    : <Login/>

            }
        </PositionedComponent>
    )
}

