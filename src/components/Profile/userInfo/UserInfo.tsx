import inst from "../../../assets/icons/instagram.svg";
import github from "../../../assets/icons/github.svg";
import vk from "../../../assets/icons/vk.svg";
import {ProfileDataType} from "../../../types /ProfileType/ProfileTypes";
import {Indicator} from "../../../common";


export const UserInfo = (props: { userInfo: ProfileDataType }) => {
    const {userInfo} = props

    return (
        <div className={"userInfoContainer"}>
            <span className={"info-item"}>{userInfo.aboutMe}</span>
            <span className={"info-item"}>
                Looking for a job: {
                userInfo.lookingForAJob
                    ? <Indicator size={"10px"} color={"lime"}/>
                    : <Indicator size={"10px"} color={"red"}/>
            }

            </span>
            <span className={"info-item"}>{userInfo.lookingForAJobDescription}</span>

            <div className={"media-icons"}>
                <a target={"_blank"} rel="noreferrer"
                   href={userInfo.contacts && userInfo.contacts.instagram}>
                    <img alt="instagram" className={"icon"} src={inst}/>
                </a>
                <a target={"_blank"} rel="noreferrer"
                   href={userInfo.contacts && userInfo.contacts.github}>
                    <img alt="github" style={{color: "red"}} className={"icon github"} src={github}/>
                </a>
                <a target={"_blank"} rel="noreferrer"
                   href={userInfo.contacts && userInfo.contacts.vk}>
                    <img alt="vk" className={"icon"} src={vk}/>
                </a>
            </div>
        </div>
    )
}
