export type ProfileType = {
    profileData: ProfileDataType
    postsData: Array<PostDataType>
}

export type ProfileDataType = ProfileDataTypeAPI & {
    followed: boolean
    status: string | null
}

export type ProfileDataTypeAPI = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    aboutMe: string
    photos: { small: string | null, large: string | null }
}
export type PostDataType = {
    id: string
    postText: string
    likes: number
    img: string
}
