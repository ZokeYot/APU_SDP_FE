export interface Quiz {
    quizID: string
    title: string
    quizAdmin: string
    adminName: string
    createDate: string
    description: string
    thumbnail: string
    questions: Question[]
}

export interface Question {
    question: string;
    type: string;
    content: {
        answer: string,
        options: Option[]
    }
}

export interface Option {
    option: string
}