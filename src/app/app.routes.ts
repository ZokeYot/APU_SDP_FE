import { Routes } from '@angular/router';
import { StudentMainPageComponent } from './section/student/student-main-page/student-main-page.component';
import { roleGuard } from './guard/role.guard';
import { Role } from './model/role';
import { RegisterComponent } from './section/register/register.component';
import { ConversationComponent } from './section/conversation/conversation.component';


import { QuizListComponent } from './section/lectuerer/quiz-list/quiz-list.component';
import { MaterialListComponent } from './section/lectuerer/material-list/material-list.component';
import { MaterialDetailsComponent } from './section/lectuerer/material-details/material-details.component';
import { CreateQuizComponent } from './section/lectuerer/create-quiz/create-quiz.component';

export const routes: Routes = [
    { path: "student", component: StudentMainPageComponent /* canActivate: [roleGuard], data: { roles: [Role.STUDENT] } */ },
    { path: "", component: RegisterComponent },
    { path: "conversation", component: ConversationComponent },
    { path: 'quiz', component: QuizListComponent },
    { path: 'materials', component: MaterialListComponent },
    { path: 'material-details/:title/:filename/:date', component: MaterialDetailsComponent },
    { path: 'create-quiz', component: CreateQuizComponent }
];
