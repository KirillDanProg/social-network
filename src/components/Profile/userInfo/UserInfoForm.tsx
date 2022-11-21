import React, {FC} from 'react';
import {Field, Form, Formik} from "formik";
import {useAppDispatch} from "../../../utils/hooks/reduxHooks";
import {updatePersonalData} from "../../../redux/accessRightsReducer/access-reducer";
import {Button} from "../../../common/superComponents/Button";
import styles from "../Profile.module.css"
import {ProfileDataType} from "../../../types /ProfileType/ProfileTypes";
import {Flex} from "../../../common/superComponents/Flex";

type InitialValuesType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

type UserInfoPropsType = {
    userInfo: ProfileDataType
    setEditMode: () => void
}

export const UserInfoForm: FC<UserInfoPropsType> = ({userInfo, setEditMode}) => {

    const initialValues: InitialValuesType = {
        fullName: `${userInfo.fullName}`,
        lookingForAJob: userInfo.lookingForAJob,
        lookingForAJobDescription: `${userInfo.lookingForAJobDescription}`,
        aboutMe: `${userInfo.aboutMe}`,
        github: `${userInfo.contacts.github}`,
        vk: `${userInfo.contacts.vk}`,
        facebook: "google.com",
        instagram: `${userInfo.contacts.instagram}`,
        twitter: "google.com",
        website: "google.com",
        youtube: "google.com",
        mainLink: "google.com",
    }
    const dispatch = useAppDispatch()

    const onSubmitHandler = (values) => {

        const {fullName, aboutMe, lookingForAJob, lookingForAJobDescription, ...contacts} = values
        const userData = {fullName, aboutMe, lookingForAJob, lookingForAJobDescription, contacts: {...contacts}}

        dispatch(updatePersonalData(userData))
        setEditMode()
    }

    return (
        <Formik initialValues={initialValues}
                onSubmit={onSubmitHandler}
        >
            <Form>
                <Flex gap={"10px"} direction={"column"}>
                    <span className={styles.fieldItem}>
                         <label>User name: </label>
                         <Field className={styles.infoField} id={"fullName"} name={"fullName"}
                                placeholder={"Edit user name"}/>
                    </span>

                    <span className={styles.fieldItem}>
                        <label>About me: </label>
                        <Field className={styles.infoField} id={"aboutMe"} name={"aboutMe"}
                               placeholder={"aboutMe"}/>
                    </span>

                    <span className={styles.fieldItem}>
                        <label form={"lookingForAJobDescription"}>Description: </label>
                         <Field className={styles.infoField}
                                id={"lookingForAJobDescription"}
                                name={"lookingForAJobDescription"}
                                placeholder={"description"}
                                type={"textarea"}
                         />
                    </span>

                    <span className={styles.fieldItem}>
                        <label form={"instagram"}>instagram: </label>
                        <Field className={styles.infoField} id={"instagram"} name={"instagram"}
                               placeholder={"instagram"}/>
                    </span>

                    <span className={styles.fieldItem}>
                        <label form={"github"}>Github: </label>
                        <Field className={styles.infoField} id={"github"} name={"github"} placeholder={"github"}/>
                    </span>
                    <span className={styles.fieldItem}>
                        <label form={"vk"}>vk: </label>
                        <Field className={styles.infoField} id={"vk"} name={"vk"} placeholder={"vk"}/>
                    </span>

                    <div className={styles.checkboxField}>
                        <label htmlFor="lookingForAJob">lookingForAJob</label>
                        <Field className={styles.infoField} type={"checkbox"} id={"lookingForAJob"}
                               name={"lookingForAJob"}
                               placeholder={"lookingForAJob"}/>
                    </div>

                    <div style={{display: "none"}}>
                        <Field className={styles.infoField} id={"youtube"} name={"youtube"} placeholder={"youtube"}/>
                        <Field className={styles.infoField} id={"website"} name={"website"}/>
                        <Field className={styles.infoField} id={"twitter"} name={"twitter"}/>
                        <Field className={styles.infoField} id={"facebook"} name={"facebook"}/>
                        <Field className={styles.infoField} id={"mainLink"} name={"mainLink"}/>
                    </div>

                    <Button type={"submit"}>Update info</Button>
                </Flex>
            </Form>
        </Formik>
    )
}

