import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {RootState} from "../../redux/store";

export type HeaderPropsType = ReturnType<typeof mapStateToProps>

class HeaderContainer extends React.Component<HeaderPropsType> {
    render() {
        return (
            <Header authData={this.props.authData}/>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        authData: state.auth
    }
}

export default connect(mapStateToProps, {})(HeaderContainer)
