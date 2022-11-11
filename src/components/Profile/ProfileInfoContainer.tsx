import React from "react";
import {connect} from "react-redux";
import {ProfileDataType} from "../../types /ProfileType/ProfileTypes";
import {AppActionsType, RootState} from "../../redux/store";
import {changeUserStatusTC, getProfileDataTC, getUserStatusTC} from "../../redux/profileReducer/profile-reducer";
import {compose} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {withRouter} from "../../hoc/withRouter";
import ProfileInfo from "./ProfileInfo";
import {getAuthId, getProfileData} from "../../selectors/profile-selector";

type ParamsType = {
    userId: number
}

export type ProfileInfoContainerPropsType = MapStatePropsType & MapDispatchType & {
    router: {
        params: ParamsType
    }
}

class ProfileInfoContainer extends React.PureComponent<ProfileInfoContainerPropsType> {
    initData = () => {
        if (this.props.authID) {
            const defaultID = this.props.authID
            const id = Number(this.props.router.params.userId)
            this.props.getProfileData(id ? id : defaultID)
        }
    }

    componentDidMount() {
        this.initData()
    }

    changeUserStatus = (status: string) => {
        this.props.updateUserStatus(status)
    }

    render() {
        return (
            <ProfileInfo profileData={this.props.profileData}
                         changeStatus={this.changeUserStatus}
                         authID={this.props.authID}/>
        )
    }
}


type MapStatePropsType = {
    profileData: ProfileDataType,
    authID: number
}
type MapDispatchType = {
    getProfileData: (userId: number) => void
    updateUserStatus: (status: string) => void
    getUserStatus: (id: number) => void
}


const mapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        profileData: getProfileData(state),
        authID: getAuthId(state) as number,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, AppActionsType>): MapDispatchType => {
    return {
        getProfileData: (userId: number) => {
            dispatch(getProfileDataTC(userId))
        },
        updateUserStatus: (status: string) => {
            dispatch(changeUserStatusTC(status))
        },
        getUserStatus: (id: number) => {
            dispatch(getUserStatusTC(id))
        }
    }
}

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ProfileInfoContainer)


