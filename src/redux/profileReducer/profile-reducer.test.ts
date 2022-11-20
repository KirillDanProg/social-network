import {ProfileType} from "../../types /ProfileType/ProfileTypes";
import {v1} from "uuid";

let initialState: ProfileType
beforeEach(() => {
    initialState = {
        postsData: [
            {id: v1(), postText: "Hello world!", likes: 237, img: "img"},
            {id: v1(), postText: "Bla Bla Bla", likes: 158, img: "img2"},
            {id: v1(), postText: "Looking for a job", likes: 496, img: "img3"},
        ],
        profileData: {
            userId: 0,
            fullName: "Kirill",
            status: "",
            photos: {small: "string", large: "string"},
            followed: false,
            lookingForAJob: true,
            lookingForAJobDescription: "string",
            aboutMe: "some text",
            contacts: {
                github: "",
                instagram: "",
                facebook: "",
                mainLink: "",
                twitter: "",
                website: "",
                youtube: "",
                vk: ""
            }
        },
    }
})

test("post should be added", () => {

})

test("post should be deleted", () => {

})
export {}