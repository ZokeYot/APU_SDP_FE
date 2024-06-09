import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { MaterialListComponent } from './material-list/material-list.component';
import { MaterialDetailsComponent } from './material-details/material-details.component';

export const routes: Routes = [
    { path: "user", component: UserListComponent },
    { path: ".", component: UserListComponent },
    { path: 'quiz', component: QuizListComponent },
    { path: 'materials', component: MaterialListComponent },
    { path: 'material-details/:title/:filename/:date', component: MaterialDetailsComponent}
];
