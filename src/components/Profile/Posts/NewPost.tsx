import React, {FC} from "react";
import styles from "./Posts.module.css"
import {SubmitHandler, useForm} from "react-hook-form";

export type NewPostType = {
    addPost: (postText: string) => void
}
export const NewPost: FC<NewPostType> = (props) => {

    const addPost = (postText: string) => {
        props.addPost(postText)
    }
    type Inputs = {
        postText: string,
    };

    const {register, handleSubmit, resetField, formState: {errors}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        addPost(data.postText)
        resetField('postText');
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className={errors.postText ? styles.error : ""} {...register("postText", {required: true})} />
                <div>
                    {errors.postText && <span className={styles.errorMessage}>This field is required</span>}
                </div>
                <input type="submit"/>
            </form>
        </>
    )
}

