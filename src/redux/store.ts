import {AnyAction, applyMiddleware, combineReducers, compose} from "redux";
import profileReducer, {ProfileActionsType} from "./profileReducer/profile-reducer";
import {UsersActionsType, usersReducer} from "./usersReducer/users-reducer";
import {AuthActionsType, authReducer} from "./authReducer/authReducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {appReducer} from "./appReducer/app-reducer";
import {DialogsActionTypes, dialogsReducer} from "./dialogsReducer/dialogs-reducer";
import { legacy_createStore as createStore} from 'redux'

const rootReducer = combineReducers({
    dialogs: dialogsReducer,
    profile: profileReducer,
    users: usersReducer,
    auth: authReducer,
    application: appReducer
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
export type AppActionsType = UsersActionsType | DialogsActionTypes | AuthActionsType | ProfileActionsType

export type AppThunk<ReturnType = any> = ThunkAction<ReturnType,
    RootState,
    unknown,
    AnyAction>

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunkMiddleware),
));
// @ts-ignore
window.store = store

