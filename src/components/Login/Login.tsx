import React, {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import styles from "./Login.module.css"
import {Button} from "../../common/superComponents/Button";
import {PositionedComponent} from "../../common/superComponents/PositionComponent";
import {TextField} from "../../common/superComponents/TextField";

type LoginPropsType = {
    login: string | null
    authorization: (data: LoginDataType) => void
}
export type LoginDataType = {
    email: string,
    password: string,
    rememberMe: boolean
};
const schema = yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password is too short - should be 6 chars minimum"),
}).required();

export const Login: FC<LoginPropsType> = (props) => {
    const inputRef = React.createRef()
    const onSubmit: SubmitHandler<LoginDataType> = data => {
        props.authorization(data)
    }
    const {register, handleSubmit, formState: {errors}} = useForm<LoginDataType>({
        resolver: yupResolver(schema)
    });

    return (
        <PositionedComponent center className={styles.loginContainer}>
            {
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <TextField innerRef={inputRef}
                               {...register("email",
                                   {required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g})}  />

                    <TextField type={"password"}  {...register("password",
                        {required: true, minLength: 4})} />

                    {errors.password || errors.email && <span>This field is required</span>}

                    <Button type="submit">Login</Button>
                </form>
            }
        </PositionedComponent>)
};

