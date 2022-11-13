import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import {Sidebar} from "./components/Sidebar/Sidebar";
import {Friends} from "./components/Friends/Friends";
import {Profile} from "./components/Profile/Profile";
import HeaderContainer from "./components/Header/HeaderContainer";
import UsersContainer from "./components/Users/UsersContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {useAppDispatch, useAppSelector} from "./common/hooks";
import Loader from "./common/Loader/Loader";
import {appInit} from "./redux/appReducer/app-reducer";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {ThemeProvider} from "styled-components";
import {themes} from "./theme/themes";
import {StyledAppContainer} from "./common/superComponents/StyledApp";
import {StyledMainContainer} from "./common/superComponents/StyledMain";

const App = () => {
    const isAppInit = useAppSelector(state => state.application.isInit)
    const theme = useAppSelector(state => state.application.theme)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(appInit())
    }, [])

    return !isAppInit ? <Loader/>
        :
        (
            <BrowserRouter>

                <ThemeProvider theme={themes[theme]}>

                    <StyledAppContainer className="App">
                        <HeaderContainer/>
                        <Sidebar/>
                        <StyledMainContainer className="AppContent">
                            <Routes>
                                <Route path="/profile" element={<Profile/>}>
                                    <Route path={":userId"}/>
                                </Route>
                                <Route path="/dialogs" element={<Dialogs/>}/>
                                <Route path="/users" element={<UsersContainer/>}/>
                                <Route path="/friends" element={<Friends/>}/>
                                <Route path="/login" element={<LoginContainer/>}/>
                            </Routes>
                        </StyledMainContainer>
                    </StyledAppContainer>

                </ThemeProvider>
            </BrowserRouter>
        );
}

export default App;
