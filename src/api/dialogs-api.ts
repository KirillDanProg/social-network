import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "482ee378-b25a-4ca3-a87a-24b979ebefbf"
    }
})


export const dialogsAPI = {
    fetchDialogs: () => {
        return instance.get(`dialogs`)
    },
    fetchMessages: (id: number) => {
        return instance.get(`dialogs/${id}/messages`)
    },
    addUserMessage: (id: number, message: string) => {
        return instance.post(`dialogs/${id}/messages`, {body: message})
    },
    deleteUserMessage: (messageId: string) => {
        return instance.delete(`dialogs/messages/${messageId}`)
    },
    refreshDialog: (userId: number) => {
        return instance.put(`dialogs/${userId}`)
    }
}