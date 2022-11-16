import React from "react"
import {connect} from "react-redux";
import { RootState} from "../../redux/store";
import {AnyAction} from "redux";
import {loginTC} from "../../redux/authReducer/authReducer";
import {ThunkDispatch} from "redux-thunk";
import {Navigate} from "react-router-dom";
import {Login, LoginDataType} from "./Login";
import {PositionedComponent} from "../../common/superComponents/PositionComponent";


type LoginContainerType = MSTPType & MDTPType

class LoginContainer extends React.PureComponent<LoginContainerType> {

    render() {
        return (
            <PositionedComponent center>
                {
                    !this.props.login ? <Login login={this.props.login} authorization={this.props.authorization}/>
                        :
                     <Navigate to={"/profile"}/>

                }
            </PositionedComponent>
        )
    }
}

type MSTPType = {
    login: string | null
}
type MDTPType = {
    authorization: (data: LoginDataType) => void
}
const mapStateToProps = (state: RootState): MSTPType => {
    return {
        login: state.auth.login
    }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, AnyAction>): MDTPType => {
    return {
        authorization: (data: LoginDataType) => {
            dispatch(loginTC(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)