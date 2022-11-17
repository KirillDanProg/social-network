import React, {useEffect} from 'react';
import './App.css';
import { Route, Routes, useNavigate,} from "react-router-dom";
import {Sidebar} from "./components/Sidebar/Sidebar";
import {Friends} from "./components/Friends/Friends";
import HeaderContainer from "./components/Header/HeaderContainer";
import UsersContainer from "./components/Users/UsersContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {useAppDispatch, useAppSelector} from "./common/hooks";
import Loader from "./common/Loader/Loader";
import {appInit} from "./redux/appReducer/app-reducer";
import {Dialogs} from "./components/Dialogs/Dialogs";
import  {ThemeProvider} from "styled-components";
import {themes} from "./theme/themes";
import {StyledAppContainer} from "./common/superComponents/StyledApp";
import {StyledMainContainer} from "./common/superComponents/StyledMain";
import ProfileInfoContainer from "./components/Profile/ProfileInfoContainer";
import {ProfilePage} from "./components/Profile/ProfilePage";

const App = () => {
    const isAppInit = useAppSelector(state => state.application.isInit)
    const theme = useAppSelector(state => state.application.theme)
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.auth.login)

    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth) {
            navigate("/login")
        } else {
            navigate("/profile")
        }
    }, [isAuth])


    useEffect(() => {
        dispatch(appInit())
    }, [isAuth])

    return !isAppInit ? <Loader/>
        :
        (
            <ThemeProvider theme={themes[theme]}>

                <StyledAppContainer className="App">
                    <HeaderContainer/>
                    <Sidebar/>
                    <StyledMainContainer className="AppContent">
                        <Routes>
                            <Route path="/profile" element={<ProfileInfoContainer/>}>
                                <Route path={":userId"} element={<ProfilePage/> }/>
                            </Route>
                            <Route path="/dialogs" element={<Dialogs/>}/>
                            <Route path="/users" element={<UsersContainer/>}/>
                            <Route path="/friends" element={<Friends/>}/>
                            <Route path="/login" element={<LoginContainer/>}/>
                        </Routes>
                    </StyledMainContainer>
                </StyledAppContainer>

            </ThemeProvider>
        );
}

export default App;
