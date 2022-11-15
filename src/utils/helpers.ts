export const filterUsers = (users, idArr) => {
    const usersObj: any = {}
    const res: any = []

    for(let i = 0; i < users.length; i++) {
        if(!usersObj[users[i].id]) {
            usersObj[users[i].id] = users[i]
        }
    }
    for(let i = 0; i < idArr.length; i++) {
        if(usersObj[idArr[i]]) {
            res.push(usersObj[idArr[i]])
        }
    }
    return res
}