import {ProfileType} from "../../types /ProfileType/ProfileTypes";
import {v1} from "uuid";
import profileReducer, {addPostAC, deletePostAC} from "./profile-reducer";

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
        },
    }
})

test("post should be added", () => {

const postText = "some text"
    const newState = profileReducer(initialState, addPostAC(postText))

    expect(newState.postsData.length).toBe(4)

})

test("post should be deleted", () => {

    const id = initialState.postsData[0].id

    const newState = profileReducer(initialState, deletePostAC(id))

    expect(newState.postsData.length).toBe(2)
    expect(newState.postsData[0].likes).toBe(158)
})
export {}