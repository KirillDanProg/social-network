import {RootState} from "../redux/store";

export const getAuthId = (state: RootState) => {
    return state.auth.id
}
export const getProfileData = (state: RootState) => {
    return state.profile.profileData
}