import React from 'react';
import './App.css';
import {Route, Routes,} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import {themes} from "./theme/themes";
import {Loader, Snackbar, StyledAppContainer, StyledMainContainer} from "./common";
import {useAppInit, useAppSelector, useRedirect} from "./utils/hooks";
import {
    UsersContainer,
    ProfilePage,
    Dialogs,
    Friends,
    Profile,
    LoginContainer,
    Sidebar,
    Header,
} from "./components";


export const App = () => {
    const isAppInit = useAppSelector(state => state.application.isInit)
    const theme = useAppSelector(state => state.application.theme)
    const isAuth = useAppSelector(state => state.auth.login)
    const error = useAppSelector(state => state.application.error)

    useRedirect(!!isAuth)

    useAppInit()

    return !isAppInit ? <Loader/>
        :
        (
            <ThemeProvider theme={themes[theme]}>
                {
                    !!error && <Snackbar error={error} failed/>
                }
                <StyledAppContainer className="App">
                    <Header/>
                    <Sidebar/>
                    <StyledMainContainer className="AppContent">
                        <Routes>
                            <Route path="/profile" element={<Profile/>}>
                                <Route path={":userId"} element={<ProfilePage/>}/>
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
