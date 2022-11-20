import React from 'react';
import {logoutTC} from "../../redux/authReducer/authReducer";
import {useAppDispatch} from "../../utils/hooks/reduxHooks";
import {Button} from "../../common/superComponents/Button";


export const Logout = () => {

    const dispatch = useAppDispatch()

    const onClickHandler = () => {
       dispatch(logoutTC())
    }
    return (
        <Button padding={"8px 20px"} onClick={onClickHandler}>Logout</Button>
    );
};

