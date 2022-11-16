import React, {ChangeEvent, useState} from 'react';
import {TextField} from "./superComponents/TextField";
import {useAppDispatch} from "../utils/hooks/reduxHooks";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {findUserTC} from "../redux/usersReducer/users-reducer";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {Flex} from "./superComponents/Flex";


export const Search = () => {

    const dispatch = useAppDispatch()


    const [value, setValue] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onClickHandler = () => {
        value.trim() && dispatch(findUserTC(value))
    }
    const onEnterHandler = (e: KeyboardEvent) => {
        if (e.key === "Enter" && value.trim()) {
            dispatch(findUserTC(value))
            setValue("")
        }
    }
    const resetField = () => {
        setValue("")
    }
    return (
        <Flex margin={"15px 0"} gap={"10px"}>
            <FontAwesomeIcon
                icon={faMagnifyingGlass} onClick={onClickHandler}/>

            <TextField
                border={"1px solid gray"}
                value={value}
                onChange={onChangeHandler}
                onKeyDown={onEnterHandler}
                onBlur={resetField}
            >

            </TextField>

            <FontAwesomeIcon icon={faXmark} onClick={resetField}/>
        </Flex>

    );
};

