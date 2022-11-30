import React from "react";
import {compose} from "redux";
import {withRouter} from "../../hoc/withRouter";
import {ProfilePage} from "./ProfilePage";

type ParamsType = {
    userId: number
}

export type ProfileInfoContainerPropsType = {
    router: {
        params: ParamsType
    }
}

class ProfileInfoContainer extends React.PureComponent<ProfileInfoContainerPropsType> {

    render() {
        return (
            <div>
                <ProfilePage idFromURL={this.props.router.params.userId}/>
            </div>
        )
    }
}

export const Profile = compose<React.ComponentType>(
    withRouter,
)(ProfileInfoContainer)


