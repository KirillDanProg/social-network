import axios from "axios";
import {GetUsersType, ResponseType} from "./api-types";
import {profileAPI} from "./profile-api";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "482ee378-b25a-4ca3-a87a-24b979ebefbf"
    }
})


export const userAPI = {
    follow: (id: number) => {
        return instance.post<ResponseType<{}>>(`follow/${id}`).then(res => res.data)
    },
    unfollow: (id: number) => {
        return instance.delete<ResponseType<{}>>(`follow/${id}`).then(res => res.data)
    },
    getUsers: (page: number, count: number) => {
        return instance.get<GetUsersType>(`users?page=${page}&count=${count}`)
            .then(res => {
                return res.data
            })
    },
    getProfileData: (id: number) => {
        return profileAPI.getProfileData(id)
    },
    findUser: (term: string) => {
        return instance.get(`users?term=${term}&count=100`)
    }

}