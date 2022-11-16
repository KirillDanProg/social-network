import React, { memo} from 'react';
import {useAppSelector} from "../../../utils/hooks/reduxHooks";


export const ProfileDescription = memo(() => {

    const profileInfoData = useAppSelector(state => state.profile.profileData)

    return (
        <div>
            <div>{profileInfoData.aboutMe}</div>
        </div>
    );
});
