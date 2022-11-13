
export type MessageType = {
    id: string
    body: string
    translatedBody: null
    addedAt: string
    senderId: number
    senderName: string
    recipientId: number
    viewed: boolean
}
export type MessageDataType = {
    [key: string] : MessageType[]
}

export type SandedMessageType = {
    id: "176f6493-8486-4582-b2ae-1e5e7ffef507",
    body: "another text message",
    translatedBody: null,
    addedAt: "2022-11-12T08:30:13.19",
    senderId: 24498,
    senderName: "kirillVN",
    recipientId: 2,
    recipientName: "samurai",
    viewed: false,
    deletedBySender: false,
    deletedByRecipient: false,
    isSpam: false,
    distributionId: null
}