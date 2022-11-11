import React, {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import styles from "./Login.module.css"

type LoginPropsType = {
    login: string | null
    authorization: (data: LoginDataType) => void
}
const Login: FC<LoginPropsType> = (props) => {
    return (
        <div className={styles.loginContainer}>
            <LoginForm {...props}/>
        </div>
    );
};


export type LoginDataType = {
    login: string,
    password: string,
    rememberMe: boolean
};

export const LoginForm: FC<LoginPropsType> = (props) => {
    const onSubmit: SubmitHandler<LoginDataType> = data => {
        props.authorization(data)
    }
    const {register, handleSubmit, formState: {errors}} = useForm<LoginDataType>();

    return (
        <>
            {
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <input type={"text"} {...register("login", {required: true})}  />

                    <input type={"password"} {...register("password", {required: true})} />

                    {errors.password || errors.login && <span>This field is required</span>}

                    <input type="submit"/>
                </form>
            }
        </>

    )
}

export default Login;