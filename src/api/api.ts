import axios from "axios";
import {LoginDataType} from "../components/Login/Login";
import {AuthMeType, ResponseType} from "./api-types";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "482ee378-b25a-4ca3-a87a-24b979ebefbf"
    }
})



export const authAPI = {
    me() {
        return instance.get<ResponseType<AuthMeType>>("auth/me")
    },
    login(data: LoginDataType) {
        return instance.post<ResponseType<{ userId: number }>>("auth/login", {email: data.email, password: data.password})
    },
    logout() {
        return instance.delete<ResponseType<{}>>("auth/login")
    }
}
