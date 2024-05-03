import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';

export const routes: Routes = [
    { path: "user", component: UserListComponent },
    { path: ".", component: UserListComponent }
];
