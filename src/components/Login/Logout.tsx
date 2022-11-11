import React from 'react';
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../../redux/store";
import {AnyAction} from "redux";
import {logoutTC} from "../../redux/authReducer/authReducer";



class LogoutContainer extends React.Component<ReturnType<typeof mapDispatchToProps>> {

    render () {
        return (
            <Logout logout={this.props.logout}/>
        )
    }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, AnyAction>) => {
    return {
        logout: () => {
            dispatch(logoutTC())
        }
    }
}


export const Logout = (props: {logout: () => void}) => {
    const onClickHandler = () => {
        props.logout()
    }
    return (
        <button onClick={onClickHandler}>Logout</button>
    );
};

export default connect(null, mapDispatchToProps)(LogoutContainer)