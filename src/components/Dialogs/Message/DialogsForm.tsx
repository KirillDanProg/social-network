import React, {FC} from 'react';
import styles from "../Dialogs.module.css";
import {SubmitHandler, useForm} from "react-hook-form";
import {TextField} from "../../../common/superComponents/TextField";
import {Button} from "../../../common/superComponents/Button";
import {PositionedComponent} from "../../../common/superComponents/PositionComponent";

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
        <PositionedComponent position={"fixed"} bottom>
            <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
                <TextField width="70%"
                           className={styles.input}
                           focus={0}
                           autocomplete="off"
                           borderRadius={"20px"}
                           type={"text"}
                           {...register("message", {required: true})}  />

                {errors.message && <span>This field is required</span>}

                <Button type="submit">send</Button>
            </form>
        </PositionedComponent>

    );
};

export default DialogsForm;