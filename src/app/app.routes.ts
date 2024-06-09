import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { RegisterComponent } from './section/register/register.component';
import { LoginComponent } from './section/login/login.component';
import { ProfileComponent } from './section/profile/profile.component';
import { FindComponent } from './section/find/find.component';
import { PasswordComponent } from './section/password/password.component';
import { UpdateComponent } from './section/update/update.component';

export const routes: Routes = [
    { path: "user", component: UserListComponent },
    { path: ".", component: UserListComponent },
    { path: "register", component: RegisterComponent },
    { path: "", component: LoginComponent },
    { path: "login", component: LoginComponent },
    { path: "", component: RegisterComponent },
    { path: "find", component: FindComponent },
    { path: "password", component: PasswordComponent },
    { path: "profile", component: ProfileComponent },
    { path: "update", component: UpdateComponent }
];
