export interface Message {
    senderID: string;
    receiverID: string;
    date: string;
    content: string
    belongCurrUser: boolean
}

export interface Conversation {
    userID: string
    name: string;
    profile_picture: string;
    messages: Message[]
}



export interface UserInfo {
    id: string;
    name: string;
    email: string;
    gender: string;
    password: string;
    profile_picture: string;
    title: string
    gaming_point: string
    role: string;
}

export interface GroupMessage {
    senderID: string;
    name: string;
    profile_picture: string;
    date: string;
    content: string
    belongCurrUser: boolean
}

export interface GroupConversation {
    groupID: string;
    name: string;
    adminID: string;
    profile_picture: string;
    messages: GroupMessage[]
}