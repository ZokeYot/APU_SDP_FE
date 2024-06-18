export interface Message {
    senderID: string;
    receiverID: string;
    date: string,
    content: string;
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
}