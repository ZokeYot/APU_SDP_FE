import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message, UserInfo } from '../model/conversation';

@Injectable({
  providedIn: 'root'
})
export class TestyService {

  baseUrl: string = "http://localhost:8000";


  constructor(private http: HttpClient) {

  }


  // User Relate Service
  login(email: string, password: string) {
    const loginData = { email, password }
    return this.http.post<any>(`${this.baseUrl}/user/login`, loginData);
  }

  register(name: string, email: string, password: string, gender: string, dob: string, profile_picture: string, lectureKey: string) {
    const registerData = { name, email, password, gender, dob, profile_picture, lectureKey }
    console.log(registerData)
    return this.http.post<any>(`${this.baseUrl}/user/register`, registerData)

  }

  get_profile(userID: string): Observable<UserInfo> {
    return this.http.post<any>(`${this.baseUrl}/user/profile`, { userID })
  }

  update_profile(newProfile: any) {
    return this.http.post<any>(`${this.baseUrl}/user/update`, newProfile)
  }

  get_all_student() {
    return this.http.get<any>(`${this.baseUrl}/student/all`)
  }


  // Quiz Relate Service

  create_quiz(quiz: any) {
    return this.http.post<any>(`${this.baseUrl}/quiz/create`, quiz)
  }

  get_lecturer_quiz(lecturerID: any) {
    return this.http.post<any>(`${this.baseUrl}/quiz/lecturer-quiz`, { lecturerID })
  }
  get_all_quiz() {
    return this.http.get<any>(`${this.baseUrl}/quiz/all`)
  }

  get_quiz(quizID: string) {
    return this.http.post<any>(`${this.baseUrl}/quiz/find`, { quizID })
  }

  get_quiz_participants(quizID: string) {
    return this.http.post<any>(`${this.baseUrl}/quiz/participants`, { quizID })
  }

  find_quiz_participant(quizID: string, userID: string) {
    return this.http.post<any>(`${this.baseUrl}/quiz/check-quiz`, { quizID, userID })
  }

  update_quiz(quiz: any) {
    return this.http.post<any>(`${this.baseUrl}/quiz/update`, quiz)
  }

  add_quiz_participants(quizID: string, participants: any) {
    return this.http.post<any>(`${this.baseUrl}/quiz/add`, { quizID, participants })
  }

  delete_quiz_participants(quizID: string, participants: any) {
    return this.http.post<any>(`${this.baseUrl}/quiz/delete`, { quizID, participants })
  }

  join_quiz(quizID: string, userID: string) {
    return this.http.post<any>(`${this.baseUrl}/quiz/join`, { quizID, userID })
  }

  // Submission Relate Service
  create_submission(submission: any) {
    return this.http.post<any>(`${this.baseUrl}/submission/add`, submission)
  }

  get_quiz_submission(quizID: any) {
    return this.http.post<any>(`${this.baseUrl}/submission/all`, { quizID })
  }

  // Material Relate Service
  create_new_material(material: any) {
    return this.http.post<any>(`${this.baseUrl}/material/upload`, material)
  }

  get_download_material(materialID: any) {
    return this.http.post<any>(`${this.baseUrl}/material/download`, { materialID })
  }

  delete_material(materialID: any) {
    return this.http.post<any>(`${this.baseUrl}/material/delete`, { materialID })
  }

  get_all_material() {
    return this.http.get<any>(`${this.baseUrl}/material/all`)
  }

  get_lecturer_material(lecturerID: any) {
    return this.http.post<any>(`${this.baseUrl}/material/lecturer`, { lecturerID })
  }

  // GameItem Relate Service
  get_user_titles(userID: any) {
    return this.http.post<any>(`${this.baseUrl}/user/titles`, { userID })
  }

  add_user_title(userID: any, title: string) {
    return this.http.post<any>(`${this.baseUrl}/game-title/add`, { userID, title })
  }

  buy_item(userID: any, items: any) {
    return this.http.post<any>(`${this.baseUrl}/game-item/buy`, { userID, items })
  }

  // Conversation Relate Service

  create_group_message(newGroup: any) {
    return this.http.post<any>(`${this.baseUrl}/conversation/create-group`, newGroup)
  }

  send_message(message: any) {
    return this.http.post<any>(`${this.baseUrl}/conversation/send`, message)
  }

  send_group_message(groupMessage: any) {
    return this.http.post<any>(`${this.baseUrl}/conversation/send-group`, groupMessage)
  }

  get_messages(userID: string): Observable<Message[]> {
    return this.http.post<any>(`${this.baseUrl}/conversation`, { userID })
  }

  get_group_messages(userID: string) {
    return this.http.post<any>(`${this.baseUrl}/conversation/group`, { userID })
  }

  get_group_info(groupID: string) {
    return this.http.post<any>(`${this.baseUrl}/conversation/group/info`, { groupID })
  }

  update_group_info(groupInfo: string) {
    return this.http.post<any>(`${this.baseUrl}/conversation/group/update`, groupInfo)
  }

  delete_group(groupID: string) {
    return this.http.post<any>(`${this.baseUrl}/conversation/group/delete`, { groupID })
  }

  add_group_members(groupID: string, members: string) {
    return this.http.post<any>(`${this.baseUrl}/conversation/group/member/add`, { groupID, members })
  }

  delete_group_members(groupID: string, members: string) {
    return this.http.post<any>(`${this.baseUrl}/conversation/group/member/delete`, { groupID, members })
  }


}
