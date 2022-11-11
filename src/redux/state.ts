import {StateType} from "../types /types";
// import img from "../assets/images.jpeg";
// import img2 from "../assets/rick.jpeg";
// import img3 from "../assets/monkey.jpeg";
// import {v1} from "uuid";
// import dialogsReducer, {addMessageAC, updateMessageTextAC} from "./dialogsReducer/dialogs-reducer";
// import profileReducer, {
//     addPostAC,
//     deletePostAC,
//     setProfileDataAC,
//     updatePostTextAC
// } from "./profileReducer/profile-reducer";
// import sidebarReducer from "./sidebar-reducer";
//
//
//  const store = {
//     _state: {
//         dialogs: {
//             dialogsData: [
//                 {id: v1(), name: "Kirill", img: img},
//                 {id: v1(), name: "Alex", img: img2},
//                 {id: v1(), name: "Chris", img: img3}
//             ],
//             messagesData: [
//                 {id: v1(), message: "Some message text", img: img3},
//                 {id: v1(), message: "Hello World", img: img2},
//                 {id: v1(), message: "Lorem ipsum", img: img},
//                 {id: v1(), message: "bla bla bla bla bla bla", img: img3},
//                 {id: v1(), message: "Some message text", img: img2},
//             ],
//             messageText: "",
//         },
//         profile: {
//             postsData: [
//                 {id: v1(), postText: "Hello world!", likes: 237, img: img},
//                 {id: v1(), postText: "Bla Bla Bla", likes: 158, img: img2},
//                 {id: v1(), postText: "Looking for a job", likes: 496, img: img3},
//             ],
//             profileData: {
//                 name: "Kirill",
//                 country: "Russia",
//                 dateOfBirth: "28.09.1998"
//             },
//             postText: "",
//             error: false,
//             errorMessage: "",
//         },
//         sidebar: {
//             friends: [
//                 {id: v1(), name: "Alex", img: img},
//                 {id: v1(), name: "John", img: img2},
//                 {id: v1(), name: "Chris", img: img3},
//             ]
//         }
//     },
//
//     getState() {
//         return this._state
//     },
//
//     _callSubscriber(x: StateType) {
//
//     },
//
//     subscriber(observer: (state: StateType) => void) {
//         this._callSubscriber = observer
//     },
//
//
//     dispatch(action: ActionsType) {
//         dialogsReducer(this._state.dialogs, action)
//         profileReducer(this._state.profile, action)
//         sidebarReducer(this._state.sidebar, action)
//
//         this._callSubscriber(this._state)
//
//     }
// }
//
// export type ActionsType = ReturnType<typeof addMessageAC> |
//     ReturnType<typeof deletePostAC> |
//     ReturnType<typeof updatePostTextAC> |
//     ReturnType<typeof addPostAC> |
//     ReturnType<typeof updateMessageTextAC> |
//     ReturnType<typeof setProfileDataAC>
//
//
