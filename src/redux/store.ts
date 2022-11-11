import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer, {ProfileActionsType} from "./profileReducer/profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import {UsersActionsType, usersReducer} from "./usersReducer/users-reducer";
import {AuthActionsType, authReducer} from "./authReducer/authReducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {appReducer} from "./appReducer/app-reducer";
import {DialogsActionTypes, dialogsReducer} from "./dialogsReducer/dialogs-reducer";

const rootReducer = combineReducers({
    dialogs: dialogsReducer,
    profile: profileReducer,
    sidebar: sidebarReducer,
    users: usersReducer,
    auth: authReducer,
    application: appReducer
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
export type AppActionsType = UsersActionsType | DialogsActionTypes | AuthActionsType | ProfileActionsType

export type AppThunk<ReturnType = any> = ThunkAction<

    ReturnType,
    RootState,
    unknown,
    AnyAction
    >
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.store = store

