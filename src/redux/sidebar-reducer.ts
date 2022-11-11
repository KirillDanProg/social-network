import img from "../assets/images.jpeg";
import img2 from "../assets/rick.jpeg";
import img3 from "../assets/monkey.jpeg";
import {v1} from "uuid";

const initialState = {
    friends: [
        {id: v1(), name: "Alex", img: img},
        {id: v1(), name: "John", img: img2},
        {id: v1(), name: "Chris", img: img3},
    ]
}
type InitialStateType = typeof initialState

export const sidebarReducer = (state: InitialStateType= initialState, action: any): any => {
    return state
}

export default sidebarReducer
