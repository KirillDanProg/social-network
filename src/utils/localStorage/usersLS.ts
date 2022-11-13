export const addFriendToLocalStorage = (value: number) => {
    const localStorageData = localStorage.getItem("friends")
    if(!localStorageData) {
        localStorage.setItem("friends", JSON.stringify([]))
    }

    if (localStorageData) {
        const _friendsIdArr = JSON.parse(localStorageData)
        _friendsIdArr.push(value)
        localStorage.setItem("friends", JSON.stringify(_friendsIdArr))
    }
}


export const removeFriendFromLocalStorage = function (value: number) {
    const localStorageData = localStorage.getItem("friends")

    if (localStorageData) {
        const _friendsIdArr = JSON.parse(localStorageData)
        const updatedFriendsArr = _friendsIdArr.filter(el => el !== value)
        localStorage.setItem("friends", JSON.stringify(updatedFriendsArr))
    }
}

export const getFriendsFromLocalStorage = () => {

    const friendsId = localStorage.getItem("friends")

    if (friendsId) {
        return JSON.parse(friendsId)
    }
}
