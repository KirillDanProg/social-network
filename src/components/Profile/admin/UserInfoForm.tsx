import React from 'react';
import {Field, Form, Formik} from "formik";
import {useAppDispatch} from "../../../utils/hooks/reduxHooks";
import {updatePersonalData} from "../../../redux/accessRightsReducer/access-reducer";
import {Button} from "../../../common/superComponents/Button";
import styles from "../Profile.module.css"

type InitialValuesType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}


export const UserInfoForm = (props: { userName: string }) => {

    const initialValues: InitialValuesType = {
        fullName: `${props.userName}`,
        lookingForAJob: false,
        lookingForAJobDescription: "",
        github: "",
        vk: "",
        facebook: "",
        instagram: "",
        twitter: "",
        website: "",
        youtube: "",
        mainLink: "",
    }
    const dispatch = useAppDispatch()

    const onSubmitHandler = (values, action) => {

        const {fullName, AboutMe, lookingForAJob, lookingForAJobDescription, ...contacts} = values
        const userData = {fullName, AboutMe, lookingForAJob, lookingForAJobDescription, contacts: {...contacts}}

        dispatch(updatePersonalData(userData))
    }

    return (
        <div>
            <Formik initialValues={initialValues}
                    onSubmit={onSubmitHandler}
            >
                <Form className={styles.formContainer}>
                    <Field className={styles.infoField} id={"fullName"} name={"fullName"}
                           placeholder={"Edit user name"}/>
                    <div className={styles.checkboxField}>
                        <label htmlFor="lookingForAJob">lookingForAJob</label>
                        <Field className={styles.infoField} type={"checkbox"} id={"lookingForAJob"}
                               name={"lookingForAJob"}
                               placeholder={"lookingForAJob"}/>
                    </div>
                    <Field className={styles.infoField} id={"AboutMe"} name={"AboutMe"} placeholder={"AboutMe"}/>
                    <Field className={styles.infoField} id={"lookingForAJobDescription"}
                           name={"lookingForAJobDescription"}
                           placeholder={"description"}/>
                    <Field className={styles.infoField} id={"github"} name={"github"} placeholder={"github"}/>
                    <Field className={styles.infoField} id={"vk"} name={"vk"} placeholder={"vk"}/>
                    <Field className={styles.infoField} id={"instagram"} name={"instagram"} placeholder={"instagram"}/>
                    <Field className={styles.infoField} id={"facebook"} name={"facebook"} placeholder={"facebook"}/>
                    <Field className={styles.infoField} id={"twitter"} name={"twitter"} placeholder={"twitter"}/>
                    <Field className={styles.infoField} id={"youtube"} name={"youtube"} placeholder={"youtube"}/>
                    <Field className={styles.infoField} id={"Website"} name={"Website"} placeholder={"Website"}/>
                    <Field className={styles.infoField} id={"MainLink"} name={"MainLink"} placeholder={"MainLink"}/>
                    <Button type={"submit"}>Update info</Button>
                </Form>
            </Formik>
        </div>
    )
}

