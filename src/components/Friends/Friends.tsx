import React, {memo, useEffect} from "react";
import {useAppSelector} from "../../utils/hooks/reduxHooks";
import {User} from "../Users/User";
import {Flex} from "../../common/superComponents/Flex";
import {getFriendsTC} from "../../redux/usersReducer/users-reducer";
import {useAppDispatch} from "../../common/hooks";

export const Friends = memo(() => {
    const friends = useAppSelector(state => state.users.friends)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getFriendsTC())
    }, [])

    return (
        <Flex margin={"10px"}
              align={"center"}
              gap={"10px"}
        >
            {
                friends.map(friend => {
                    return (
                        <User key={friend.userId}
                              {...friend}
                        />
                    )
                })
            }
        </Flex>
    )
})