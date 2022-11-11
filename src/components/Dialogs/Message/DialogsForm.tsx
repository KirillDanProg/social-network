import React, {FC} from 'react';
import styles from "../Dialogs.module.css";
import {SubmitHandler, useForm} from "react-hook-form";

type DialogsFormType = {
    message: string
}
type DialogsPropsType = {
    onSubmit: (message: string) => void
}
export const DialogsForm: FC<DialogsPropsType> = ({onSubmit}) => {
    const onSubmitHandler: SubmitHandler<DialogsFormType> = data => {
        onSubmit(data.message)
        resetField("message")
    }
    const {register, handleSubmit, resetField, formState: {errors}} = useForm<DialogsFormType>();


    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
            <input type={"text"} {...register("message", {required: true})}  />

            {errors.message && <span>This field is required</span>}

            <input type="submit"/>
        </form>
    );
};

export default DialogsForm;