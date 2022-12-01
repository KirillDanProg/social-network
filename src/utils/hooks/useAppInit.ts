import {useEffect} from "react";
import {appInit} from "../../redux/appReducer/app-reducer";
import {useAppDispatch} from "./reduxHooks";

export const useAppInit = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(appInit())
    }, [])
}