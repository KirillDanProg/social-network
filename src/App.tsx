import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes, useNavigate,} from "react-router-dom";
import {Friends} from "./components/Friends/Friends";
import {useAppDispatch, useAppSelector} from "./common/hooks";
import Loader from "./common/Loader/Loader";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {ThemeProvider} from "styled-components";
import {themes} from "./theme/themes";
import {StyledAppContainer} from "./common/superComponents/StyledApp";
import {StyledMainContainer} from "./common/superComponents/StyledMain";
import {LoginContainer} from "./components/Login/LoginContainer";
import {Header} from "./components/Header/Header";
import {Sidebar} from "./components/Sidebar/Sidebar";
import {ProfilePage} from "./components/Profile/ProfilePage";
import {appInit} from "./redux/appReducer/app-reducer";
import ProfileInfoContainer from "./components/Profile/ProfileInfoContainer";
import {Snackbar} from "./common/superComponents/Snackbar";
import {Suspense} from "react";

const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"))


const App = () => {
    const isAppInit = useAppSelector(state => state.application.isInit)
    const theme = useAppSelector(state => state.application.theme)
    const isAuth = useAppSelector(state => state.auth.login)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const error = useAppSelector(state => state.application.error)


    useEffect(() => {
        if (!isAuth) {
            navigate("/login")
        } else {
            navigate("/profile")
        }
    }, [isAuth, dispatch, navigate])


    useEffect(() => {
        dispatch(appInit())
    }, [isAuth, dispatch])

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
                            <Route path="/profile" element={<ProfileInfoContainer/>}>
                                <Route path={":userId"} element={<ProfilePage/>}/>
                            </Route>
                            <Route path="/dialogs" element={<Dialogs/>}/>
                            <Route path="/users" element={<Suspense fallback={<Loader/>}>
                                <UsersContainer/>
                            </Suspense>}/>
                            <Route path="/friends" element={<Friends/>}/>
                            <Route path="/login" element={<LoginContainer/>}/>
                        </Routes>
                    </StyledMainContainer>
                </StyledAppContainer>

            </ThemeProvider>
        );
}

export default App;
