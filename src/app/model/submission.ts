import { Option } from "./quiz"

export interface Submission {
    submissionID: string;
    studentID: string;
    studentName: string;
    profile_picture: string;
    completedDate: string;
    score: string;
    response: Response[]
}

export interface Response {
    question: string
    type: string
    content: {
        answer: string
        response: string
        options: Option[]
    }
}

