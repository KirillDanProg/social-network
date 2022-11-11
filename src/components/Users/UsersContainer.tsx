import React from "react";
import {connect} from "react-redux";
import {RootState} from "../../redux/store";
import {AnyAction, compose} from "redux";
import {
    followTC, getUsersTC,
    InitialUsersStateType,
    setPageAC, setTotalAC,
    unfollowTC,
} from "../../redux/usersReducer/users-reducer";
import {Users} from "./Users";
import {ThunkDispatch} from "redux-thunk";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {getUsers} from "../../selectors/users-selector";

export type UsersPropsType = MapStateType & MapDispatchType

type MapStateType = {
    users: InitialUsersStateType
}
type MapDispatchType = {
    getUsers: (page: number, count: number) => void
    follow: (id: number) => void
    unfollow: (id: number) => void
    changePage: (page: number) => void
    setTotal: (total: number) => void
}

class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount() {
        const page = this.props.users.page
        const count = this.props.users.count
        this.props.getUsers(page, count)
    }

    render() {
        return (
            <Users {...this.props}/>
        )
    }
}

const mapStateToProps = (state: RootState): MapStateType => {
    return {

        users: getUsers(state),

    }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, AnyAction>): MapDispatchType => {
    return {
        getUsers: (page: number, count: number) => {
            dispatch(getUsersTC(page, count))
        },
        follow: (id: number) => {
            dispatch(followTC(id));
        },
        unfollow: (id: number) => {
            dispatch(unfollowTC(id))
        },
        changePage: (page: number) => {
            dispatch(setPageAC(page))
        },
        setTotal: (total: number) => {
            dispatch(setTotalAC(total))
        },
    }
}
export  default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect,
)(UsersContainer)


