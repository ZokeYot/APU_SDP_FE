export class Message {
    content !: string
    sender !: number;
    receiver !: number

    constructor(content: string, sender: number, receiver: number) {
        this.content = content
        this.sender = sender
        this.receiver = receiver
    }
}
