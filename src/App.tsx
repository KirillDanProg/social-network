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
import {getFriendsTC} from "./redux/usersReducer/users-reducer";


const App = () => {
    const isAppInit = useAppSelector(state => state.application.isInit)
    const dispatch = useAppDispatch()



    useEffect(() => {
        dispatch(appInit())
    }, [])

    return !isAppInit ? <Loader/>
        :
        (
            <BrowserRouter>
                <div className="App">
                    <HeaderContainer/>
                    <Sidebar/>
                    <div className="AppContent">
                        <Routes>
                            <Route path="/profile" element={<Profile/>}>
                                <Route path={":userId"}/>
                            </Route>
                            <Route path="/dialogs" element={<Dialogs/>}/>
                            <Route path="/users" element={<UsersContainer/>}/>
                            <Route path="/friends" element={<Friends/>}/>
                            <Route path="/login" element={<LoginContainer/>}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        );
}

export default App;
