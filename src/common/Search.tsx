import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch} from "../utils/hooks";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {findUserTC} from "../redux/usersReducer/users-reducer";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {Flex, Button, TextField} from "./superComponents";

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
            <Button onClick={onClickHandler}>
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}/>
            </Button>

            <TextField
                border={"1px solid gray"}
                value={value}
                onChange={onChangeHandler}
                onKeyDown={onEnterHandler}
            />
            <FontAwesomeIcon icon={faXmark} onClick={resetField}/>
        </Flex>
    );
};
