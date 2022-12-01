import React from 'react';
import styles from "./Login.module.css"
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from "react-hook-form";
import {Button, PositionedComponent, TextField} from "../../common";
import {useAppDispatch} from "../../utils/hooks";
import {loginTC} from "../../redux/authReducer/authReducer";

export type LoginDataType = {
    email: string,
    password: string,
};
const schema = yup.object({
    email: yup
        .string()
        .trim()
        .email()
        .required("Email is required"),
    password: yup
        .string()
        .trim()
        .required("Password is required")
        .min(6, "Password is too short - should be 6 chars minimum"),
});

export const Login = () => {
    const inputRef = React.createRef()
    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<LoginDataType> = data => {
        dispatch(loginTC(data))
    }
    const {register, handleSubmit, formState: {errors}} = useForm<LoginDataType>({
        resolver: yupResolver(schema)
    });

    return (
        <PositionedComponent center >
            {
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <TextField innerRef={inputRef}
                               {...register("email",
                                   {required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g})}  />

                    <TextField type={"password"}  {...register("password",
                        {required: true, minLength: 4})} />

                    {(errors.password || errors.email) && <span>Incorrect email or password (try to remove whitespaces)</span>}

                    <Button padding={"10px 25px"} type="submit">Login</Button>
                </form>
            }
        </PositionedComponent>)
};
