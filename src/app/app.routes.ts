import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { MaterialListComponent } from './material-list/material-list.component';

export const routes: Routes = [
    { path: "user", component: UserListComponent },
    { path: ".", component: UserListComponent },
    { path: 'quiz', component: QuizListComponent },
    { path: 'materials', component: MaterialListComponent }
];
