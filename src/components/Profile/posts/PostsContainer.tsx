import React from "react";
import {addPostAC, deletePostAC} from "../../../redux/profileReducer/profile-reducer";
import {ProfileType} from "../../../types /ProfileType/ProfileTypes";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {RootState} from "../../../redux/store";
import {Posts} from "./Posts";


export type PostsPropsType = MapStatePropsType & MapDispatchPropsType
type MapStatePropsType = {
    profile: ProfileType
}
type MapDispatchPropsType = {
    addPost: (postText: string) => void
    deletePost: (id: string) => void
}

const mapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        profile: state.profile,
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPost: (postText: string) => {
            dispatch(addPostAC(postText))
        },
        deletePost: (id: string) => {
            dispatch(deletePostAC(id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
