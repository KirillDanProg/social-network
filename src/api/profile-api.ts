import axios from "axios";
import {ProfileDataType} from "../types /ProfileType/ProfileTypes";
import {ResponseType} from "./api-types";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "482ee378-b25a-4ca3-a87a-24b979ebefbf"
    }
})


export const profileAPI = {
    getUserStatus(userId: number) {
        return instance.get(`profile/status/${userId}`).then(res => {
            return res.data
        })
    },
    getProfileData: (id: number) => {
        return instance.get<ProfileDataType>(`profile/${id}`)
            .then(res => res.data)
    },
    updateUserStatus: (status: string) => {
        return instance.put<ResponseType<{ }>>(`profile/status`, {status: status}).then(res => {
            return res.data
        })
    },
    updateUserPhoto: (file: File) => {

        return instance.put(`profile/photo`, {image: file}, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
}