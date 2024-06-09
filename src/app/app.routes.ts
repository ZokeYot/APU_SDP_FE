import { Routes } from '@angular/router';
import { StudentMainPageComponent } from './section/student/student-main-page/student-main-page.component';
import { roleGuard } from './guard/role.guard';
import { Role } from './model/role';
import { LecturerMainPageComponent } from './section/lectuerer/lecturer-main-page/lecturer-main-page.component';
import { RegisterComponent } from './section/register/register.component';



export const routes: Routes = [
    { path: "something", component: StudentMainPageComponent /* canActivate: [roleGuard], data: { roles: [Role.STUDENT] } */ },
    { path: "lecturer", component: LecturerMainPageComponent /* canActivate: [roleGuard], data: { roles: [Role.LECTURER] } */ },
    { path: "", component: RegisterComponent },
    { path: "lecturer-main", component: LecturerMainPageComponent }

];
