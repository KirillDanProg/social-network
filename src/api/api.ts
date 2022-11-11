import axios from "axios";
import {LoginDataType} from "../components/Login/Login";
import {AuthMeType, GetUsersType, ResponseType} from "./api-types";
import {ProfileDataType} from "../types /ProfileType/ProfileTypes";


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
    }
}

export const authAPI = {
    me() {
        return instance.get<ResponseType<AuthMeType>>("auth/me")
    },
    login(data: LoginDataType) {
        return instance.post<ResponseType<{ userId: number }>>("auth/login", {email: data.login, password: data.password})
    },
    logout() {
        return instance.delete<ResponseType<{}>>("auth/login")
    }
}
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
    }
}