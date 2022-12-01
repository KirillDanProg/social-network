import React, {memo, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import {User} from "../Users";
import {Flex} from "../../common";
import {getFriendsTC} from "../../redux/usersReducer/users-reducer";

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
                friends.map(friend => <User key={friend.userId}
                                            {...friend} />)
            }
        </Flex>
    )
})
